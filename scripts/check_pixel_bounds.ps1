Add-Type -AssemblyName System.Drawing

Get-ChildItem public/images/item-*.png | ForEach-Object {
    $bmp = [System.Drawing.Bitmap]::FromFile($_.FullName)
    $minX = $bmp.Width
    $minY = $bmp.Height
    $maxX = 0
    $maxY = 0
    $hasPixels = $false

    for ($y = 0; $y -lt $bmp.Height; $y += 5) {
        for ($x = 0; $x -lt $bmp.Width; $x += 5) {
            $p = $bmp.GetPixel($x, $y)
            # Check if not pure white and not transparent
            if ($p.A -gt 20 -and ($p.R -lt 245 -or $p.G -lt 245 -or $p.B -lt 245)) {
                $hasPixels = $true
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    $bmp.Dispose()
    if ($hasPixels) {
        Write-Host "$($_.Name) -> Bounds: X: $minX to $maxX, Y: $minY to $maxY (W: $($maxX - $minX), H: $($maxY - $minY))"
    } else {
        Write-Host "$($_.Name) -> ALL WHITE / BLANK!" -ForegroundColor Red
    }
}
