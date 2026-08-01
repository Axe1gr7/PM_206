import Constants from 'expo-constants';
import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// OBTENER LA URL BASE DE LA API DINÁMICAMENTE
// ---------------------------------------------------------------------------
// La IP del equipo puede cambiar (WiFi, celular, etc.). En lugar de hardcodear
// una IP fija, usamos el host del servidor de desarrollo de Expo (hostUri).
//
// Ejemplo: si Expo corre en http://172.20.10.3:8081, la API estará en
// http://172.20.10.3:5000
// ---------------------------------------------------------------------------

const PUERTO_API = 5000;

function obtenerHostExpo() {
  // En desarrollo, expoConfig.hostUri trae algo como "192.168.1.10:8081"
  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.debuggerHost || '';
  if (hostUri) {
    // Nos quedamos solo con la parte del host (sin el puerto de Expo)
    const host = hostUri.split(':')[0];
    if (host) return host;
  }
  return null;
}

function obtenerBaseURL() {
  const host = obtenerHostExpo();

  if (host) {
    return `http://${host}:${PUERTO_API}`;
  }

  // Fallbacks según la plataforma
  if (Platform.OS === 'web') {
    return `http://localhost:${PUERTO_API}`;
  }

  // Emuladores de Android usan 10.0.2.2 para llegar al host
  return `http://10.0.2.2:${PUERTO_API}`;
}

export const API_URL = obtenerBaseURL();

