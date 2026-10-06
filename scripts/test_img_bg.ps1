Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("$PSScriptRoot\..\public\images\item-metzenbaum-scissors.jpg")
Write-Output "Size: $($img.Width) x $($img.Height)"
$corners = @(
    $img.GetPixel(5, 5),
    $img.GetPixel($img.Width - 5, 5),
    $img.GetPixel(5, $img.Height - 5),
    $img.GetPixel($img.Width - 5, $img.Height - 5)
)
foreach ($c in $corners) {
    Write-Output "Corner: R=$($c.R), G=$($c.G), B=$($c.B)"
}
$img.Dispose()
