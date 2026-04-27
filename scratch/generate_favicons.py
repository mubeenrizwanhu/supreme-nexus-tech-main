from PIL import Image
import os

source_path = r'public\new_favicon_source_v4.png'
output_dir = 'public'

# User parameters
scale = 0.88
offset_x = -9
offset_y = 1
# Assuming offsets were for a 512x512 canvas
base_size_for_offset = 512

def create_favicon(size, output_name):
    with Image.open(source_path) as img:
        # Create transparent canvas
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        
        # Calculate scaled dimensions
        new_width = int(size * scale)
        new_height = int(size * scale)
        
        # Resize logo
        resized_logo = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Calculate center position
        center_x = (size - new_width) // 2
        center_y = (size - new_height) // 2
        
        # Calculate offset for this size
        current_offset_x = int(offset_x * (size / base_size_for_offset))
        current_offset_y = int(offset_y * (size / base_size_for_offset))
        
        # Paste logo onto canvas
        canvas.paste(resized_logo, (center_x + current_offset_x, center_y + current_offset_y), resized_logo)
        
        # Save
        canvas.save(os.path.join(output_dir, output_name))
        return canvas

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
    create_favicon(size, name)

# Special case: favicon.ico (multi-size)
ico_sizes = [16, 32, 48]
ico_images = []
for size in ico_sizes:
    ico_images.append(create_favicon(size, f'temp_{size}.png'))

ico_images[0].save(os.path.join(output_dir, 'favicon.ico'), format='ICO', sizes=[(s, s) for s in ico_sizes], append_images=ico_images[1:])

# Cleanup temp files
for size in ico_sizes:
    os.remove(os.path.join(output_dir, f'temp_{size}.png'))

print("All favicons generated successfully with scale 0.88, x:-9, y:1")
