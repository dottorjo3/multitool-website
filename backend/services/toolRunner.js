const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const registryPath = path.join(__dirname, '..', 'db', 'tools_registry.json');

// Funzione per leggere il registry
function readRegistry() {
  try {
    const data = fs.readFileSync(registryPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading registry:', error);
    return [];
  }
}

/**
 * Tool Runner - Esegue i tool in base all'ID
 * @param {string} toolId - ID del tool da eseguire
 * @param {object} input - Input del tool (file, body, query)
 * @returns {Promise<object>} Risultato dell'esecuzione
 */
async function run(toolId, input) {
  const tool = readRegistry().find(t => t.id === toolId);

  if (!tool) {
    throw new Error('Tool not found');
  }

  // Switch case per ogni tool implementato
  switch (toolId) {
    // ========== TEXT TOOLS ==========
    case 'json-formatter': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (!text) throw new Error('No input text provided');
      
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        throw new Error('Invalid JSON format');
      }
      
      const pretty = JSON.stringify(parsed, null, 2);
      return { success: true, output: pretty, format: 'json' };
    }

    case 'csv-to-json': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (!text) throw new Error('No input CSV provided');

      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) throw new Error('CSV must have at least a header and one row');

      const headers = lines[0].split(',').map(h => h.trim());
      const arr = lines.slice(1).map(l => {
        const cols = l.split(',');
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = cols[i] ? cols[i].trim() : '';
        });
        return obj;
      });

      return { success: true, output: arr, format: 'json' };
    }

    case 'json-to-csv': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (!text) throw new Error('No input JSON provided');

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        throw new Error('Invalid JSON format');
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('JSON must be an array of objects');
      }

      const headers = Object.keys(parsed[0]);
      const csv = [
        headers.join(','),
        ...parsed.map(obj => headers.map(h => `"${String(obj[h] || '').replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      return { success: true, output: csv, format: 'text' };
    }

    case 'text-counter': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : '');
      const words = text.split(/\s+/).filter(Boolean).length;
      const chars = text.length;
      const charsNoSpaces = text.replace(/\s/g, '').length;
      const lines = text.split(/\r?\n/).length;
      const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;

      return {
        success: true,
        output: {
          words,
          characters: chars,
          charactersNoSpaces: charsNoSpaces,
          lines,
          paragraphs
        },
        format: 'object'
      };
    }

    case 'base64-encode': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (text === null) throw new Error('No input provided');
      
      return {
        success: true,
        output: Buffer.from(text, 'utf8').toString('base64'),
        format: 'text'
      };
    }

    case 'base64-decode': {
      const text = input.body.text;
      if (!text) throw new Error('No input provided');
      
      try {
        const decoded = Buffer.from(text, 'base64').toString('utf8');
        return { success: true, output: decoded, format: 'text' };
      } catch (e) {
        throw new Error('Invalid base64 string');
      }
    }

    case 'url-encode': {
      const text = input.body.text || '';
      if (!text) throw new Error('No input provided');
      
      return {
        success: true,
        output: encodeURIComponent(text),
        format: 'text'
      };
    }

    case 'url-decode': {
      const text = input.body.text || '';
      if (!text) throw new Error('No input provided');
      
      try {
        return {
          success: true,
          output: decodeURIComponent(text),
          format: 'text'
        };
      } catch (e) {
        throw new Error('Invalid URL encoded string');
      }
    }

    case 'html-encode': {
      const text = input.body.text || '';
      if (!text) throw new Error('No input provided');
      
      const encoded = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      
      return { success: true, output: encoded, format: 'text' };
    }

    case 'html-decode': {
      const text = input.body.text || '';
      if (!text) throw new Error('No input provided');
      
      const decoded = text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/');
      
      return { success: true, output: decoded, format: 'text' };
    }

    case 'text-duplicate-remover': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : '');
      const mode = input.body.mode || 'lines'; // lines, words
      
      let output = '';
      if (mode === 'lines') {
        const lines = text.split(/\r?\n/);
        const unique = [...new Set(lines)];
        output = unique.join('\n');
      } else {
        const words = text.split(/\s+/);
        const unique = [...new Set(words)];
        output = unique.join(' ');
      }
      
      return { success: true, output, format: 'text' };
    }

    case 'whitespace-remover': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : '');
      const mode = input.body.mode || 'all'; // all, multiple, leading, trailing
      
      let output = '';
      switch (mode) {
        case 'all':
          output = text.replace(/\s/g, '');
          break;
        case 'multiple':
          output = text.replace(/\s+/g, ' ').trim();
          break;
        case 'leading':
          output = text.replace(/^\s+/gm, '');
          break;
        case 'trailing':
          output = text.replace(/\s+$/gm, '');
          break;
        default:
          output = text.trim();
      }
      
      return { success: true, output, format: 'text' };
    }

    case 'qr-generator': {
      // Stub - il QR viene generato lato client
      const data = input.body.text || input.body.url || '';
      if (!data) throw new Error('No data provided for QR code');
      
      return {
        success: true,
        output: { hint: 'client_should_generate_qr', data },
        format: 'object'
      };
    }

    case 'lorem-ipsum': {
      const count = parseInt(input.body.count) || 1;
      const type = input.body.type || 'paragraphs'; // paragraphs, words, sentences
      
      const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
      
      let output = '';
      if (type === 'paragraphs') {
        output = Array(count).fill(lorem).join('\n\n');
      } else if (type === 'words') {
        const words = lorem.split(' ');
        output = words.slice(0, count).join(' ');
      } else if (type === 'sentences') {
        const sentences = lorem.split('. ');
        output = sentences.slice(0, count).join('. ') + '.';
      }

      return { success: true, output, format: 'text' };
    }

    case 'text-case-converter': {
      const text = input.body.text || '';
      const caseType = input.body.case || 'lowercase'; // lowercase, uppercase, title, sentence
      
      let output = '';
      switch (caseType) {
        case 'lowercase':
          output = text.toLowerCase();
          break;
        case 'uppercase':
          output = text.toUpperCase();
          break;
        case 'title':
          output = text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
          break;
        case 'sentence':
          output = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
          break;
        default:
          output = text;
      }

      return { success: true, output, format: 'text' };
    }

    // ========== HASH GENERATORS ==========
    case 'md5-hash': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (!text) throw new Error('No input provided');
      
      const hash = crypto.createHash('md5').update(text).digest('hex');
      return { success: true, output: hash, format: 'text' };
    }

    case 'sha1-hash': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (!text) throw new Error('No input provided');
      
      const hash = crypto.createHash('sha1').update(text).digest('hex');
      return { success: true, output: hash, format: 'text' };
    }

    case 'sha256-hash': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (!text) throw new Error('No input provided');
      
      const hash = crypto.createHash('sha256').update(text).digest('hex');
      return { success: true, output: hash, format: 'text' };
    }

    case 'sha384-hash': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (!text) throw new Error('No input provided');
      
      const hash = crypto.createHash('sha384').update(text).digest('hex');
      return { success: true, output: hash, format: 'text' };
    }

    case 'sha512-hash': {
      const text = input.body.text || (input.file ? fs.readFileSync(input.file.path, 'utf8') : null);
      if (!text) throw new Error('No input provided');
      
      const hash = crypto.createHash('sha512').update(text).digest('hex');
      return { success: true, output: hash, format: 'text' };
    }

    // ========== DEFAULT ==========
    default:
      throw new Error(`Tool "${toolId}" is registered but not yet implemented. Please check the tool registry.`);
  }
}

module.exports = { run };
