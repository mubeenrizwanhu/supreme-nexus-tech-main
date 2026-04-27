import PIL.Image as Image
import os

# Paths
input_path = r'C:\Users\Mubee\Desktop\Supreme Nexus\GitHub Repository\supreme-nexus-tech-main\public\logo.png'
# Wait, I'll use the brain file
input_path = r'C:\Users\Mubee\.gemini\antigravity\brain\8101d824-fbec-4ed5-85b8-46064fd3aec9\media__1777241061511.jpg'
output_path = r'C:\Users\Mubee\.gemini\antigravity\brain\8101d824-fbec-4ed5-85b8-46064fd3aec9\sn_favicon_processed.png'

def remove_checkerboard(path):
    img = Image.open(path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Checkerboard is typically shades of grey
        # R == G == B and not too bright
        r, g, b, a = item
        
        # Check if it's a "grey" pixel (checkerboard)
        # We allow a small tolerance
        diff_rg = abs(r - g)
        diff_gb = abs(g - b)
        diff_rb = abs(r - b)
        
        # If it's very grey and not too bright/dark (logo has some glow)
        if diff_rg < 5 and diff_gb < 5 and diff_rb < 5:
            # It's likely part of the checkerboard
            # We make it transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Crop to content (optional but good)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_checkerboard(input_path)
