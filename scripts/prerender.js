import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

const ROUTES = [
  'favicon-editor',
  'articles',
  'articles/leaky-bucket-funnels',
  'articles/speed-to-lead-mathematics',
  'articles/frictionless-form-design'
];

function prerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error(`Error: Built index.html not found at: ${INDEX_HTML_PATH}`);
    console.error(`Please run "vite build" first.`);
    process.exit(1);
  }

  const indexContent = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  console.log(`🚀 Starting SPA Pre-rendering (Static Directory Index Copies)...`);

  for (const route of ROUTES) {
    const targetDir = path.join(DIST_DIR, route);
    const targetFile = path.join(targetDir, 'index.html');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, indexContent, 'utf-8');
    console.log(`  ✓ Pre-rendered static path: /${route}`);
  }

  console.log(`🎉 SPA Pre-rendering complete! Static indices ready for search crawlers.`);
}

prerender();
