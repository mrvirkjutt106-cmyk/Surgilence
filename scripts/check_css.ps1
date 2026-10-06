$css = (Invoke-WebRequest -Uri "http://localhost:5173/src/index.css" -UseBasicParsing).Content
if ($css -match "whatsapp-toggle-wrap") {
    Write-Host "whatsapp-toggle-wrap FOUND in served index.css" -ForegroundColor Green
}
if ($css -match "86px") {
    Write-Host "86px FOUND in served index.css" -ForegroundColor Green
}
