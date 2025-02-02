const fs = require("fs");
const path = require("path");
const config = require("./dynamic.css.config.js"); // Load color configuration

const SRC_DIR = path.resolve(__dirname, "../src/");
const DIST_CSS = path.resolve(__dirname, "../dist/dynamic.css").trim();

// Regex patterns
const classRegex = /className=["'`]([^"']+)["'`]/g;
const utilityRegex = /^([a-zA-Z-]+)\[([^\]]+)\]$/; // Matches "property[value]"

// Helper function to extract class names from JSX/TSX files
const extractClassNames = (content) => {
    const classSet = new Set();
    let match;

    while ((match = classRegex.exec(content)) !== null) {
        match[1].split(/\s+/).forEach(cls => classSet.add(cls.trim()));
    }

    return Array.from(classSet);
};

// Convert utility class to CSS rule, using variables from config if applicable
const generateCSSRule = (className) => {
    const match = className.match(utilityRegex);
    if (!match) return null;

    const property = match[1].replace(/-/g, "-"); // Preserve dashes
    let value = match[2];

    // Use the color from config if it's defined
    if (config.variables[value]) {
        value = `var(--${value})`;
    }

    return `.${className.replace(/[\[\]]/g, "\\$&")} { ${property}: ${value}; }`;
};

// Recursive function to scan files in a directory
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

// Function to generate the CSS content
const generateCSSContent = (classList) => {
    const colorDefinitions = Object.entries(config.variables)
        .map(([key, value]) => `--${key}: ${value};`)
        .join('');

    const cssRules = Array.from(classList)
        .map(generateCSSRule)
        .filter(Boolean) // Remove null values

    return `:root {${colorDefinitions}}` + cssRules.join('\n');
};

// Main function to generate and write dynamic CSS
const generateAndWriteCSS = () => {
    const classList = readFiles(SRC_DIR);
    const generatedCSS = generateCSSContent(classList);

    // Write the generated CSS to the dist folder
    fs.writeFile(DIST_CSS, generatedCSS, { encoding: 'utf-8', flag: 'w' }, (err) => {
        if (err) return console.log(err.message);

        console.log(`Dynamic CSS successfully created in "${DIST_CSS}", ${classList.size} classes generated!`);
    });
};

// Run the function to generate the CSS
generateAndWriteCSS();
