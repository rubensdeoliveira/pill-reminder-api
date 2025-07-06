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

const structure = [
  {
    dir: 'controllers',
    filename: `create-${lower}.controller.ts`,
    template: 'create-controller.template',
  },
  {
    dir: 'controllers',
    filename: `delete-${lower}.controller.ts`,
    template: 'delete-controller.template',
  },
  {
    dir: 'controllers',
    filename: `get-${lower}.controller.ts`,
    template: 'get-controller.template',
  },
  {
    dir: 'controllers',
    filename: `list-${lower}.controller.ts`,
    template: 'list-controller.template',
  },
  {
    dir: 'controllers',
    filename: `update-${lower}.controller.ts`,
    template: 'update-controller.template',
  },
  {
    dir: 'dtos',
    filename: `${lower}.dto.ts`,
    template: 'dto.template',
  },
  {
    dir: 'dtos',
    filename: `create-${lower}.dto.ts`,
    template: 'create-dto.template',
  },
  {
    dir: 'dtos',
    filename: `delete-${lower}.dto.ts`,
    template: 'delete-dto.template',
  },
  {
    dir: 'dtos',
    filename: `get-${lower}.dto.ts`,
    template: 'get-dto.template',
  },
  {
    dir: 'dtos',
    filename: `list-${lower}.dto.ts`,
    template: 'list-dto.template',
  },
  {
    dir: 'dtos',
    filename: `update-${lower}.dto.ts`,
    template: 'update-dto.template',
  },
  {
    dir: 'entities',
    filename: `${lower}.entity.ts`,
    template: 'entity.template',
  },
  {
    dir: 'mappers',
    filename: `${lower}.mapper.ts`,
    template: 'mapper.template',
  },
  {
    dir: 'repositories',
    filename: `${lower}.repository.ts`,
    template: 'repository.template',
  },
  {
    dir: 'repositories/implementations',
    filename: `${lower}-prisma.repository.ts`,
    template: 'repository-prisma.template',
  },
  {
    dir: 'use-cases',
    filename: `create-${lower}.use-case.ts`,
    template: 'create-use-case.template',
  },
  {
    dir: 'use-cases',
    filename: `delete-${lower}.use-case.ts`,
    template: 'delete-use-case.template',
  },
  {
    dir: 'use-cases',
    filename: `get-${lower}.use-case.ts`,
    template: 'get-use-case.template',
  },
  {
    dir: 'use-cases',
    filename: `list-${lower}.use-case.ts`,
    template: 'list-use-case.template',
  },
  {
    dir: 'use-cases',
    filename: `update-${lower}.use-case.ts`,
    template: 'update-use-case.template',
  },
  {
    dir: 'validators',
    filename: `save-${lower}.validator.ts`,
    template: 'save-validator.template',
  },
  {
    dir: '',
    filename: `${lower}.module.ts`,
    template: 'module.template',
  },
];

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

for (const item of structure) {
  createFile(item.dir, item);
}
