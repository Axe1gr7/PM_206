/* Zona 1 importacion de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {Saludo} from './components/Saludo';
import { Salu2 } from './components/salu2';
import { Perfil } from './components/Axelgr';
import { Perfil2 } from './components/perfil_desestructuracion';
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
    <Perfil 
        nombre="axel" 
        carrera="sistemas" 
        materia="pm" 
        cuatri="9no" 
        grupo="206"
    ></Perfil>
    <Text>-------------------</Text>
    <Perfil2
        nombre="edith" 
        carrera="sistemas" 
        materia="pm" 
        cuatri="9no" 
        grupo="207"
    >
    </Perfil2>
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
