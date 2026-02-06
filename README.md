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
├── components/          # Reusable component templates (HTML)
│   ├── card.html       # Card component with title & description
│   ├── header.html     # Responsive header with navigation
│   ├── footer.html     # Site footer
│   └── modal.html      # Modal dialog with focus trap & scroll lock
├── widgets/            # Standalone widgets (HTML)
│   └── theme-toggle.html    # Light/dark/system theme switcher
├── pages/              # Page templates (auto-built into HTML)
│   ├── index.html      # Home page
│   ├── about.html      # About page
│   └── components.html # Component showcase & demo page
├── styles/             # Modular CSS stylesheets
│   ├── core.css        # Global styles, theme variables, utilities
│   ├── card.css        # Card component styles
│   ├── header.css      # Header component styles
│   ├── footer.css      # Footer component styles
│   ├── theme-toggle.css    # Theme selector styles
│   └── modal.css       # Modal component styles
├── scripts/            # JavaScript utilities & functionality
│   ├── theme-toggle.js # Theme switching logic
│   └── modal.js        # Modal open/close, focus trap, scroll lock
├── dist/               # (Auto-generated) Production-ready output
├── build.js            # Build script—replaces component placeholders
├── package.json        # Project dependencies & metadata
├── vercel.json         # Vercel deployment configuration
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

### Development

1. **Build the project** - Generates `/dist` from components, styles, and scripts:
   ```bash
   node build.js
   ```

2. **Start development server** - Serves built files locally:
   ```bash
   npx serve dist
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

### Viewing Components

After running the above commands, visit:
- **Home page**: http://localhost:3000
- **Components showcase**: http://localhost:3000/components.html
- **About page**: http://localhost:3000/about.html

## 🛠 Available Components

| Component | File | Features |
|-----------|------|----------|
| **Card** | `components/card.html` | Simple content card with title & description |
| **Header** | `components/header.html` | Navigation header with theme toggle |
| **Footer** | `components/footer.html` | Fixed footer with copyright |
| **Modal** | `components/modal.html` | Dialog with scroll lock, focus trap, keyboard support |
| **Theme Toggle** | `widgets/theme-toggle.html` | Light/Dark/System theme selector |

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
3. Configure build command: `node build.js`
4. Configure output directory: `dist`
5. Deploy!

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

## 🎓 Best Practices

- ✅ Keep components modular and focused
- ✅ Use consistent naming (kebab-case for files/IDs, camelCase for JS)
- ✅ Document component parameters in the showcase page
- ✅ Test components at different screen sizes
- ✅ Use semantic HTML for accessibility
- ✅ Leverage CSS variables for consistency