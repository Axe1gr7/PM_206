import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../utils/api';

export default function DetallesUsuarioScreen({ usuario }) {
  const router = useRouter();
  const [eliminando, setEliminando] = useState(false);

  const mostrarMensaje = (titulo, mensaje, alAceptar) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n: ${mensaje}`);
      if (alAceptar) alAceptar();
    } else {
      Alert.alert(titulo, mensaje, [
        { text: 'OK', onPress: alAceptar }
      ]);
    }
  };

  const eliminarUsuario = async () => {
    try {
      setEliminando(true);
      const respuesta = await fetch(`${API_URL}/v1/usuarios/${usuario.id}`, {
        method: 'DELETE',
      });

      if (respuesta.ok) {
        mostrarMensaje('Éxito', 'Usuario eliminado correctamente.', () => router.replace('/consulta'));
      } else {
        console.log('Error al eliminar usuario:', respuesta.status);
        mostrarMensaje('Error', 'No se pudo eliminar el usuario.');
      }
    } catch (error) {
      console.log('Error al eliminar:', error);
      mostrarMensaje('Error', 'Ocurrió un problema de conexión.');
    } finally {
      setEliminando(false);
    }
  };

  const confirmarEliminacion = () => {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${usuario.nombre}?`);
      if (confirmar) {
        eliminarUsuario();
      }
      return;
    }

    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que deseas eliminar al usuario ${usuario.nombre}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí, eliminar',
          onPress: eliminarUsuario,
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={styles.backText}>Volver</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Detalle del usuario</Text>
      </View>

      <Text style={styles.titulo}>Detalles del Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{usuario.nombre}</Text>
        
        <View style={styles.linea}></View>

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.valor}>{usuario.edad} años</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.btnActualizar} 
          onPress={() => router.push({ pathname: '/usuario/actualizar/[id]', params: { id: usuario.id, nombre: usuario.nombre, edad: usuario.edad } })}
        >
          <Text style={styles.btnTextActualizar}>Actualizar</Text>
        </Pressable>

        <Pressable 
          style={styles.btnEliminar} 
          onPress={confirmarEliminacion}
          disabled={eliminando}
        >
          {eliminando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.btnTextEliminar}>Eliminar</Text>
          )}
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  btnActualizar: {
    backgroundColor: '#FACC15', // Yellow from screenshot
    paddingVertical: 12,
    width: '60%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnTextActualizar: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnEliminar: {
    backgroundColor: '#EF4444', // Red from screenshot
    paddingVertical: 12,
    width: '60%',
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTextEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
