// 🔧 File: backend/tools/example-tool.js
// 🔗 Farm Ready — tool di esempio (echo) per testare il gateway

module.exports = {
  /**
   * Esegue la logica del tool.
   * @param {Object} ctx - Contiene params, filesMeta, requestId, userId, helpers.
   */
  async run({ params, filesMeta, requestId }) {
    return {
      message: 'Tool di esempio eseguito correttamente',
      requestId,
      receivedParams: params,
      receivedFiles: filesMeta.map((file) => ({
        name: file.originalName,
        size: file.size,
      })),
    };
  },
};

