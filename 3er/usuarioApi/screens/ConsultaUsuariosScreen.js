import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { getApiUrl } from '../utils/api';

export default function ConsultaUsuariosScreen() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

const obtenerUsuarios = async () => {
    const apiUrl = getApiUrl();
    setCargando(true);
    setError(null);
    try {
      // Timeout de 10 segundos para no quedarse colgado si no hay conexión
      const controlador = new AbortController();
      const timeout = setTimeout(() => controlador.abort(), 10000);

      const respuesta = await fetch(`${apiUrl}/v1/usuarios/`, {
        signal: controlador.signal,
      });
      clearTimeout(timeout);

      if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
      }
      const datos = await respuesta.json();
      console.log('Respuesta API:', datos, 'URL:', apiUrl);
      setUsuarios(datos.usuarios || []);
    } catch (err) {
      console.log('Error al obtener los usuarios:', err, 'URL:', apiUrl);
      setError(`No se pudo conectar a ${apiUrl}\nRevisa que la API esté encendida y en la misma red.`);
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  };

  // Refresca la lista cada vez que la pantalla obtiene foco
  // (por ejemplo, al volver de editar/eliminar un usuario)
  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>Edad: {item.edad} años</Text>

      <View style={styles.actionContainer}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/usuario/[id]',
              params: { id: item.id, nombre: item.nombre, edad: item.edad },
            })
          }
        >
          <Text style={styles.linkDetalles}>Ver detalles →</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      {cargando && <Text style={styles.estado}>Cargando usuarios...</Text>}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={obtenerUsuarios} style={styles.retryButton}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.15)',
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  actionContainer: {
    marginTop: 15,
    alignItems: 'flex-end',
  },

  linkDetalles: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 14,
  },

  estado: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 10,
  },

  errorBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  errorText: {
    color: '#B91C1C',
    textAlign: 'center',
    marginBottom: 10,
  },

  retryButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
