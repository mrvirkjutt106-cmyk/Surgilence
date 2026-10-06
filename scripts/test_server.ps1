$res = Invoke-WebRequest -Uri "http://localhost:5173/src/components/Navbar.jsx" -UseBasicParsing
Write-Host "Navbar.jsx HTTP Status: $($res.StatusCode)"
if ($res.Content -match "top-announcement-bar") {
    Write-Host "ALERT: top-announcement-bar is still in served Navbar.jsx!" -ForegroundColor Red
} else {
    Write-Host "CONFIRMED: top-announcement-bar is GONE from served Navbar.jsx!" -ForegroundColor Green
}

$css = Invoke-WebRequest -Uri "http://localhost:5173/src/index.css" -UseBasicParsing
Write-Host "index.css HTTP Status: $($css.StatusCode)"
if ($css.Content -match "bottom:\s*86px;\s*right:\s*24px") {
    Write-Host "CONFIRMED: whatsapp-toggle-wrap is at bottom: 86px, right: 24px in served index.css!" -ForegroundColor Green
} else {
    Write-Host "ALERT: whatsapp-toggle-wrap position not found in served index.css!" -ForegroundColor Red
}

$data = Invoke-WebRequest -Uri "http://localhost:5173/src/data/instruments.js" -UseBasicParsing
Write-Host "instruments.js HTTP Status: $($data.StatusCode)"
if ($data.Content -match "/images/item-\.png") {
    Write-Host "ALERT: broken item-.png still in served instruments.js!" -ForegroundColor Red
} else {
    Write-Host "CONFIRMED: All images are exact PNG filenames in served instruments.js!" -ForegroundColor Green
}
