Add-Type -AssemblyName System.Drawing

$logo = [System.Drawing.Bitmap]::FromFile("$PSScriptRoot\..\public\Company Logo.png")
Write-Output "Dimensions: $($logo.Width) x $($logo.Height)"
Write-Output "Pixel format: $($logo.PixelFormat)"

# Sample corners and center
$topLeft = $logo.GetPixel(0, 0)
$center = $logo.GetPixel([int]($logo.Width / 2), [int]($logo.Height / 2))
Write-Output "TopLeft: A=$($topLeft.A), R=$($topLeft.R), G=$($topLeft.G), B=$($topLeft.B)"
Write-Output "Center: A=$($center.A), R=$($center.R), G=$($center.G), B=$($center.B)"

$logo.Dispose()
