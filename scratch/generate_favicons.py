from PIL import Image, ImageDraw, ImageFilter
import os

source_path = r'public\NEW Black Background SN Favicon.jpeg'
output_dir = 'public'

# User parameters from Nexus Lab
scale = 1.67
offset_x = -7
offset_y = -8
base_size_for_offset = 320 

def generate_icon(size, output_name, make_circular=False, transparent=False):
    with Image.open(source_path) as img:
        img = img.convert('RGBA')
        
        # 1. Calculate logo size
        logo_w = int(size * scale)
        logo_h = int(size * scale)
        
        # 2. Resize logo
        resized_logo = img.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        if size <= 64:
            resized_logo = resized_logo.filter(ImageFilter.SHARPEN)
        
        # 3. BACKGROUND REMOVAL (If requested)
        if transparent:
            datas = resized_logo.getdata()
            new_data = []
            for item in datas:
                r, g, b, a = item
                brightness = max(r, g, b)
                if brightness < 10:
                    new_data.append((0, 0, 0, 0))
                else:
                    new_alpha = min(255, int(255 * (brightness / 255.0) ** 0.5 * 1.5))
                    new_data.append((r, g, b, new_alpha))
            resized_logo.putdata(new_data)
            canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        else:
            # Solid black canvas
            canvas = Image.new('RGBA', (size, size), (0, 0, 0, 255))
        
        # 4. Calculate position with offsets
        pos_x = (size - logo_w) // 2
        pos_y = (size - logo_h) // 2
        pos_x += int(offset_x * (size / base_size_for_offset))
        pos_y += int(offset_y * (size / base_size_for_offset))
        
        # 5. Paste logo
        canvas.paste(resized_logo, (pos_x, pos_y), resized_logo)
        
        # 6. Apply circular mask if requested
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

# --- 1. GENERATE TABS ICONS (SOLID BLACK + CIRCULAR) ---
# These are for the browser tabs as per your request
generate_icon(16, 'favicon-16x16.png', make_circular=True, transparent=False)
generate_icon(32, 'favicon-32x32.png', make_circular=True, transparent=False)
generate_icon(96, 'favicon-96x96.png', make_circular=True, transparent=False)
generate_icon(32, 'favicon.png', make_circular=True, transparent=False)

# --- 2. GENERATE UI LOGO (TRANSPARENT + CIRCULAR) ---
# This is specifically for Header, Footer, Loading Screen and Profiles
generate_icon(512, 'logo-transparent.png', make_circular=True, transparent=True)

# --- 3. GENERATE HOME SCREEN ICONS (SOLID BLACK + SQUARE) ---
generate_icon(180, 'apple-touch-icon.png', make_circular=False, transparent=False)
generate_icon(192, 'web-app-manifest-192x192.png', make_circular=False, transparent=False)
generate_icon(512, 'web-app-manifest-512x512.png', make_circular=False, transparent=False)

# Generate ICO for tabs (Solid Black)
ico_sizes = [16, 32, 48]
ico_images = []
for size in ico_sizes:
    ico_images.append(generate_icon(size, f'temp_{size}.png', make_circular=True, transparent=False))
ico_images[0].save(os.path.join(output_dir, 'favicon.ico'), format='ICO', sizes=[(s, s) for s in ico_sizes], append_images=ico_images[1:])

# Cleanup
for size in ico_sizes:
    temp_path = os.path.join(output_dir, f'temp_{size}.png')
    if os.path.exists(temp_path): os.remove(temp_path)

print("Icon split complete: Favicons are Solid Black, UI logo is Transparent.")
