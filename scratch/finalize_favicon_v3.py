import PIL.Image as Image
import os

# Values provided by user (Same as previous)
scale = 0.88
tx = -9
ty = 1

# Path
input_path = 'public/new_favicon_source_v3.png'
output_path = 'public/favicon.png'

def process():
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Image in container (320x320)
    # Since height (344) > width (337), height matches container (320)
    pixel_ratio = height / 320.0
    
    crop_size_source = (320.0 / scale) * pixel_ratio
    
    cx_source = width / 2.0
    cy_source = height / 2.0
    
    # Apply same shifts
    crop_cx = cx_source - (tx / scale) * pixel_ratio
    crop_cy = cy_source - (ty / scale) * pixel_ratio
    
    left = crop_cx - crop_size_source / 2.0
    top = crop_cy - crop_size_source / 2.0
    right = left + crop_size_source
    bottom = top + crop_size_source
    
    # Create canvas and paste
    canvas = Image.new("RGBA", (int(crop_size_source), int(crop_size_source)), (0, 0, 0, 0))
    canvas.paste(img, (int(-left), int(-top)))
    
    # Resize to standard large favicon size
    final_img = canvas.resize((512, 512), Image.Resampling.LANCZOS)
    final_img.save(output_path, "PNG")
    
    print(f"Favicon updated with v3 source. Scale: {scale}, Trans: ({tx}, {ty})")

if __name__ == "__main__":
    process()
