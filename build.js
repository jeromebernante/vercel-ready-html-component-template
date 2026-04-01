import fs from "fs";
import path from "path";

// Source folders live under development/
const DEV_SRC = "./development";
const DIRS = {
  components: path.join(DEV_SRC, "components"),
  pages: path.join(DEV_SRC, "pages"),
  styles: path.join(DEV_SRC, "styles"),
  scripts: path.join(DEV_SRC, "scripts"),
  images: path.join(DEV_SRC, "images"),
};

// Output: production/ for deploy, development/build/ for dev
const target = process.argv[2] === "development" ? "development" : "production";
const outDir = target === "production"
  ? "./production"
  : path.join(DEV_SRC, "build");

const THEME_SCRIPT = `<script>(function(){try{var k='theme-preference',t=localStorage.getItem(k);if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else if(t==='light'){document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.removeAttribute('data-theme');}}catch(e){} })()</script>`;

/**
 * Remove all files and directories from output directory
 */
function cleanOutDir() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
    return;
  }

  for (const file of fs.readdirSync(outDir)) {
    const fullPath = path.join(outDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else if (file.endsWith(".html")) {
      fs.unlinkSync(fullPath);
    }
  }
}

/**
 * Copy directory contents to destination
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) return;
  
  // Clean destination if it exists
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    fs.copyFileSync(path.join(src, file), path.join(dest, file));
  }
}

/**
 * Load all HTML files from directories into a components object
 */
function loadComponents(dirs) {
  const components = {};
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".html")) continue;
      const name = path.basename(file, ".html");
      components[name] = fs.readFileSync(path.join(dir, file), "utf-8");
    }
  }
  
  return components;
}

/**
 * Parse parameterized placeholders like {{card:title=Hello|desc=World}}
 */
function parseParams(paramStr) {
  const params = {};
  if (!paramStr) return params;
  
  paramStr.split("|").forEach((pair) => {
    const [key, ...valueParts] = pair.split("=");
    params[key.trim()] = valueParts.join("=").trim();
  });
  
  return params;
}

/**
 * Parse shortcode attributes like: title="Hello" description='World'
 */
function parseShortcodeAttributes(attrStr) {
  const params = {};
  if (!attrStr) return params;

  const attrRegex = /([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"']+))/g;
  let match;

  while ((match = attrRegex.exec(attrStr)) !== null) {
    const [, key, doubleQuoted, singleQuoted, unquoted] = match;
    params[key] = doubleQuoted ?? singleQuoted ?? unquoted ?? "";
  }

  return params;
}

/**
 * Interpolate template variables in component
 */
function interpolateComponent(template, params) {
  return template.replace(/\{\{([\w-]+)\}\}/g, (match, key) => {
    return params[key] || match;
  });
}

/**
 * Replace placeholders recursively (handles nested components)
 */
function replaceComponentsRecursively(html, components, maxIterations = 10) {
  let prevHtml = "";
  let iterations = 0;
  
  while (prevHtml !== html && iterations < maxIterations) {
    prevHtml = html;

    // Block shortcode format:
    // [component-name title="Hello"]...inner html/components...[/component-name]
    html = html.replace(/\[([\w-]+)([^\]]*)\]([\s\S]*?)\[\/\1\]/g, (match, name, attrStr, inner) => {
      const component = components[name];
      if (!component) return match;
      const params = {
        ...parseShortcodeAttributes(attrStr),
        content: inner.trim(),
        innerContent: inner.trim(),
        children: inner.trim(),
      };
      return interpolateComponent(component, params);
    });

    // Single shortcode format: [component-name title="Hello"]
    html = html.replace(/\[(?!\/)([\w-]+)([^\]]*)\]/g, (match, name, attrStr) => {
      const component = components[name];
      if (!component) return match;
      const params = {
        ...parseShortcodeAttributes(attrStr),
        content: "",
        innerContent: "",
        children: "",
      };
      return interpolateComponent(component, params);
    });

    html = html.replace(/\{\{([\w-]+)(?::([^}]*))?\}\}/g, (match, name, paramStr) => {
      const component = components[name];
      if (!component) return match;
      const params = {
        ...parseParams(paramStr),
        content: "",
        innerContent: "",
        children: "",
      };
      return interpolateComponent(component, params);
    });
    iterations++;
  }
  
  return html;
}

/**
 * Inject theme script at the start of <head> to prevent theme flash
 */
function injectThemeScript(html) {
  return html.replace(
    /(<head[^>]*>)/i,
    `$1\n${THEME_SCRIPT}`
  );
}

// Main build process
function build() {
  cleanOutDir();
  copyDirectory(DIRS.styles, path.join(outDir, "styles"));
  copyDirectory(DIRS.scripts, path.join(outDir, "scripts"));
  copyDirectory(DIRS.images, path.join(outDir, "images"));

  const components = loadComponents([DIRS.components]);

  for (const file of fs.readdirSync(DIRS.pages)) {
    let html = fs.readFileSync(path.join(DIRS.pages, file), "utf-8");
    html = replaceComponentsRecursively(html, components);
    html = injectThemeScript(html);

    const name = path.basename(file, ".html");
    const outputPath = name === "index"
      ? path.join(outDir, file)
      : path.join(outDir, `${name}.html`);

    fs.writeFileSync(outputPath, html);
  }

  console.log(`Build complete → ${target}`);
}

build();
