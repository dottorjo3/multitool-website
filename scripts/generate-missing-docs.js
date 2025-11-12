const fs = require('fs');
const path = require('path');

function ensureDocs() {
  const registryPath = path.resolve(__dirname, '..', 'backend', 'db', 'tools_registry.json');
  const tools = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const docsDir = path.resolve(__dirname, '..', 'docs', 'tools');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const today = new Date().toISOString().slice(0, 10);

  const describeProperty = (key, schemaFragment) => {
    if (!schemaFragment || typeof schemaFragment !== 'object') {
      return `- \`${key}\` — Definizione non specificata`;
    }

    const types = Array.isArray(schemaFragment.type)
      ? schemaFragment.type.join('/')
      : schemaFragment.type || 'any';

    const chunks = [];
    if (schemaFragment.description) {
      chunks.push(schemaFragment.description);
    }
    chunks.push(`Tipo: ${types}`);

    if (schemaFragment.enum) {
      chunks.push(`Valori: ${schemaFragment.enum.join(', ')}`);
    }

    if (schemaFragment.default !== undefined) {
      chunks.push(`Default: ${schemaFragment.default}`);
    }

    if (schemaFragment.minLength !== undefined) {
      chunks.push(`minLength: ${schemaFragment.minLength}`);
    }

    if (schemaFragment.maxLength !== undefined) {
      chunks.push(`maxLength: ${schemaFragment.maxLength}`);
    }

    return `- \`${key}\` — ${chunks.join(' • ')}`;
  };

  tools.forEach((tool) => {
    const docPath = path.join(docsDir, `${tool.id}.md`);
    if (fs.existsSync(docPath)) {
      return;
    }

    const schemaPath = path.resolve(
      __dirname,
      '..',
      'backend',
      'tools',
      'schemas',
      `${tool.id}.schema.json`,
    );

    let schema = null;
    if (fs.existsSync(schemaPath)) {
      schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    }

    const properties = (schema && schema.properties) || {};
    const propertyLines = Object.keys(properties).length
      ? Object.entries(properties).map(([key, value]) => describeProperty(key, value))
      : ['- Nessun parametro definito nello schema'];

    const schemaString = schema ? JSON.stringify(schema, null, 2) : '{}';

    const content = [
      `# ${tool.name}`,
      '',
      `_Generated automaticamente il ${today}_`,
      '',
      `- **Tool ID:** \`${tool.id}\``,
      `- **Categoria:** \`${tool.category}\``,
      `- **Free:** ${tool.free ? 'Sì' : 'No'}`,
      `- **Descrizione breve:** ${tool.description}`,
      `- **Input:** \`${tool.inputType}\``,
      `- **Output:** \`${tool.outputType || 'n/a'}\``,
      '',
      '## Parametri principali',
      ...propertyLines,
      '',
      '## Schema',
      '```json',
      schemaString,
      '```',
      '',
    ].join('\n');

    fs.writeFileSync(docPath, content);
  });
}

ensureDocs();

