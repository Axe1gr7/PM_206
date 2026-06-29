/*zona1: importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import Practica13 from './screens/prectica13';


/*zona2: main - hogar de los componetes */
export default function App() {
  return (
    <View style={styles.container}>
      <Practica13/>
      
    <StatusBar style='auto'/>

    </View>
  );
}

/*zona3: estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7215d6',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
  },

});