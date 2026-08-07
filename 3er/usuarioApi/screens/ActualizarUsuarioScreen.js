import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../utils/api';

export default function ActualizarUsuarioScreen({ usuario }) {
  const router = useRouter();

  const [nombre, setNombre] = useState(usuario.nombre || '');
  const [edad, setEdad] = useState(usuario.edad ? String(usuario.edad) : '');
  const [carga, setCarga] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const actualizarUsuario = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Vacíos', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      setCarga(true);
      const respuesta = await fetch(`${API_URL}/v1/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombre, edad: Number(edad) }),
      });

      if (respuesta.ok) {
        mostrarMensaje('Éxito', 'Usuario actualizado correctamente.');
        router.replace('/consulta');
      } else {
        console.log('Error al actualizar usuario:', respuesta.status);
        mostrarMensaje('Error', 'No se pudo actualizar el usuario. Intente nuevamente.');
      }
    } catch (error) {
      console.log('Error al actualizar usuario:', error);
      mostrarMensaje('Error', 'Ocurrió un error al actualizar el usuario.');
    } finally {
      setCarga(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={styles.backText}>Detalle del usuario</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Actualizar Usuario</Text>
      </View>

      <Text style={styles.titulo}>Actualizar Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.btnActualizar}
            onPress={actualizarUsuario}
            disabled={carga}
          >
            {carga ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.btnTextActualizar}>Guardar cambios</Text>
            )}
          </Pressable>
        </View>
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
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnActualizar: {
    backgroundColor: '#FACC15', // Yellow
    paddingVertical: 12,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTextActualizar: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
