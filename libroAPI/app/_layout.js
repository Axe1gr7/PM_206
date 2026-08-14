import { Stack } from 'expo-router';

export default function RootLayout() {
  return (

    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
      
      <Stack.Screen 
        name="" 
        options={{ 
          title: 'Detalle del Registro' 
        }} 
      />
      <Stack.Screen 
        name="" 
        options={{ 
          title: 'Actualizar Registro' 
        }} 
      />
    </Stack>
  );
}