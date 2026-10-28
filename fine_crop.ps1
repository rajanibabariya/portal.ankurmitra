Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\rajani.babariya\.gemini\antigravity\brain\6059bd11-1f3b-4411-bf52-282c45be11c1\.user_uploaded\media_1793166415935_e78321f3.png"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)

# Let's inspect the avatar circle:
# In wide crop (x=8, y=100, w=80, h=85):
# Let's find the circle center in the original 473x1024 image
# Wide avatar had: x=8..88, y=100..185
# Looking at the image, the circle is roughly width=68, height=68.
# Center X ~ 46, Center Y ~ 143.
# Radius ~ 33.5. So X is 12..79 (w=67), Y is 109..176 (h=67).

# Let's test cropping a few precise boxes:
function Crop-Image($x, $y, $w, $h, $outName) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $outPath = "C:\Users\rajani.babariya\.gemini\antigravity\scratch\ankurmitra-web-portal\assets\$outName"
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Saved $outPath ($w x $h)"
}

# Avatar precise crop
Crop-Image 12 110 67 67 "farmer_avatar_67.png"
Crop-Image 13 111 65 65 "farmer_avatar_65.png"

# Logo precise crop:
# In wide crop (x=30, y=35, w=140, h=75):
# Logo starts at x ~ 48, y ~ 42, width ~ 100, height ~ 60.
Crop-Image 48 42 100 60 "mobile_logo_100x60.png"
Crop-Image 46 41 104 63 "mobile_logo_104x63.png"

# Scenic farm header backdrop (full width x=0..473, y=85..190)
Crop-Image 0 85 473 105 "scenic_farm_header_slice.png"

$img.Dispose()
