Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\rajani.babariya\.gemini\antigravity\brain\6059bd11-1f3b-4411-bf52-282c45be11c1\.user_uploaded\media_1793166415935_e78321f3.png"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)

function Crop-Image($x, $y, $w, $h, $outName) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $outPath = "C:\Users\rajani.babariya\.gemini\antigravity\scratch\ankurmitra-web-portal\assets\$outName"
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Saved $outPath ($w x $h)"
}

# Crop Candidate 1 for Logo (Leaf + ANKURMITRA + Tagline)
# In 473x1024, status bar is y=0..38. Logo starts around y=40..105, x=45..150
Crop-Image 40 40 115 65 "mobile_logo_candidate.png"

# Crop Candidate 2 for Avatar (Farmer circular portrait)
# Avatar is on left, y=105..185, x=10..85
Crop-Image 10 105 75 75 "farmer_avatar_candidate.png"

# Let's also crop a slightly wider box for each to analyze
Crop-Image 30 35 140 75 "mobile_logo_wide.png"
Crop-Image 8 100 80 85 "farmer_avatar_wide.png"

$img.Dispose()
