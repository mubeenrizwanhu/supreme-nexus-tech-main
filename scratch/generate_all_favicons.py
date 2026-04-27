import PIL.Image as Image
import os
import json

# Source: the high-res favicon we just created
source_path = 'public/favicon.png'

def generate():
    img = Image.open(source_path).convert("RGBA")
    
    # Standard sizes
    sizes = {
        'favicon-32x32.png': (32, 32),
        'favicon-16x16.png': (16, 16),
        'apple-touch-icon.png': (180, 180),
        'android-chrome-192x192.png': (192, 192),
        'android-chrome-512x512.png': (512, 512),
    }
    
    for name, size in sizes.items():
        resized = img.resize(size, Image.Resampling.LANCZOS)
        resized.save(f'public/{name}', "PNG")
        print(f"Generated {name}")

    # Generate Manifest
    manifest = {
        "name": "Supreme Nexus",
        "short_name": "Supreme Nexus",
        "icons": [
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "theme_color": "#000000",
        "background_color": "#000000",
        "display": "standalone"
    }
    
    with open('public/site.webmanifest', 'w') as f:
        json.dump(manifest, f, indent=2)
    print("Generated site.webmanifest")

if __name__ == "__main__":
    generate()
