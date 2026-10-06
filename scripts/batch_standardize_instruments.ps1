Add-Type -AssemblyName System.Drawing

function Standardize-Instrument {
    param(
        [string]$baseName,
        [int]$targetSize = 800
    )

    $jpgInput = "$PSScriptRoot\..\public\images\$baseName.jpg"
    if (-not (Test-Path $jpgInput)) {
        Write-Warning "File not found: $jpgInput"
        return
    }

    $src = [System.Drawing.Bitmap]::FromFile($jpgInput)
    $w = $src.Width
    $h = $src.Height

    # 1. Find bounding box of instrument
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y += 3) {
        for ($x = 0; $x -lt $w; $x += 3) {
            $p = $src.GetPixel($x, $y)
            $lum = [int](0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
            $sat = [Math]::Max([Math]::Abs($p.R - $p.G), [Math]::Abs($p.G - $p.B))
            
            # Non-background if dark enough or has color tint
            $isSteel = ($lum -lt 224) -or ($sat -gt 18)
            if ($isSteel) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    if ($minX -ge $maxX -or $minY -ge $maxY) {
        $minX = 0; $maxX = $w; $minY = 0; $maxY = $h
    }

    $pad = 12
    $clipX = [Math]::Max(0, $minX - $pad)
    $clipY = [Math]::Max(0, $minY - $pad)
    $clipW = [Math]::Min($w - $clipX, ($maxX - $minX) + ($pad * 2))
    $clipH = [Math]::Min($h - $clipY, ($maxY - $minY) + ($pad * 2))

    $rect = New-Object System.Drawing.Rectangle($clipX, $clipY, $clipW, $clipH)
    $cropped = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    # 2. Scale cropped to fit 800x800 with 15% margin
    $maxDim = $targetSize * 0.78
    $scale = [Math]::Min($maxDim / $clipW, $maxDim / $clipH)
    $destW = [Math]::Max(10, [int]($clipW * $scale))
    $destH = [Math]::Max(10, [int]($clipH * $scale))
    $destX = [int](($targetSize - $destW) / 2)
    $destY = [int](($targetSize - $destH) / 2)

    # 3. Create transparent PNG
    $pngBmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($pngBmp)
    $g.Clear([System.Drawing.Color]::FromArgb(0, 255, 255, 255))
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($cropped, $destX, $destY, $destW, $destH)
    $g.Dispose()

    # Clear near-white background to transparent with alpha transition
    for ($y = 0; $y -lt $targetSize; $y++) {
        for ($x = 0; $x -lt $targetSize; $x++) {
            $p = $pngBmp.GetPixel($x, $y)
            if ($p.A -gt 0) {
                $lum = (0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
                $sat = [Math]::Max([Math]::Abs($p.R - $p.G), [Math]::Abs($p.G - $p.B))
                if ($lum -gt 234 -and $sat -lt 16) {
                    $pngBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
                } elseif ($lum -gt 214 -and $sat -lt 16) {
                    $alpha = [int](255 * (234 - $lum) / 20)
                    $alpha = [Math]::Max(0, [Math]::Min(255, $alpha))
                    $pngBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
                }
            }
        }
    }

    $pngPath = "$PSScriptRoot\..\public\images\$baseName.png"
    $pngBmp.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

    # 4. Also generate matching pure-white JPEG at identical 800x800
    $jpgBmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g2 = [System.Drawing.Graphics]::FromImage($jpgBmp)
    $g2.Clear([System.Drawing.Color]::White)
    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g2.DrawImage($pngBmp, 0, 0, $targetSize, $targetSize)
    $g2.Dispose()

    $jpgOut = "$PSScriptRoot\..\public\images\$baseName-clean.jpg"
    $jpgBmp.Save($jpgOut, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    # Clean up
    $jpgBmp.Dispose()
    $pngBmp.Dispose()
    $cropped.Dispose()
    $src.Dispose()

    Write-Output "Processed $baseName -> PNG & clean JPG (800x800)"
}

$items = @(
    "item-metzenbaum-scissors",
    "item-mayo-hegar-tc",
    "item-crile-forceps",
    "item-adson-forceps",
    "item-scalpel-handle",
    "item-senn-retractor",
    "item-kerrison-rongeur",
    "item-extraction-18r",
    "item-extraction-151",
    "item-mouth-mirror",
    "item-sickle-scaler",
    "item-williams-probe",
    "item-mathieu-plier",
    "item-coupland-elevators"
)

foreach ($item in $items) {
    Standardize-Instrument -baseName $item -targetSize 800
}
