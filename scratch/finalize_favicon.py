import PIL.Image as Image
import os

# Values provided by user
scale = 1.85
tx = -4
ty = 48

# Load original
input_path = 'public/favicon.png'
output_path = 'public/favicon.png'

img = Image.open(input_path).convert("RGBA")
w, h = img.size

# Container dimensions in the tool were 320x320
# Image was w-full h-full object-contain
# Since 1024 > 1010, the image width matched the container width (320px)
# 1 container pixel = 1024 / 320 = 3.2 source pixels

pixel_ratio = w / 320.0

# Calculate the source crop area
# The visible area in container pixels is 320x320
# In source pixels, the visible area width is (320 / scale) * pixel_ratio
crop_size_source = (320.0 / scale) * pixel_ratio

# Center of the image in source pixels
cx_source = w / 2.0
cy_source = h / 2.0

# Adjust center based on translation
# Moving image RIGHT (positive tx) means seeing more of the LEFT, so shift crop center LEFT (subtract)
# Moving image DOWN (positive ty) means seeing more of the TOP, so shift crop center UP (subtract)
# Wait, my previous math: 
# Moving image DOWN (ty=48) means we moved the image content down relative to the viewport.
# So the viewport is now at the TOP of the image.
# So the crop center should be HIGHER (smaller Y).
# Yes, subtract.

crop_cx = cx_source - (tx / scale) * pixel_ratio
crop_cy = cy_source - (ty / scale) * pixel_ratio

# Calculate bounding box
left = crop_cx - crop_size_source / 2.0
top = crop_cy - crop_size_source / 2.0
right = left + crop_size_source
bottom = top + crop_size_source

# Perform crop
# Note: crop() takes (left, top, right, bottom)
final_img = img.crop((left, top, right, bottom))

# Resize to a standard large favicon size for quality (512x512)
final_img = final_img.resize((512, 512), Image.Resampling.LANCZOS)

# Save
final_img.save(output_path, "PNG")

print(f"Favicon updated successfully. Crop area: ({left:.1f}, {top:.1f}, {right:.1f}, {bottom:.1f})")
