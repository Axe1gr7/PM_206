import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';

export const tarjetaMascota=(props) => {
    return (

    <View>
            
            <Text>{props.nombre}</Text>
            <Text>{props.especie}</Text>
            <Text>{props.edad}</Text>
        </View>





    )
}