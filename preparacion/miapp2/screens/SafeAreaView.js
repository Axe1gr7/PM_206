/*zona1: importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image} from 'react-native';
import { Perfil2 } from '../components/perfil2';


/*zona2: main - hogar de los componetes */
export default function SafeAreaScreen() {
  return (

    <SafeAreaView style={styles.container}>

      <ScrollView>
        <Text>Aquí va la practica de Ivet o Gaby gaby</Text>

        <Perfil2 style={styles.targetaRoja} nombre="Edith Uribe" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
        <Perfil2 style={styles.targetaVerde} nombre="Axel GR" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
        <Perfil2 style={styles.targetaRoja} nombre="Edith Uribe" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
        <Perfil2 style={styles.targetaVerde} nombre="Axel GR" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>

        <ScrollView horizontal={true}>

          <Perfil2 style={styles.targetaRoja} nombre="Edith Uribe" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
          <Perfil2 style={styles.targetaVerde} nombre="Axel GR" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
          <Perfil2 style={styles.targetaRoja} nombre="Edith Uribe" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
          <Perfil2 style={styles.targetaVerde} nombre="Axel GR" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
          <Perfil2 style={styles.targetaRoja} nombre="Edith Uribe" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
          <Perfil2 style={styles.targetaVerde} nombre="Axel GR" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
        </ScrollView>

        <Text style={styles.tituloCarrusel}>carrusel de imagenes </Text>
        <ScrollView horizontal={true} style={styles.carruselContenedor}>
          <Image source={require('../assets/foto1.jpg')} style={styles.carruselImagenes}/>
          <Image source={require('../assets/foto2.jpg')} style={styles.carruselImagenes}/>
          <Image source={require('../assets/foto3.jpg')} style={styles.carruselImagenes}/>
        </ScrollView>

        <Perfil2 style={styles.targetaRoja} nombre="Edith Uribe" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
        <Perfil2 style={styles.targetaVerde} nombre="Axel GR" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
        <Perfil2 style={styles.targetaRoja} nombre="Edith Uribe" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>
        <Perfil2 style={styles.targetaVerde} nombre="Axel GR" carrera="Sitemas" materia="programacion movil" cuatri="noveno"></Perfil2>

      <StatusBar style='auto'/>

      </ScrollView>  

    </SafeAreaView>
  );
}

/*zona3: estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width:450,
    margin: 50,
  },
  targetaRoja:{backgroundColor:'#FF6B6B'},
  targetaVerde:{backgroundColor:'#6BCB77'},


  tituloCarrusel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },



  carruselImagenes: {
    width: 250,             
    height: 150,           
    borderRadius: 10,        
    marginHorizontal: 10,    
  },
  
  carruselContenedor:{
    paddingVerical: 10,
  }
});

