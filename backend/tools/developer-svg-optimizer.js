// 🔧 File: backend/tools/developer-svg-optimizer.js
// 🔗 Ottimizza SVG

const { optimize } = require('svgo');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const removeComments = params.removeComments !== 'false';
    const removeMetadata = params.removeMetadata !== 'false';
    
    if (!input) {
      throw new Error('Inserisci del codice SVG da ottimizzare');
    }

    try {
      const plugins = [];
      
      if (removeComments) {
        plugins.push('removeComments');
      }
      
      if (removeMetadata) {
        plugins.push('removeMetadata');
      }
      
      plugins.push(
        'removeDoctype',
        'removeXMLProcInst',
        'removeEditorsNSData',
        'cleanupAttrs',
        'minifyStyles',
        'convertStyleToAttrs',
        'cleanupIds',
        'removeRasterImages',
        'removeUselessDefs',
        'cleanupNumericValues',
        'cleanupListOfValues',
        'convertColors',
        'removeUnknownsAndDefaults',
        'removeNonInheritableGroupAttrs',
        'removeUselessStrokeAndFill',
        'removeViewBox',
        'cleanupEnableBackground',
        'removeHiddenElems',
        'removeEmptyText',
        'convertShapeToPath',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'collapseGroups',
        'convertPathData',
        'convertTransform',
        'removeEmptyAttrs',
        'removeEmptyContainers',
        'mergePaths',
        'removeUnusedNS',
        'sortAttrs',
        'removeTitle',
        'removeDesc',
        'removeDimensions',
        'removeAttrs',
        'removeElementsByAttr',
        'addClassesToSVGElement',
        'addAttributesToSVGElement',
        'removeOffCanvasPaths',
        'removeStyleElement',
        'removeScriptElement',
        'reusePaths'
      );
      
      const result = optimize(input, {
        plugins: plugins.map(plugin => ({ name: plugin })),
        multipass: true,
      });
      
      return {
        original: input,
        optimized: result.data,
        originalLength: input.length,
        optimizedLength: result.data.length,
        compressionRatio: ((1 - result.data.length / input.length) * 100).toFixed(2) + '%',
      };
    } catch (error) {
      throw new Error(`Errore durante l'ottimizzazione: ${error.message}`);
    }
  },
};


