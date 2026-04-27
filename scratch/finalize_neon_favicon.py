import PIL.Image as Image
import collections
import os

# Values provided by user
scale = 0.88
tx = -9
ty = 1

# Path
input_path = 'public/new_favicon_source.jpg'
output_path = 'public/favicon.png'

def process():
    # 1. Load and Remove Background
    img = Image.open(input_path).convert("RGBA")
    pix = img.load()
    width, height = img.size

    # Sample edges to find bg colors (checkerboard)
    edge_pix = []
    for x in range(width):
        edge_pix.append(pix[x, 0])
        edge_pix.append(pix[x, height-1])
    for y in range(height):
        edge_pix.append(pix[0, y])
        edge_pix.append(pix[width-1, y])
    
    counter = collections.Counter(edge_pix)
    most_common = [c[0] for c in counter.most_common(5)]
    print(f"Detected BG colors: {most_common}")

    newData = []
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            is_bg = False
            for bg in most_common:
                br, bg_g, bb, ba = bg
                if abs(r - br) < 30 and abs(g - bg_g) < 30 and abs(b - bb) < 30:
                    is_bg = True
                    break
            if is_bg:
                newData.append((0, 0, 0, 0))
            else:
                newData.append((r, g, b, a))

    img.putdata(newData)
    
    # 2. Apply Crop
    # Container was 320x320. 
    # Image 1004x1024 object-contain -> height is 320px in container.
    pixel_ratio = height / 320.0
    
    crop_size_source = (320.0 / scale) * pixel_ratio
    
    cx_source = width / 2.0
    cy_source = height / 2.0
    
    # tx = -9 (Left) -> shift crop RIGHT
    # ty = 1 (Down) -> shift crop UP
    crop_cx = cx_source - (tx / scale) * pixel_ratio
    crop_cy = cy_source - (ty / scale) * pixel_ratio
    
    left = crop_cx - crop_size_source / 2.0
    top = crop_cy - crop_size_source / 2.0
    right = left + crop_size_source
    bottom = top + crop_size_source
    
    # Perform crop with background filling (since crop might be larger than image)
    # We create a new transparent image of crop_size_source and paste the original into it
    canvas = Image.new("RGBA", (int(crop_size_source), int(crop_size_source)), (0, 0, 0, 0))
    
    # Offset to paste original into canvas
    paste_x = int(-left)
    paste_y = int(-top)
    
    canvas.paste(img, (paste_x, paste_y))
    
    # Resize to standard large favicon size
    final_img = canvas.resize((512, 512), Image.Resampling.LANCZOS)
    final_img.save(output_path, "PNG")
    
    print(f"Favicon updated with background removal. Final size: 512x512")

if __name__ == "__main__":
    process()
