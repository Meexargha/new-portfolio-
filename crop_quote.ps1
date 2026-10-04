Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path "public/quotes/promised.jpg").Path)
$w = $img.Width
$h = $img.Height
$top = [int]($h * 0.125)
$cropH = [int]($h * 0.60)
$rect = New-Object System.Drawing.Rectangle(0, $top, $w, $cropH)
$bmp = New-Object System.Drawing.Bitmap($w, $cropH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $cropH)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
$img.Dispose()
$g.Dispose()
$bmp.Save((Resolve-Path "public/quotes").Path + "/promised_clean.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Output "Clean crop created successfully!"
