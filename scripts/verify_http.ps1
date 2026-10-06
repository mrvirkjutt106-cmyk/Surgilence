$images = @(
    'item-metzenbaum-scissors.png',
    'item-mayo-hegar-tc.png',
    'item-crile-forceps.png',
    'item-adson-forceps.png',
    'item-scalpel-handle.png',
    'item-senn-retractor.png',
    'item-kerrison-rongeur.png',
    'item-extraction-18r.png',
    'item-extraction-151.png',
    'item-coupland-elevators.png',
    'item-williams-probe.png',
    'item-gracey-curettes.png',
    'item-sickle-scaler.png',
    'item-mouth-mirror.png',
    'item-mathieu-plier.png'
)

Write-Host "--- VERIFYING INSTRUMENT IMAGES ON DEV SERVER ---"
$allPassed = $true
foreach ($img in $images) {
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:5173/images/$img" -Method Head -UseBasicParsing
        Write-Host "$img : HTTP $($res.StatusCode)"
    } catch {
        Write-Host "$img : ERROR $($_.Exception.Message)" -ForegroundColor Red
        $allPassed = $false
    }
}

Write-Host "`n--- VERIFYING HOME PAGE ---"
$home = Invoke-WebRequest -Uri "http://localhost:5173/" -UseBasicParsing
Write-Host "Home Page Status: HTTP $($home.StatusCode)"
if ($home.Content -match "GLOBAL EXPORT") {
    Write-Host "WARNING: Top announcement bar still present in HTML" -ForegroundColor Red
} else {
    Write-Host "SUCCESS: Top announcement bar is completely removed!" -ForegroundColor Green
}

if ($allPassed) {
    Write-Host "`nALL 15 INSTRUMENT IMAGES RETURNING HTTP 200 OK!" -ForegroundColor Green
}
