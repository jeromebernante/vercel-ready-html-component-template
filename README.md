# ComponentHub

A lightweight, reusable component library built with vanilla HTML, CSS, and JavaScript. Create, organize, and showcase UI components with automatic build and deployment support using Vercel.

## ✨ Features

- 🔧 **Reusable Components** - Build once, use everywhere with template variables and parameters
- 🎨 **Theme System** - Built-in light/dark theme support with system preference detection
- 📱 **Responsive Design** - Mobile-first approach with responsive CSS components
- ♿ **Accessible** - ARIA attributes and keyboard navigation (focus trapping, Tab key support)
- 🚀 **Production Ready** - Deploy to Vercel with zero configuration
- 📦 **Zero Dependencies** - Pure HTML, CSS, and JavaScript—no framework bloat

## 📁 Project Structure

```
componenthub/
├── development/        # Source files (edit here)
│   ├── components/     # Reusable component templates (HTML)
│   │   ├── card.html
│   │   ├── footer.html
│   │   ├── header-hide-on-scroll-neurox.html
│   │   ├── modal.html
│   │   ├── section-media-header.html
│   │   └── section-no-content.html
│   ├── widgets/        # Standalone widgets (HTML)
│   │   └── theme-toggle.html
│   ├── pages/          # Page templates (auto-built into HTML)
│   │   ├── index.html
│   │   ├── about.html
│   │   └── components.html
│   ├── styles/         # Modular CSS stylesheets
│   │   ├── core.css
│   │   ├── card.css
│   │   ├── footer.css
│   │   ├── modal.css
│   │   └── theme-toggle.css
│   ├── scripts/        # JavaScript utilities
│   │   ├── theme-toggle.js
│   │   └── modal.js
│   ├── images/         # Static assets
│   └── build/          # (Auto-generated) Dev build output (npm run build:dev)
├── production/         # (Auto-generated) Production output for deployment
├── build.js            # Build script—reads from development/, outputs to production/ or development/build/
├── package.json        # Project dependencies & scripts
├── vercel.json         # Vercel deployment (output: production)
└── README.md           # This file
```

## 🎯 Component System

Components use **template placeholders** for reusability:

- `{{componentName}}` - Insert component as-is
- `{{componentName:param=value}}` - Pass parameters to components

**Example:**
```html
{{card:title=My Feature|description=This is awesome|icon=⭐}}
```

Becomes:
```html
<div class="card">
    <h3>My Feature</h3>
    <p>This is awesome</p>
</div>
```

## 🚀 How to Run

### Prerequisites
- Node.js 14+ installed

### Production build (for deployment or local preview)

1. **Build** - Reads from `development/`, outputs to `production/`:
   ```bash
   npm run build
   ```

2. **Serve** - Preview the production build locally:
   ```bash
   npx serve production
   ```

### Development build (local dev)

1. **Build for dev** - Outputs to `development/build/`:
   ```bash
   npm run build:dev
   ```

2. **Serve** - Preview the dev build:
   ```bash
   npx serve development/build
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

### Viewing Components

After building and serving, visit:
- **Home page**: http://localhost:3000
- **Components showcase**: http://localhost:3000/components.html
- **About page**: http://localhost:3000/about.html

## 🛠 Available Components

| Component | File | Features |
|-----------|------|----------|
| **Card** | `development/components/card.html` | Simple content card with title & description |
| **Header** | `development/components/header-hide-on-scroll-neurox.html` | Header with hide-on-scroll behavior |
| **Footer** | `development/components/footer.html` | Site footer |
| **Modal** | `development/components/modal.html` | Dialog with scroll lock, focus trap, keyboard support |
| **Section (media header)** | `development/components/section-media-header.html` | Media header section |
| **Section (no content)** | `development/components/section-no-content.html` | Placeholder section |
| **Theme Toggle** | `development/widgets/theme-toggle.html` | Light/Dark/System theme selector |

## 🎨 Theme System

The design system uses CSS variables for theming:

```css
--primary           /* Brand color (green by default) */
--bg                /* Background color */
--text              /* Text color */
--muted             /* Muted text color */
--card-bg           /* Card background */
--radius            /* Border radius */
--shadow            /* Box shadow */
--max-width         /* Container max width */
--gap               /* Default spacing */
```

Toggle themes via the theme selector dropdown or set manually:
```html
<html data-theme="dark">
```

Supports: `light`, `dark`, or OS preference (default).

## 📦 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Build command: `npm run build` (or `node build.js`)
4. Output directory: `production`
5. Deploy!

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

The project’s `vercel.json` already sets `outputDirectory` to `production`.

### Build scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build from `development/` → `production/` (for deploy) |
| `npm run build:dev` | Build from `development/` → `development/build/` (local dev) |

## 🎓 Best Practices

- ✅ Edit source files only in `development/` (components, pages, styles, scripts, images, widgets)
- ✅ Keep components modular and focused
- ✅ Use consistent naming (kebab-case for files/IDs, camelCase for JS)
- ✅ Document component parameters in the showcase page
- ✅ Test components at different screen sizes
- ✅ Use semantic HTML for accessibility
- ✅ Leverage CSS variables for consistency