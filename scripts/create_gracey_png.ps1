Add-Type -AssemblyName System.Drawing

$inputPath = Join-Path $PSScriptRoot "..\public\images\dental-collection.jpg"
$outputPath = Join-Path $PSScriptRoot "..\public\images\item-gracey-curettes.png"

if (Test-Path $inputPath) {
    $src = [System.Drawing.Bitmap]::FromFile($inputPath)
    # Create 800x800 square bitmap with transparent or white background
    $dest = New-Object System.Drawing.Bitmap 800, 800
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Calculate scale to fit
    $ratio = [Math]::Min(720 / $src.Width, 720 / $src.Height)
    $newW = [int]($src.Width * $ratio)
    $newH = [int]($src.Height * $ratio)
    $posX = [int]((800 - $newW) / 2)
    $posY = [int]((800 - $newH) / 2)

    $g.DrawImage($src, $posX, $posY, $newW, $newH)
    $g.Dispose()
    $src.Dispose()

    $dest.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Output "Created $outputPath successfully"
} else {
    Write-Output "Source not found"
}
