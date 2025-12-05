/**
 * API Service - Gestisce tutte le chiamate al backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

/**
 * Funzione helper per fare richieste fetch con gestione errori
 */
let refreshInFlight = null;

function getJsonHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

// 🔧 Timeout per richieste (5 minuti per tool che processano file grandi)
const DEFAULT_TIMEOUT = 300000; // 5 minuti

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const { _retry = true, timeout = DEFAULT_TIMEOUT, ...restOptions } = options;

  const defaultOptions = {
    headers: {
      ...getJsonHeaders(),
    },
  };

  // Aggiungi token se presente
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...restOptions,
    headers: {
      ...defaultOptions.headers,
      ...restOptions.headers,
    },
  };

  // 🔧 Implementa timeout con AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));
    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = new Error(data.error || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      if (data.details) {
        error.details = data.details;
      }
      if (data.limits) {
        error.limits = data.limits;
      }

      const shouldAttemptRefresh = _retry
        && (error.status === 401 || error.status === 403)
        && !endpoint.startsWith('/auth/refresh')
        && authAPI.getRefreshToken();

      if (shouldAttemptRefresh) {
        try {
          await refreshAccessToken();
          return fetchAPI(endpoint, { ...restOptions, _retry: false });
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
        }
      }

      throw error;
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Gestisci timeout
    if (error.name === 'AbortError') {
      const timeoutError = new Error('Richiesta timeout - Il server sta impiegando troppo tempo a rispondere');
      timeoutError.timeout = true;
      throw timeoutError;
    }
    
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * API Tools
 */
export const toolsAPI = {
  // Ottieni lista di tutti i tool
  getAll: async () => {
    return fetchAPI('/tools');
  },

  // Ottieni dettagli di un tool specifico
  getById: async (toolId) => {
    return fetchAPI(`/tools/${toolId}`);
  },

  // Esegui un tool (timeout esteso per file grandi)
  run: async (toolId, formData) => {
    return fetchAPI(`/tools/${toolId}/run`, {
      method: 'POST',
      timeout: 600000, // 10 minuti per tool che processano file
      headers: {
        // Non impostare Content-Type, lascia che il browser lo faccia per FormData
      },
      body: formData,
    });
  },

};

/**
 * API Auth
 */
export const authAPI = {
  // Login
  login: async (email, password) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Restore demo user (per test)
  restoreDemoUser: async () => {
    return fetchAPI('/auth/restore-demo-user', {
      method: 'POST',
    });
  },

  // Verifica utente corrente
  getMe: async () => {
    return fetchAPI('/auth/me');
  },

  // Logout (rimuove token)
  logout: async () => {
    const refreshToken = authAPI.getRefreshToken();
    if (refreshToken) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: getJsonHeaders(),
          body: JSON.stringify({ refreshToken }),
        });
      } catch (error) {
        console.warn('Logout request failed:', error);
      }
    }
    authAPI.clearSession();
  },

  // Salva token
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  setRefreshToken: (token) => {
    if (token) {
      localStorage.setItem('refreshToken', token);
    } else {
      localStorage.removeItem('refreshToken');
    }
  },

  // Ottieni token
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  clearSession: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Verifica se utente è loggato
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

async function refreshAccessToken() {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  const refreshToken = authAPI.getRefreshToken();
  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  refreshInFlight = (async () => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: getJsonHeaders(),
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      authAPI.clearSession();
      const error = new Error(data.error || 'Refresh token invalid');
      error.status = response.status;
      throw error;
    }

    authAPI.setToken(data.token);
    authAPI.setRefreshToken(data.refreshToken);
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

const apiClient = {
  tools: toolsAPI,
  auth: authAPI,
};

export default apiClient;

