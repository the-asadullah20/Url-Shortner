/**
 * Linqo API Client
 * Connects to existing FastAPI backend endpoints with strict contract fidelity.
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
).replace(/\/+$/, '');

/**
 * Standard fetch wrapper with normalized error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // If response is not ok, parse error details
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.details || errorData.message || errorMessage;
      } catch {
        const text = await response.text();
        if (text) errorMessage = text;
      }
      throw new Error(errorMessage);
    }

    // Attempt to parse JSON response
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    }
    return response;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Ensure FastAPI is running.`);
    }
    throw err;
  }
}

/**
 * Shorten URL
 * Endpoint: POST /shorten
 * Body: { original_url: "https://example.com" }
 */
export async function shortenUrl(originalUrl) {
  const data = await request('/shorten', {
    method: 'POST',
    body: JSON.stringify({ original_url: originalUrl }),
  });

  // Extract short_code from short_url if backend doesn't explicitly return it
  let shortCode = data.short_code;
  if (!shortCode && data.short_url) {
    const parts = data.short_url.split('/').filter(Boolean);
    shortCode = parts[parts.length - 1];
  }

  return {
    original_url: data.original_url || originalUrl,
    short_url: data.short_url,
    short_code: shortCode || '',
  };
}

/**
 * Get direct QR code image URL
 * Endpoint: GET /qr/{short_code}
 */
export function getQrCodeUrl(shortCode) {
  return `${API_BASE_URL}/qr/${encodeURIComponent(shortCode)}`;
}

/**
 * Download QR code PNG image directly
 */
export async function downloadQrCode(shortCode) {
  const qrUrl = getQrCodeUrl(shortCode);
  const response = await fetch(qrUrl);
  if (!response.ok) {
    throw new Error(`Failed to download QR code image (${response.status})`);
  }
  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `linqo-qr-${shortCode}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
}

/**
 * User Login
 * Endpoint: POST /auth/login
 * Body: { email, password }
 */
export async function loginUser(email, password) {
  return await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/**
 * User Registration
 * Endpoint: POST /auth/register
 * Body: { email, password }
 */
export async function registerUser(email, password) {
  return await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Google OAuth URL
 * Endpoint: GET /auth/google
 * Response: { url: "..." }
 */
export async function getGoogleAuthUrl() {
  const res = await request('/auth/google', {
    method: 'GET',
  });
  return res.url || res;
}
