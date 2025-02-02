const fs = require("fs");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "../src/"); // Adjust based on project structure
const DIST_CSS = path.resolve(__dirname, "../dist/dynamic.css").trim();

// Regex to match class names like margin-left[10px] or padding-right[20px]
const classRegex = /className=["'`]([^"']+)["'`]/g;
const utilityRegex = /^([a-zA-Z-]+)\[([^\]]+)\]$/; // Matches "property[value]"

// Function to extract class names from JSX/TSX files
const extractClassNames = (content) => {
    const classSet = new Set();
    let match;

    while ((match = classRegex.exec(content)) !== null) {
        const classes = match[1].split(/\s+/);
        classes.forEach(cls => classSet.add(cls.trim()));
    }

    return Array.from(classSet);
};

// Convert utility class to CSS rule
const generateCSSRule = (className) => {
    const match = className.match(utilityRegex);
    if (!match) return null;

    const property = match[1].replace(/-/g, "-"); // Preserve dashes
    const value = match[2];

    return `.${className.replace(/[\[\]]/g, "\\$&")} { ${property}: ${value}; }`;
};

// Recursive function to scan all JSX/TSX files
const readFiles = (dir) => {
    let classList = new Set();

    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            classList = new Set([...classList, ...readFiles(filePath)]);
        } else if (file.endsWith(".jsx") || file.endsWith(".tsx")) {
            const content = fs.readFileSync(filePath, "utf8");
            extractClassNames(content).forEach(cls => classList.add(cls));
        }
    });

    return classList;
};

// Generate dynamic CSS
const classList = readFiles(SRC_DIR);
const cssContent = Array.from(classList)
    .map(generateCSSRule)
    .filter(Boolean) // Re

fs.writeFile(DIST_CSS, cssContent.join('\n'), { encoding: 'utf-8', flag: 'w' }, (err) => {
    if (err) return console.log(err.message);

    console.log(`Dynamic CSS successfully created CSS file in "${DIST_CSS}", ${cssContent.length} classes made!`);
})