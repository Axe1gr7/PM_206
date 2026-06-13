import { Text,View,Button } from "react-native";
import React,{useState} from 'react'

export const Perfil2= ({nombre,carrera,materia,cuatri,grupo}) =>{

    const [mostrar, setmostrar] = useState(false);

    return(
        <View>
            
            <Text>{nombre}</Text>
            <Text>{carrera}</Text>
            {mostrar && 
            <>
            <Text>{materia}</Text>
            <Text>{cuatri}</Text>
            <Text>{grupo}</Text>
            </>
            }
            <Button 
            title="mostrar perfil"
            onPress={()=> setmostrar(!mostrar)}
            />
        </View>
    )
} 