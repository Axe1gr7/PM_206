import Constants from 'expo-constants';
import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// OBTENER LA URL BASE DE LA API DINÁMICAMENTE
// ---------------------------------------------------------------------------
// En desarrollo (Expo Go) usamos el host del servidor de desarrollo (hostUri)
// para apuntar a la misma máquina donde corre la API.
//
// En un APK/compilación de producción no hay servidor de desarrollo, así que
// se usa una IP fija configurada abajo (IP de la máquina donde corre la API
// dentro de la misma red). Cambia PRODUCCION_IP según tu caso.
// ---------------------------------------------------------------------------

const PUERTO_API = 5000;

// IP de la máquina que corre la API (para usar en APK de producción).
// Debe ser la IP local del equipo en la red (ej. 192.168.1.10).
const PRODUCCION_HOST = '192.168.1.10';

function obtenerHostExpo() {
  // En desarrollo, expoConfig.hostUri trae algo como "192.168.1.10:8081"
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoGo?.debuggerHost ||
    '';
  if (hostUri) {
    // Nos quedamos solo con la parte del host (sin el puerto de Expo)
    const host = hostUri.split(':')[0];
    if (host) return host;
  }
  return null;
}

function obtenerBaseURL() {
  // 1) En Expo Go (desarrollo/apk de dev) usamos el host del Metro bundler
  const host = obtenerHostExpo();
  if (host) {
    return `http://${host}:${PUERTO_API}`;
  }

  // 2) En producción (APK standalone) usamos la IP fija configurada
  if (!__DEV__) {
    return `http://${PRODUCCION_HOST}:${PUERTO_API}`;
  }

  // 3) Fallbacks según la plataforma (solo desarrollo)
  if (Platform.OS === 'web') {
    return `http://localhost:${PUERTO_API}`;
  }

  // Emuladores de Android usan 10.0.2.2 para llegar al host
  return `http://10.0.2.2:${PUERTO_API}`;
}

export const API_URL = obtenerBaseURL();
