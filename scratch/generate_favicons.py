from PIL import Image, ImageDraw, ImageFilter
import os

source_path = r'public\NEW Black Background SN Favicon.jpeg'
output_dir = 'public'

# User parameters from Nexus Lab
scale = 1.67
offset_x = -7
offset_y = -8
base_size_for_offset = 320 

def generate_icon(size, output_name, make_circular=False):
    with Image.open(source_path) as img:
        img = img.convert('RGBA')
        
        # 1. Calculate logo size
        logo_w = int(size * scale)
        logo_h = int(size * scale)
        
        # 2. Resize logo
        resized_logo = img.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        if size <= 64:
            resized_logo = resized_logo.filter(ImageFilter.SHARPEN)
        
        # 3. BACKGROUND REMOVAL (If circular/transparent)
        if make_circular:
            datas = resized_logo.getdata()
            new_data = []
            for item in datas:
                r, g, b, a = item
                # brightness-based transparency
                brightness = max(r, g, b)
                if brightness < 10:
                    new_data.append((0, 0, 0, 0))
                else:
                    # Keep color but apply a smooth alpha based on brightness
                    # This preserves the glowing edges
                    new_alpha = min(255, int(255 * (brightness / 255.0) ** 0.5 * 1.5))
                    new_data.append((r, g, b, new_alpha))
            resized_logo.putdata(new_data)
            
            # Canvas is fully transparent for circular icons
            canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        else:
            # Solid black canvas for Home Screen icons
            canvas = Image.new('RGBA', (size, size), (0, 0, 0, 255))
        
        # 4. Calculate position with offsets
        pos_x = (size - logo_w) // 2
        pos_y = (size - logo_h) // 2
        pos_x += int(offset_x * (size / base_size_for_offset))
        pos_y += int(offset_y * (size / base_size_for_offset))
        
        # 5. Paste logo
        canvas.paste(resized_logo, (pos_x, pos_y), resized_logo)
        
        # 6. Apply smooth circular mask ONLY if requested
        if make_circular:
            oversample = 4
            mask_size = size * oversample
            mask = Image.new('L', (mask_size, mask_size), 0)
            mask_draw = ImageDraw.Draw(mask)
            mask_draw.ellipse((0, 0, mask_size - 1, mask_size - 1), fill=255)
            mask = mask.resize((size, size), Image.Resampling.LANCZOS)
            
            final_output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
            final_output.paste(canvas, (0, 0), mask)
        else:
            final_output = canvas
        
        # 7. Save
        final_output.save(os.path.join(output_dir, output_name), 'PNG', optimize=True)
        return final_output

# --- GENERATE TABS & UI ICONS (CIRCULAR & TRANSPARENT) ---
generate_icon(16, 'favicon-16x16.png', make_circular=True)
generate_icon(32, 'favicon-32x32.png', make_circular=True)
generate_icon(96, 'favicon-96x96.png', make_circular=True)
generate_icon(32, 'favicon.png', make_circular=True)

# Generate multi-size ICO (Circular)
ico_sizes = [16, 32, 48]
ico_images = []
for size in ico_sizes:
    ico_images.append(generate_icon(size, f'temp_{size}.png', make_circular=True))
ico_images[0].save(os.path.join(output_dir, 'favicon.ico'), format='ICO', sizes=[(s, s) for s in ico_sizes], append_images=ico_images[1:])

# --- GENERATE HOME SCREEN ICONS (SQUARE / SOLID BLACK) ---
generate_icon(180, 'apple-touch-icon.png', make_circular=False)
generate_icon(192, 'web-app-manifest-192x192.png', make_circular=False)
generate_icon(512, 'web-app-manifest-512x512.png', make_circular=False)

# Cleanup
for size in ico_sizes:
    temp_path = os.path.join(output_dir, f'temp_{size}.png')
    if os.path.exists(temp_path): os.remove(temp_path)

print("Transparency engine: UI icons are now transparent, Home Screen icons remain solid.")
