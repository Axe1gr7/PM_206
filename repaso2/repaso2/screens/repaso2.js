import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Pressable,
  TextInput,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

const splashImage = require('../assets/jr.webp');
const backgroundImage = { uri: 'https://picsum.photos/500/900' };

export default function repaso2() {
  const [loadingSplash, setLoadingSplash] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function prepararAplicacion() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        if (mounted) setLoadingSplash(false);
      }
    }

    prepararAplicacion();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loadingSplash) {
      SplashScreen.hideAsync();
    }
  }, [loadingSplash]);

  // App
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const inputsDisabled = guardando;

  const puedeAgregar = useMemo(() => {
    return titulo.trim().length > 0 && autor.trim().length > 0 && genero.trim().length > 0;
  }, [titulo, autor, genero]);

  const resetInputs = () => {
    setTitulo('');
    setAutor('');
    setGenero('');
  };

  const agregarLibro = async () => {
    if (!puedeAgregar) {
      Alert.alert('!!eyyy¡¡', 'Todos los campos son obligatorios.');
      return;
    }

    setGuardando(true);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    const nuevoLibro = {
      id: String(Date.now()),
      titulo: titulo.trim(),
      autor: autor.trim(),
      genero: genero.trim(),
    };

    setLibros((prev) => [nuevoLibro, ...prev]);
    resetInputs();
    setGuardando(false);

    Alert.alert('bien :))', 'Libro agregado correctamente.');
  };

  if (loadingSplash) {
    return (
      <View style={styles.splash}>
        <ImageBackground source={splashImage} style={styles.splashImage} resizeMode="cover" />
        <ActivityIndicator size="large" color="#6d00a8" style={{ marginTop: 20 }} />
        <Text style={styles.splashText}>Cargando aplicación...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Registra tus Libros Leídos</Text>
        <Text style={styles.subtitle}>Favoritos y lista de tus libros</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Título del libro</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: habitos atomicos"
            value={titulo}
            onChangeText={setTitulo}
            editable={!inputsDisabled}
          />

          <Text style={styles.label}>Autor</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: james clear"
            value={autor}
            onChangeText={setAutor}
            editable={!inputsDisabled}
          />

          <Text style={styles.label}>Género</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: autoayuda"
            value={genero}
            onChangeText={setGenero}
            editable={!inputsDisabled}
          />

          <Pressable
            onPress={agregarLibro}
            style={({ pressed }) => [styles.button, pressed ? { opacity: 0.8 } : null]}
            disabled={inputsDisabled}
          >
            <Text style={styles.buttonText}>Agregar libro</Text>
          </Pressable>

          {guardando ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Guardando...</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.listWrap}>
          <Text style={styles.listTitle}>Tus libros</Text>
          <FlatList
            data={libros}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Aun no has agregado libros :b.</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardText}>Autor: {item.autor}</Text>
                <Text style={styles.cardText}>Género: {item.genero}</Text>
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 80,
  },
  splashImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  splashText: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 18,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#e6e6e6',
    textAlign: 'center',
    marginBottom: 18,
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 14,
    padding: 14,
  },
  label: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 6,
    color: '#000',
  },
  button: {
    marginTop: 14,
    backgroundColor: '#6d00a8',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  loadingWrap: {
    marginTop: 12,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#fff',
    fontWeight: '700',
  },
  listWrap: {
    flex: 1,
    marginTop: 18,
  },
  listTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  emptyText: {
    color: '#e6e6e6',
    fontSize: 14,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  cardText: {
    color: '#e6e6e6',
    fontSize: 13,
    marginBottom: 2,
  },
});
