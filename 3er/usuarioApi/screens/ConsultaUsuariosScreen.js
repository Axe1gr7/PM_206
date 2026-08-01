import React,{useState, useCallback} from 'react';
import {View,Text,FlatList,StyleSheet,Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { API_URL } from '../utils/api';

export default function ConsultaUsuariosScreen() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);
  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/v1/usuarios/`);
      const datos = await respuesta.json();
      setUsuarios(datos);
      console.log('Respuesta API: ', datos);
      setUsuarios(datos.usuarios)

    } catch (error) {
      console.log('Error al obtener los usuarios:', error);
    }
  };

  // Refresca la lista cada vez que la pantalla obtiene foco
  // (por ejemplo, al volver de editar/eliminar un usuario)
  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>
      
      <View style={styles.actionContainer}>
        <Pressable onPress={() => router.push({ pathname: '/usuario/[id]', params: { id: item.id, nombre: item.nombre, edad: item.edad } })}>
           <Text style={styles.linkDetalles}>Ver detalles →</Text>
        </Pressable>
      </View>

    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.15)',
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  actionContainer: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  
  linkDetalles: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 14,
  },

});