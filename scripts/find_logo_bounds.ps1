Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("$PSScriptRoot\..\public\Company Logo.png")
$minX = $img.Width; $maxX = 0; $minY = $img.Height; $maxY = 0

for ($y = 0; $y -lt $img.Height; $y += 2) {
    for ($x = 0; $x -lt $img.Width; $x += 2) {
        $p = $img.GetPixel($x, $y)
        if ($p.A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Bounds: X=[$minX, $maxX], Y=[$minY, $maxY], W=$($maxX - $minX), H=$($maxY - $minY)"
$img.Dispose()
