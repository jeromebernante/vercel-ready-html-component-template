import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from production directory (or development/build if it exists)
const staticDirs = [
    join(__dirname, 'development', 'build'),
    join(__dirname, 'production'),
    join(__dirname, 'development')
];

// Try to serve from build directories first, fallback to development
for (const dir of staticDirs) {
    if (existsSync(dir)) {
        app.use(express.static(dir));
        console.log(`✓ Serving static files from: ${dir}`);
        break;
    }
}

// API route for products
app.get('/api/products', async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=12');
        
        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Helper function to escape HTML
        const escapeHtml = (text) => {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return String(text).replace(/[&<>"']/g, m => map[m]);
        };
        
        // Generate HTML for products
        const productsHtml = data.products.map(product => `
            <div class="product-card">
                <div class="product-card__image">
                    <img src="${escapeHtml(product.thumbnail)}" alt="${escapeHtml(product.title)}" loading="lazy">
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${escapeHtml(product.title)}</h3>
                    <p class="product-card__description">${escapeHtml(product.description)}</p>
                    <div class="product-card__meta">
                        <span class="product-card__price">$${escapeHtml(product.price)}</span>
                        <span class="product-card__rating">
                            <span class="product-card__stars">${escapeHtml(product.rating)} ⭐</span>
                            <span class="product-card__stock">${escapeHtml(product.stock)} in stock</span>
                        </span>
                    </div>
                    <div class="product-card__brand">
                        <span class="product-card__brand-label">Brand:</span>
                        <span class="product-card__brand-name">${escapeHtml(product.brand)}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(productsHtml);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send(`<div class="error">Error loading products: ${error.message}</div>`);
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Dev server running at http://localhost:${PORT}`);
    console.log(`📦 API endpoint: http://localhost:${PORT}/api/products\n`);
});
