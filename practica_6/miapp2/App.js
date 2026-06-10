/* Zona 1 importacion de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {Saludo} from './components/Saludo';
import { Salu2 } from './components/salu2';
import { Axel } from './components/Axelgr';
/* Zona 2 main - hogar de los componentes  */
export default function App() {
  return (
    /*
    <View style={styles.container}>
      <Text>-------------imagen------------------</Text>
      <Image source={require('./assets/wave.png')}/>
      <Text>---------componente simple---------------</Text>
      <Text>HOLA MUNDO</Text> 
      <Text>------componentes propios ---------</Text>
      <Text>-----1 componente propio ---------</Text>
      <Saludo></Saludo>
      <Text>-----varios componentes propios -------</Text>
      <Salu2></Salu2>
      <Text>--- fin ---</Text>
      
      <StatusBar style="auto" />
    </View>
    */
   <View style={styles.container}>
    <Axel></Axel>
   </View>
  );
}

/* Zona estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
