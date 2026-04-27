import PIL.Image as Image
import collections

input_path = r'C:\Users\Mubee\.gemini\antigravity\brain\8101d824-fbec-4ed5-85b8-46064fd3aec9\media__1777241061511.jpg'
output_path = r'C:\Users\Mubee\.gemini\antigravity\brain\8101d824-fbec-4ed5-85b8-46064fd3aec9\sn_favicon_final.png'

def process():
    img = Image.open(input_path).convert("RGBA")
    pix = img.load()
    width, height = img.size

    # Find the two background colors by sampling the corners
    corners = [pix[0,0], pix[width-1, 0], pix[0, height-1], pix[width-1, height-1]]
    bg_colors = list(set(corners))
    
    # Alternatively, find the most common colors
    all_pix = []
    # Sample edges to find bg colors
    for x in range(width):
        all_pix.append(pix[x, 0])
        all_pix.append(pix[x, height-1])
    for y in range(height):
        all_pix.append(pix[0, y])
        all_pix.append(pix[width-1, y])
    
    counter = collections.Counter(all_pix)
    most_common = [c[0] for c in counter.most_common(5)]
    
    print(f"Detected potential BG colors: {most_common}")

    newData = []
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            
            # If the pixel color is very close to any of the most common edge colors
            is_bg = False
            for bg in most_common:
                br, bg_g, bb, ba = bg
                if abs(r - br) < 15 and abs(g - bg_g) < 15 and abs(b - bb) < 15:
                    is_bg = True
                    break
            
            if is_bg:
                newData.append((0, 0, 0, 0))
            else:
                newData.append((r, g, b, a))

    img.putdata(newData)
    
    # Aggressive crop
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Resize for favicon
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process()
