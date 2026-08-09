const fs = require("fs");
const path = require("path");

const modules = ["users", "problems", "submissions"];

const directories = [
  "prisma",
  "src/shared/config",
  "src/shared/db",
  "src/shared/middlewares",
  ...modules.map((m) => `src/modules/${m}`),
];

const files = [
  "prisma/schema.prisma",
  "src/shared/config/env.ts",
  "src/shared/db/prisma.service.ts",
  "src/shared/middlewares/validate.ts",
  "src/shared/middlewares/error.ts",
  "src/app.ts",
  "src/server.ts",
  ".env",
  ".gitignore",
  "tsconfig.json",
];

// Add layer files for each module
modules.forEach((mod) => {
  const singular = mod.endsWith("s") ? mod.slice(0, -1) : mod;
  const basePath = `src/modules/${mod}`;

  files.push(
    `${basePath}/${singular}.routes.ts`,
    `${basePath}/${singular}.controller.ts`,
    `${basePath}/${singular}.service.ts`,
    `${basePath}/${singular}.repository.ts`,
    `${basePath}/${singular}.schema.ts`,
  );
});

console.log("🚀 Generating project folder structure...");

// Create directories
directories.forEach((dir) => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// Create placeholder files
files.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }
});

console.log("✅ Project structure created successfully!");
