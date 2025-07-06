const fs = require('fs');
const path = require('path');

const entity = process.argv[2];

if (!entity) {
  console.error('❌ Você precisa passar o nome da entidade. Ex: node generate.js user');
  process.exit(1);
}

const pascal = entity[0].toUpperCase() + entity.slice(1);
const lower = entity.toLowerCase();
const kebab = entity.replace(/[A-Z]/g, m => '-' + m.toLowerCase()).replace(/^-/, '');

const srcPath = path.resolve(__dirname, '..', '..', '..'); 
const basePath = path.join(srcPath, lower);
const templatesPath = path.join(__dirname, 'templates');

const structure = {
  'controllers': {
    filename: `create-${lower}.controller.ts`,
    template: 'create-controller.template.ts',
  },
};

function processTemplate(template, replacements) {
  return Object.entries(replacements).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, 'g'), value),
    template
  );
}

function createFile(dir, { filename, template }) {
  const fullDirPath = path.join(basePath, dir);
  const filePath = path.join(fullDirPath, filename);
  const templatePath = path.join(templatesPath, template);

  fs.mkdirSync(fullDirPath, { recursive: true });

  if (fs.existsSync(filePath)) {
    console.log(`⚠️  Arquivo já existe: ${filePath}`);
    return;
  }

  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
  const finalContent = processTemplate(rawTemplate, {
    entity: lower,
    Entity: pascal,
    kebab,
  });

  fs.writeFileSync(filePath, finalContent);
  console.log(`✅ Criado: ${filePath}`);
}

for (const [dir, info] of Object.entries(structure)) {
  createFile(dir, info);
}
