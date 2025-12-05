// 🔧 File: backend/tools/developer-svg-to-jsx.js
// 🔗 Converte SVG a JSX

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const componentName = params.componentName || 'SvgComponent';
    
    if (!input) {
      throw new Error('Inserisci del codice SVG da convertire');
    }

    // Rimuovi dichiarazione XML se presente
    let svg = input.replace(/<\?xml[^>]*\?>/gi, '').trim();
    
    // Converti attributi kebab-case a camelCase per React
    svg = svg
      .replace(/([a-z])-([a-z])/g, (match, p1, p2) => `${p1}${p2.toUpperCase()}`)
      .replace(/xml:space/g, 'xmlSpace')
      .replace(/xmlns:xlink/g, 'xmlnsXlink')
      .replace(/xlink:href/g, 'xlinkHref');
    
    // Converti class a className
    svg = svg.replace(/\bclass=/g, 'className=');
    
    // Converti for a htmlFor (se presente)
    svg = svg.replace(/\bfor=/g, 'htmlFor=');
    
    // Rimuovi xmlns se non necessario
    svg = svg.replace(/\s+xmlns="[^"]*"/gi, '');
    
    // Crea componente JSX
    const jsx = `import React from 'react';

function ${componentName}() {
  return (
    ${svg}
  );
}

export default ${componentName};`;
    
    return {
      original: input,
      jsx,
      componentName,
      originalLength: input.length,
      jsxLength: jsx.length,
    };
  },
};


