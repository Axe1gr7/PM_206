import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';


export default function DetalleScreen() {

  const { id } = useLocalSearchParams(); 
  const [libro, setLibro] = useState(null);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID Libro: <Text style={styles.value}>{id}</Text></Text>
      <Text style={styles.label}>Título: <Text style={styles.value}>{libro?.titulo || 'Cargando...'}</Text></Text>
      <Text style={styles.label}>Autor: <Text style={styles.value}>{libro?.autor}</Text></Text>
      <Text style={styles.label}>Páginas: <Text style={styles.value}>{libro?.paginas}</Text></Text>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.btnEdit]} onPress={}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnDelete]} onPress={}>
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  value: { fontWeight: 'normal', color: '#555' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  btn: { flex: 0.48, padding: 15, borderRadius: 8, alignItems: 'center' },
  btnEdit: { backgroundColor: '#ffc107' },
  btnDelete: { backgroundColor: '#dc3545' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});