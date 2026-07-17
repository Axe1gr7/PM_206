import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Platform, Alert, Keyboard, Switch , persable, Pressable } from 'react-native';


export default function parte2() {

const[observacion, setObservacion] = useState('');
  
const [adoptado, setAdoptado] = useState(false);

const procesarRegistro = () => {
    if (Platform.OS !== 'web') Keyboard.dismiss();
    if (!observacion) {
      alertasManager("validacion", "introduce una observacion");
      return;
    }

    alertasManager("exito", `robservacion creada: ${observacion}`);
  };

return (
    <View style={styles.container}>
    <StatusBar style={adoptado ? "light" : "dark"}  />

      {}
      <TextInput 
      style={styles.input}
      placeholder="escribe una observacion"
      value={observacion}
      onChangeText={setObservacion}
      />


    <Switch
        value={adoptado}
        onValueChange={() => setAdoptado(!adoptado)}
        trackColor={{ false: "#efe700", true: "#8c00ff" }}
        thumbColor={"#ef0000"}
      />

    <Pressable
        style={styles.button}
        onPress={() => {
          console.log("presiono el boton");
          procesarRegistro();
        }}
      >
        <Text style={styles.buttonText} > registro</Text>
      </Pressable>


    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, justifyContent:
    'center', padding: 20, 
    backgroundColor: '#f5f6fa',
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    padding: 20},
  input: { 
    borderWidth: 1, 
    borderColor: '#dcdde1',
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12, 
    backgroundColor: '#fff' },

    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 10,
        marginBottom: 50 
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textAlign: "center"
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%", 
        paddingHorizontal: 10
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
});