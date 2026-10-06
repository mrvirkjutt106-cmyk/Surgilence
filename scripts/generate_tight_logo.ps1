Add-Type -AssemblyName System.Drawing

$srcPath = "$PSScriptRoot\..\public\Company Logo.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# Bounding box with small padding
$x0 = [Math]::Max(0, 50)
$y0 = [Math]::Max(0, 138)
$w0 = [Math]::Min($src.Width - $x0, 1096)
$h0 = [Math]::Min($src.Height - $y0, 1048)

$rect = New-Object System.Drawing.Rectangle($x0, $y0, $w0, $h0)
$cropped = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save tight logo for web
$tightPath = "$PSScriptRoot\..\public\images\logo.png"
$cropped.Save($tightPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "Saved tight logo: $tightPath"

# Save favicon 64x64
$fav64 = New-Object System.Drawing.Bitmap(64, 64, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($fav64)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($cropped, 0, 0, 64, 64)
$g.Dispose()

$favPath = "$PSScriptRoot\..\public\favicon.png"
$fav64.Save($favPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "Saved favicon: $favPath"

$fav64.Dispose()
$cropped.Dispose()
$src.Dispose()
