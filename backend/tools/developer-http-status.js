// 🔧 File: backend/tools/developer-http-status.js
// 🔗 Restituisce descrizione e categoria di uno status HTTP

const STATUS_MAP = {
  100: { phrase: 'Continue', description: 'Request received, continue with request.' },
  101: { phrase: 'Switching Protocols', description: 'Switching to a different protocol per client request.' },
  200: { phrase: 'OK', description: 'Request succeeded.' },
  201: { phrase: 'Created', description: 'Resource successfully created.' },
  202: { phrase: 'Accepted', description: 'Request accepted for processing, not yet completed.' },
  204: { phrase: 'No Content', description: 'Request succeeded, no content returned.' },
  301: { phrase: 'Moved Permanently', description: 'Resource has moved permanently to a new URL.' },
  302: { phrase: 'Found', description: 'Resource temporarily under a different URL.' },
  304: { phrase: 'Not Modified', description: 'Cached version is still valid.' },
  400: { phrase: 'Bad Request', description: 'Server could not understand the request.' },
  401: { phrase: 'Unauthorized', description: 'Authentication is required and has failed or not been provided.' },
  403: { phrase: 'Forbidden', description: 'Valid request but the server refuses action.' },
  404: { phrase: 'Not Found', description: 'Requested resource could not be found.' },
  409: { phrase: 'Conflict', description: 'Request could not be completed due to a conflict.' },
  418: { phrase: \"I'm a teapot\", description: 'RFC 2324 hyper text coffee pot control protocol.' },
  429: { phrase: 'Too Many Requests', description: 'Rate limiting in effect.' },
  500: { phrase: 'Internal Server Error', description: 'Generic server error.' },
  501: { phrase: 'Not Implemented', description: 'Server does not support this functionality.' },
  503: { phrase: 'Service Unavailable', description: 'Server currently unavailable (overloaded or down).' },
};

function categorizeStatus(code) {
  if (code >= 100 && code < 200) return 'Informational';
  if (code >= 200 && code < 300) return 'Success';
  if (code >= 300 && code < 400) return 'Redirection';
  if (code >= 400 && code < 500) return 'Client Error';
  if (code >= 500 && code < 600) return 'Server Error';
  return 'Unknown';
}

module.exports = {
  async run({ params }) {
    const code = Number(params.code);
    if (Number.isNaN(code)) {
      throw new Error('Inserisci un codice di stato HTTP valido');
    }

    const info = STATUS_MAP[code] || { phrase: 'Unknown Status', description: 'Codice HTTP non riconosciuto.' };

    return {
      code,
      category: categorizeStatus(code),
      phrase: info.phrase,
      description: info.description,
      standardized: Boolean(STATUS_MAP[code]),
    };
  },
};



