import { Text,View } from "react-native";

export const Perfil= (props) =>{
    return(
        <View>
            
            <Text>{props.nombre}</Text>
            <Text>{props.especie}</Text>
            <Text>{props.edad}</Text>
        </View>
    )
} 