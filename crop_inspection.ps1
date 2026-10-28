Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\rajani.babariya\.gemini\antigravity\brain\6059bd11-1f3b-4411-bf52-282c45be11c1\.user_uploaded\media_1793166415935_e78321f3.png"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)

Write-Host "Image size: $($img.Width) x $($img.Height)"

# Let's inspect rows around y=35 to 200
# Logo is in top-left, avatar is below logo on the left
Write-Host "Source image loaded successfully."
$img.Dispose()
