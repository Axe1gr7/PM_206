import Constants from 'expo-constants';
import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// URL BASE DE LA API
// ---------------------------------------------------------------------------
// APK (producción): siempre usa la IP del servidor (apiHost de app.json).
// Expo Go: intenta detectar el host del bundler automáticamente.
// ---------------------------------------------------------------------------

// IP fija del servidor donde corre la API (tu Mac).
const IP_SERVIDOR = 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/libros';


// Se toma el host desde app.json (extra.apiHost) si existe, si no usa el fijo.
const PRODUCCION_HOST =
  Constants.expoConfig?.extra?.apiHost ?? IP_SERVIDOR;

function extraerHost(valor) {
  if (!valor) return null;
  const sinProtocolo = String(valor).replace(/^[a-zA-Z]+:\/\//, '');
  const host = sinProtocolo.split(':')[0];
  if (!host || host === 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/libros') return null;
  return host;
}

function obtenerHostExpo() {
  const fuentes = [
    Constants.expoConfig?.hostUri,
    Constants.expoGoConfig?.hostUri,
    Constants.expoGoConfig?.debuggerHost,
    Constants.manifest2?.extra?.expoGo?.debuggerHost,
    Constants.manifest2?.extra?.expoGo?.hostUri,
    Constants.linkingUri,
    Constants.experienceUrl,
  ];

  for (const fuente of fuentes) {
    const host = extraerHost(fuente);
    if (host) return host;
  }
  return null;
}

export function getApiUrl() {
  // APK instalado (producción): SIEMPRE usa la IP del servidor.
  if (!__DEV__) {
    return `http://${PRODUCCION_HOST}:${PUERTO_API}`;
  }

  // En desarrollo con Expo Go: intenta usar el host del bundler.
  const host = obtenerHostExpo();
  if (host) {
    return `http://${host}`;
  }

  if (Platform.OS === 'web') {
    return `https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/libros`;
  }

  // Último recurso: la IP del servidor.
  return `https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/libros`;
}

export const API_URL = getApiUrl();
