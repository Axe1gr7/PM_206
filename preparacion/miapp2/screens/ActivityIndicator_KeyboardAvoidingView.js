import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  KeyboardAvoidingView, 
  ActivityIndicator, 
  Platform, 
  Alert 
} from 'react-native';

export default function ActivityIndicatorScreen() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardar = () => {
    if (!nombre.trim() || !carrera.trim()) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    setIsLoading(true);


    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(`Perfil de ${nombre} guardado con exito`);

      setNombre('');
      setCarrera('');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.formContainer}
      >
        <View style={styles.formContainerInner}>
          <View style={styles.formBody}>
            <Text style={styles.titulo}>Agregar Perfil</Text>
            
            <TextInput 
              style={styles.input} 
              placeholder="Nombre completo" 
              value={nombre}
              onChangeText={setNombre}
              editable={!isLoading} 
            />

            <TextInput 
              style={styles.input} 
              placeholder="Carrera" 
              value={carrera}
              onChangeText={setCarrera}
              editable={!isLoading} 
            />
          </View>

          <View style={styles.actionArea}>
            {isLoading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#6d00a8" style={styles.loader} />
                <Text style={styles.loaderText}>Procesando...</Text>
              </View>
            ) : (
              <Button 
                title="Guardar Perfil" 
                onPress={handleGuardar} 
                color="#6d00a8" 
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    flex: 1, 
  },
  formContainerInner: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', 
  },
  formBody: {
    flex: 1, 
    justifyContent: 'center', 
  },
  actionArea: {
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50, 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginVertical: 10,
  },
  loaderText: {
    color: '#6d00a8',
    fontSize: 14,
    fontWeight: '500',
  }
});