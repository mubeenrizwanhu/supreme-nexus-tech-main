from PIL import Image, ImageDraw, ImageFilter
import os

source_path = r'public\NEW Black Background SN Favicon.jpeg'
output_dir = 'public'

# User parameters from Nexus Lab
scale = 1.67
offset_x = -7
offset_y = -8
base_size_for_offset = 320 

def create_circular_favicon(size, output_name):
    with Image.open(source_path) as img:
        # 1. Prepare high-quality source
        # Convert to RGBA for clean processing
        img = img.convert('RGBA')
        
        # 2. Calculate the size of the logo in the target canvas
        logo_w = int(size * scale)
        logo_h = int(size * scale)
        
        # 3. Resize logo directly to final required size using Lanczos
        resized_logo = img.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        
        # 4. Sharpen for small sizes (prevents blur in 16x16 and 32x32)
        if size <= 64:
            resized_logo = resized_logo.filter(ImageFilter.SHARPEN)
        
        # 5. Create the canvas (Transparent)
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        
        # 6. Draw circular background (Solid Black)
        draw = ImageDraw.Draw(canvas)
        draw.ellipse((0, 0, size - 1, size - 1), fill=(0, 0, 0, 255))
        
        # 7. Calculate position with offsets
        pos_x = (size - logo_w) // 2
        pos_y = (size - logo_h) // 2
        pos_x += int(offset_x * (size / base_size_for_offset))
        pos_y += int(offset_y * (size / base_size_for_offset))
        
        # 8. Paste logo
        canvas.paste(resized_logo, (pos_x, pos_y), resized_logo)
        
        # 9. Apply a clean, high-res circular mask for anti-aliasing
        # We create a 4x larger mask and downsample it for smooth edges
        oversample = 4
        mask_size = size * oversample
        mask = Image.new('L', (mask_size, mask_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse((0, 0, mask_size - 1, mask_size - 1), fill=255)
        mask = mask.resize((size, size), Image.Resampling.LANCZOS)
        
        # Apply the smooth mask
        final_output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        final_output.paste(canvas, (0, 0), mask)
        
        # 10. Save with maximum quality
        final_output.save(os.path.join(output_dir, output_name), 'PNG', optimize=True)
        return final_output

# Standard sizes
sizes = {
    16: 'favicon-16x16.png',
    32: 'favicon-32x32.png',
    96: 'favicon-96x96.png',
    180: 'apple-touch-icon.png',
    192: 'web-app-manifest-192x192.png',
    512: 'web-app-manifest-512x512.png'
}

for size, name in sizes.items():
    create_circular_favicon(size, name)

# Special case: favicon.ico (multi-size, unsharpened usually best for ICO)
ico_sizes = [16, 32, 48]
ico_images = []
for size in ico_sizes:
    ico_images.append(create_circular_favicon(size, f'temp_{size}.png'))

ico_images[0].save(os.path.join(output_dir, 'favicon.ico'), format='ICO', sizes=[(s, s) for s in ico_sizes], append_images=ico_images[1:])

# Create fallback favicon.png
create_circular_favicon(32, 'favicon.png')

# Cleanup temp files
for size in ico_sizes:
    os.remove(os.path.join(output_dir, f'temp_{size}.png'))

print("High-clarity circular favicons published successfully.")
