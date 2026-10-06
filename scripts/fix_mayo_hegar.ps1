Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Alsaba\.gemini\antigravity-ide\brain\5c201d96-7384-4883-b075-054ad283224a\item_mayo_hegar_tc_1791305474374.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $bmp.Width
$h = $bmp.Height

# Detect instrument pixels
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $bmp.GetPixel($x, $y)
        $lum = (0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
        $isGold = ($p.R - $p.B) -gt 40 -and ($p.G - $p.B) -gt 30
        $isSteel = ($lum -lt 190) -and ([Math]::Abs($p.R - $p.G) -lt 25) -and ([Math]::Abs($p.G - $p.B) -lt 25)
        $isShadow = ($lum -lt 210) -and ($y -gt 380) -and ($y -lt 650) -and ($x -gt 100) -and ($x -lt 1100)

        if ($isGold -or $isSteel) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Exact instrument bounds: X: $minX to $maxX (W: $($maxX - $minX)), Y: $minY to $maxY (H: $($maxY - $minY))"

# Add small pad
$pad = 20
$clipX = [Math]::Max(0, $minX - $pad)
$clipY = [Math]::Max(0, $minY - $pad)
$clipW = [Math]::Min($w - $clipX, ($maxX - $minX) + ($pad * 2))
$clipH = [Math]::Min($h - $clipY, ($maxY - $minY) + ($pad * 2) + 20) # include soft ground shadow

$rect = New-Object System.Drawing.Rectangle($clipX, $clipY, $clipW, $clipH)
$cropped = $bmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Fit into 800x800 with 75% max dimension
$targetSize = 800
$maxDim = 680
$scale = [Math]::Min($maxDim / $clipW, $maxDim / $clipH)
$destW = [int]($clipW * $scale)
$destH = [int]($clipH * $scale)
$destX = [int](($targetSize - $destW) / 2)
$destY = [int](($targetSize - $destH) / 2)

$outBmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($outBmp)
$g.Clear([System.Drawing.Color]::FromArgb(0, 255, 255, 255))
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($cropped, $destX, $destY, $destW, $destH)
$g.Dispose()

# Make white/light background transparent around instrument
for ($y = 0; $y -lt $targetSize; $y++) {
    for ($x = 0; $x -lt $targetSize; $x++) {
        $p = $outBmp.GetPixel($x, $y)
        if ($p.A -gt 0) {
            $lum = (0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
            $isGold = ($p.R - $p.B) -gt 35
            if (-not $isGold) {
                if ($lum -gt 242) {
                    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
                } elseif ($lum -gt 215) {
                    $alpha = [int](255 * (242 - $lum) / 27)
                    $alpha = [Math]::Max(0, [Math]::Min(255, $alpha))
                    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
                }
            }
        }
    }
}

$destPng = "c:\Users\Alsaba\Documents\SURGILENCE (PVT) LTD\public\images\item-mayo-hegar-tc.png"
$outBmp.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved fixed PNG to $destPng"

$bmp.Dispose()
$outBmp.Dispose()
