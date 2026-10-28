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

# Avatar: copy farmer_avatar_65.png to farmer_jayesh_exact.png
Copy-Item "C:\Users\rajani.babariya\.gemini\antigravity\scratch\ankurmitra-web-portal\assets\farmer_avatar_65.png" "C:\Users\rajani.babariya\.gemini\antigravity\scratch\ankurmitra-web-portal\assets\farmer_jayesh_exact.png"

# Full logo lockup (Plant + ANKURMITRA + Tagline)
Crop-Image 40 40 114 72 "mobile_logo_exact_full.png"
Crop-Image 40 40 114 74 "mobile_logo_exact_full_74.png"

# Logo icon mark only (sprouting plant with sun & furrows)
Crop-Image 54 41 84 46 "mobile_logo_exact_icon.png"

# Drone Banner Card (the actual drone banner from the uploaded screenshot!)
Crop-Image 12 195 448 180 "mobile_drone_banner_exact.png"

# Scenic Farm background behind the greeting and farmer
Crop-Image 10 95 453 95 "mobile_farm_header_exact.png"

# Peanut / Groundnut photo thumbnail
# Let's find peanut photo around y=780..860, x=20..100
Crop-Image 26 790 62 62 "mobile_peanut_exact.png"

$img.Dispose()
