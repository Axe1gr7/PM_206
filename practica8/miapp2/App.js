import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Perfil } from './components/perfil_desestructuracion';
import { Perfil2 } from './components/perfil2';

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
        style={styles.tarjetaRoja}
        nombre="axel" 
        carrera="sistemas" 
        materia="pm" 
        cuatri="9no" 
        grupo="206"
    />
    
    <Perfil
        style={styles.tarjetaVerde}
        nombre="chola" 
        carrera="sistemas" 
        materia="pm" 
        cuatri="9no" 
        grupo="207"
    />

        <Perfil2
        style={styles.tarjetaAul}
        nombre="cholo" 
        carrera="sistemas" 
        materia="pm" 
        cuatri="9no" 
        grupo="207"
    />
    <StatusBar style="auto" />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection:"row"
  },
  tarjetaRoja:{
    backgroundColor:'rgba(193, 0, 0, 0.73)'
  },
  tarjetaVerde:{
    backgroundColor:'rgba(0, 193, 0, 0.73)'
  },
  tarjetaAul:{
    backgroundColor:'rgba(63, 154, 215, 0.73)'
  }
});