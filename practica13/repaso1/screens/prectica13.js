import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Pressable, Platform, Alert, Keyboard, ScrollView } from 'react-native';

export default function practica13Screen() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [taller, setTaller] = useState(true);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(true);

  const alertasManager = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const enviarRegistro = () => {
    if (Platform.OS !== 'web') Keyboard.dismiss();

    if (!nombre || !carrera || !semestre) {
      alertasManager("Campos incompletos", "Debes llenar todos los campos.");
      return;
    }

    if (isNaN(semestre)) {
      alertasManager("Error", "El semestre debe ser un número.");
      return;
    }

    const resumen =
      `Nombre: ${nombre}\n` +
      `Carrera: ${carrera}\n` +
      `Semestre: ${semestre}\n\n` +
      `Taller: ${taller ? 'Sí' : 'No'}\n` +
      `Constancia: ${constancia ? 'Sí' : 'No'}\n` +
      `Deportes: ${deportes ? 'Sí' : 'No'}`;

    alertasManager("Registro enviado", resumen);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scroll}>
      <View style={styles.container}>

        <Text style={styles.titulo}>Registro de Evento Universitario</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Carrera"
          value={carrera}
          onChangeText={setCarrera}
        />

        <TextInput
          style={styles.input}
          placeholder="Semestre"
          value={semestre}
          onChangeText={setSemestre}
          keyboardType="numeric"
          maxLength={2}
        />

        <Text style={styles.subtitulo}>Opciones</Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>¿Asistirá al taller?</Text>
          <Switch
            value={taller}
            onValueChange={setTaller}
            trackColor={{ false: '#ccc', true: '#8034c7' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>¿Requiere constancia?</Text>
          <Switch
            value={constancia}
            onValueChange={setConstancia}
            trackColor={{ false: '#ccc', true: '#8034c7' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>¿Participará en deportes?</Text>
          <Switch
            value={deportes}
            onValueChange={setDeportes}
            trackColor={{ false: '#ccc', true: '#8034c7' }}
            thumbColor="#fff"
          />
        </View>

        <Pressable style={styles.boton} onPress={enviarRegistro}>
          <Text style={styles.botonTexto}>Enviar Registro</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#1a1a1a',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  boton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});