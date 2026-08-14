import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (

    <Tabs>
      <Tabs.Screen 
        name="" 
        options={{ href: null }} 
      />
      <Tabs.Screen 
        name="" 
        options={{ 
          title: 'Catálogo',
          headerTitle: 'Listado Principal'
        }} 
      />
      <Tabs.Screen 
        name="" 
        options={{ 
          title: 'Nuevo',
          headerTitle: 'Agregar Registro'
        }} 
      />
    </Tabs>
  );
}