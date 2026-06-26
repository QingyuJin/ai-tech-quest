const viteEnv = import.meta.env ?? {};
const API_BASE_URL = (viteEnv.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

export function isApiModeEnabled() {
  return Boolean(API_BASE_URL);
}

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("尚未設定後端 API 網址。");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed: ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  enabled: isApiModeEnabled(),
  get(path) {
    return request(path);
  },
  post(path, body) {
    return request(path, { method: "POST", body });
  },
};
