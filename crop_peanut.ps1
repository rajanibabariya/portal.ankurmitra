Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\rajani.babariya\.gemini\antigravity\brain\6059bd11-1f3b-4411-bf52-282c45be11c1\.user_uploaded\media_1793166415935_e78321f3.png"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)

$rect = New-Object System.Drawing.Rectangle(26, 804, 62, 60)
$cropped = $img.Clone($rect, $img.PixelFormat)
$outPath = "C:\Users\rajani.babariya\.gemini\antigravity\scratch\ankurmitra-web-portal\assets\mobile_peanut_exact.png"
$cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$img.Dispose()
Write-Host "Peanut cropped cleanly."
