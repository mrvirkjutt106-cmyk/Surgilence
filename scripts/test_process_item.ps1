Add-Type -AssemblyName System.Drawing

function Process-InstrumentImage {
    param(
        [string]$inputPath,
        [string]$outputPath,
        [int]$targetSize = 800,
        [int]$bgThreshold = 220
    )

    $src = [System.Drawing.Bitmap]::FromFile($inputPath)
    $w = $src.Width
    $h = $src.Height

    # Find bounding box of instrument (pixels that are significantly darker or saturated compared to background)
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y += 2) {
        for ($x = 0; $x -lt $w; $x += 2) {
            $p = $src.GetPixel($x, $y)
            $lum = [int](0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
            # Check if not background (darker than threshold or has color difference)
            $isSteel = ($lum -lt $bgThreshold) -or ([Math]::Abs($p.R - $p.B) -gt 25)
            if ($isSteel) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    Write-Output "BBox for $([System.IO.Path]::GetFileName($inputPath)): X=[$minX, $maxX], Y=[$minY, $maxY], W=$($maxX-$minX), H=$($maxY-$minY)"

    # Create target 800x800 bitmap with transparent or pure white background
    # Let's create Format32bppArgb with pure white or transparent
    # Let's test pure white canvas with subtle smooth drop shadow or pure transparent
    $pad = 20
    $clipX = [Math]::Max(0, $minX - $pad)
    $clipY = [Math]::Max(0, $minY - $pad)
    $clipW = [Math]::Min($w - $clipX, ($maxX - $minX) + ($pad * 2))
    $clipH = [Math]::Min($h - $clipY, ($maxY - $minY) + ($pad * 2))

    $rect = New-Object System.Drawing.Rectangle($clipX, $clipY, $clipW, $clipH)
    $cropped = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    # Scale cropped to fit nicely within 800x800 with 15% padding
    $maxDim = $targetSize * 0.82
    $scale = [Math]::Min($maxDim / $clipW, $maxDim / $clipH)
    $destW = [int]($clipW * $scale)
    $destH = [int]($clipH * $scale)
    $destX = [int](($targetSize - $destW) / 2)
    $destY = [int](($targetSize - $destH) / 2)

    # Create final 800x800 pure white background
    $final = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($final)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    $g.DrawImage($cropped, $destX, $destY, $destW, $destH)
    $g.Dispose()

    # Now whiten near-white background pixels so the entire canvas has a seamless pure white #ffffff
    # Scan borders inward and set any pixel with lum > 215 to pure white (255,255,255,255)
    for ($y = 0; $y -lt $targetSize; $y++) {
        for ($x = 0; $x -lt $targetSize; $x++) {
            $p = $final.GetPixel($x, $y)
            $lum = (0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
            # If light pixel and low color saturation, blend to pure white
            if ($lum -gt 218 -and [Math]::Abs($p.R - $p.G) -lt 15 -and [Math]::Abs($p.G - $p.B) -lt 15) {
                # Smooth curve to 255
                $final.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
            }
        }
    }

    $final.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $final.Dispose()
    $cropped.Dispose()
    $src.Dispose()
    Write-Output "Saved standardized image: $outputPath"
}

Process-InstrumentImage -inputPath "$PSScriptRoot\..\public\images\item-metzenbaum-scissors.jpg" -outputPath "$PSScriptRoot\..\public\images\item-metzenbaum-scissors-test.jpg"
