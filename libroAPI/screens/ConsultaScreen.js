import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

export default function ConsultaScreen() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerLibros = async () => {
  };

  const renderLibro = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => { }}
    >
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.subtitle}>Autor: {item.autor} | Páginas: {item.paginas}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biblioteca / Catálogo de Libros</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={libros}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderLibro}
          ListEmptyComponent={<Text style={styles.empty}>No hay libros registrados</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' }
});