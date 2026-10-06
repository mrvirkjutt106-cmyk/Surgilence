Add-Type -AssemblyName System.Drawing

function Convert-ToTransparentProduct {
    param(
        [string]$inputPath,
        [string]$outputPath,
        [int]$targetSize = 800
    )

    $src = [System.Drawing.Bitmap]::FromFile($inputPath)
    $w = $src.Width
    $h = $src.Height

    # 1. Detect background color from four outer edges
    # Find bounding box of instrument
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y += 3) {
        for ($x = 0; $x -lt $w; $x += 3) {
            $p = $src.GetPixel($x, $y)
            $lum = [int](0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
            $isSteel = ($lum -lt 220) -or ([Math]::Abs($p.R - $p.B) -gt 20)
            if ($isSteel) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    # Safety bounds
    if ($minX -ge $maxX -or $minY -ge $maxY) {
        $minX = 0; $maxX = $w; $minY = 0; $maxY = $h
    }

    $pad = 15
    $clipX = [Math]::Max(0, $minX - $pad)
    $clipY = [Math]::Max(0, $minY - $pad)
    $clipW = [Math]::Min($w - $clipX, ($maxX - $minX) + ($pad * 2))
    $clipH = [Math]::Min($h - $clipY, ($maxY - $minY) + ($pad * 2))

    $rect = New-Object System.Drawing.Rectangle($clipX, $clipY, $clipW, $clipH)
    $cropped = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    # Scale cropped to fit inside targetSize with 15% margin
    $maxDim = $targetSize * 0.80
    $scale = [Math]::Min($maxDim / $clipW, $maxDim / $clipH)
    $destW = [Math]::Max(10, [int]($clipW * $scale))
    $destH = [Math]::Max(10, [int]($clipH * $scale))
    $destX = [int](($targetSize - $destW) / 2)
    $destY = [int](($targetSize - $destH) / 2)

    # Create 800x800 bitmap
    $final = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($final)
    $g.Clear([System.Drawing.Color]::FromArgb(0, 255, 255, 255)) # transparent
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($cropped, $destX, $destY, $destW, $destH)
    $g.Dispose()

    # Clear near-white background to transparent
    for ($y = 0; $y -lt $targetSize; $y++) {
        for ($x = 0; $x -lt $targetSize; $x++) {
            $p = $final.GetPixel($x, $y)
            if ($p.A -gt 0) {
                $lum = (0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
                $sat = [Math]::Max([Math]::Abs($p.R - $p.G), [Math]::Abs($p.G - $p.B))
                if ($lum -gt 232 -and $sat -lt 15) {
                    $final.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
                } elseif ($lum -gt 212 -and $sat -lt 15) {
                    $alpha = [int](255 * (232 - $lum) / 20)
                    $alpha = [Math]::Max(0, [Math]::Min(255, $alpha))
                    $final.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
                }
            }
        }
    }

    $final.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $final.Dispose()
    $cropped.Dispose()
    $src.Dispose()
    Write-Output "Successfully converted $outputPath"
}

Convert-ToTransparentProduct -inputPath "$PSScriptRoot\..\public\images\item-metzenbaum-scissors.jpg" -outputPath "$PSScriptRoot\..\public\images\item-metzenbaum-scissors.png"
