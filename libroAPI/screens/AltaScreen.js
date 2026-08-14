import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { router } from 'expo-router';


export default function AltaScreen() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [paginas, setPaginas] = useState('');

    const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const GuardarLibro = async () => {
    if(titulo.trim() === ''|| autor.trim()===''||paginas.trim()==='')
    {
      mostrarMensaje('vacios','porfavor, llena todo carnal');
      return;
    }


    try {
          const response = await fetch('https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/libros',
          {
            method: 'POST',
            headers:{
              'content-type':'application/json',
            },
              body: JSON.stringify({
              titulo: titulo,
              autor: autor,
              paginas:Number(paginas),
            }),
          });
        if (response.ok){
          if (Platform.OS === 'web') {
              alert('Libro guardado');
            } else {
              Alert.alert('Éxito', 'Libro guardado');
            }
          setTitulo('');
          setAutor('');
          setPaginas('');
          } else {
            Alert.alert('mal','no se pudo guardar el libro brou');
          }
        }
        catch(error){
          console.error(error);
          Alert.alert('error','error con la api');
        }
    };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alta de Nuevo Libro</Text>

      <TextInput style={styles.input} placeholder="Título del libro" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor} />
      <TextInput style={styles.input} placeholder="Número de páginas" keyboardType="numeric" value={paginas} onChangeText={setPaginas} />

      <TouchableOpacity style={styles.btn} onPress={GuardarLibro}>
        <Text style={styles.btnText}>Guardar Libro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});