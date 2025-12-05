// 🔧 File: backend/tools/text-dup-lines-advanced.js
// 🔗 Trova righe duplicate con statistiche avanzate

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const caseSensitive = params.caseSensitive === 'true';
    const trimWhitespace = params.trimWhitespace !== 'false';
    
    if (!input) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const lines = input.split(/\r?\n/);
    const processed = trimWhitespace ? lines.map(l => l.trim()) : lines;
    const normalized = caseSensitive ? processed : processed.map(l => l.toLowerCase());
    
    const lineCount = {};
    const duplicates = [];
    const unique = [];
    
    normalized.forEach((line, index) => {
      const original = processed[index];
      if (line.length === 0) {
        unique.push({ line: original, index: index + 1, count: 1 });
        return;
      }
      
      if (!lineCount[line]) {
        lineCount[line] = { count: 0, indices: [], original };
      }
      lineCount[line].count += 1;
      lineCount[line].indices.push(index + 1);
    });
    
    Object.entries(lineCount).forEach(([normalizedLine, data]) => {
      if (data.count > 1) {
        duplicates.push({
          line: data.original,
          count: data.count,
          indices: data.indices,
        });
      } else {
        unique.push({
          line: data.original,
          index: data.indices[0],
          count: 1,
        });
      }
    });
    
    duplicates.sort((a, b) => b.count - a.count);
    
    return {
      totalLines: lines.length,
      uniqueLines: unique.length,
      duplicateLines: duplicates.length,
      duplicates,
      stats: {
        totalDuplicates: duplicates.reduce((sum, d) => sum + d.count - 1, 0),
        mostDuplicated: duplicates.length > 0 ? duplicates[0] : null,
      },
    };
  },
};

