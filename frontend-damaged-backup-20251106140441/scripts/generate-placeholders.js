// frontend/scripts/generate-placeholders.js
const fs = require('fs');
const path = require('path');

const tools = [
  'AgeCalculator', 'Base64Encoder', 'BmiCalculator', 'ColorPicker', 'CurrencyConverter',
  'DateCalculator', 'DiceRoller', 'EmailValidator', 'FileHashGenerator', 'ImageCompressor',
  'ImageConverter', 'ImageEditor', 'IpAddressLookup', 'JsonFormatter', 'LoremIpsumGenerator',
  'MarkdownEditor', 'PasswordGenerator', 'PasswordStrengthTester', 'PdfCompressor',
  'PdfMerger', 'PdfProtector', 'PdfSplitter', 'PdfToText', 'PDFToWorldConverter',
  'QRCodeGenerator', 'RandomCardGenerator', 'RandomStringGenerator', 'RegexTester',
  'ScreenRuler', 'TextCaseConverter', 'TextDiffChecker', 'ToolPlaceholder',
  'UnitConverter', 'UrlEncoder', 'WebsiteStatusChecker', 'WordCounter'
];

const targetDir = path.join(__dirname, '../src/components/quick-tools');

// Crea la cartella se non esiste
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('📁 Creata cartella:', targetDir);
}

// Crea i file placeholder
tools.forEach(tool => {
  const filePath = path.join(targetDir, `${tool}.js`);
  if (!fs.existsSync(filePath)) {
    const content = `import React from 'react';

export default function ${tool}() {
  return (
    <div className="p-4 border rounded-xl shadow-md text-center">
      <h2 className="text-xl font-semibold mb-2">${tool}</h2>
      <p className="text-gray-600">Placeholder del tool ${tool}</p>
    </div>
  );
}
`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Creato: ${tool}.js`);
  } else {
    console.log(`⚠️ Esiste già: ${tool}.js`);
  }
});

console.log('\n✨ Generazione completata con successo!');
