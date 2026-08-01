import React, { useState } from 'react';
import {View,Text,TextInput,Pressable,StyleSheet,Alert,Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '../utils/api';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [carga, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };


  const guardarUsuario = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Vacíos', 'Por favor, complete todos los campos.');
      return;
    }


    try {
      setCargando(true);
      const respuesta = await fetch(`${API_URL}/v1/usuarios/`, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre:nombre , edad:Number(edad)}),
      });
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Usuario agregado:', datos);
        mostrarMensaje('Éxito', 'Usuario agregado correctamente.');
        setNombre('');
        setEdad('');
      } else {
        console.log('Error al agregar usuario:', respuesta.status);
        mostrarMensaje('Error', 'No se pudo agregar el usuario. Intente nuevamente.');
      }
    } 
    catch (error) {
      console.log('Error al agregar usuario:', error);
      mostrarMensaje('Error', 'Ocurrió un error al agregar el usuario.');
    } 
    finally {
      setCargando(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.titulo}>
          Registro de Usuarios
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable style={styles.boton} onPress={guardarUsuario} disabled={carga}>
          <Text style={styles.textoBoton}>
            {carga ? "Agregando..." : "Agregar Usuario"}
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1F2937',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },

  boton: {
    backgroundColor: '#29bb0c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

});