import { useLocalSearchParams } from 'expo-router';
import DetallesUsuarioScreen from '../../screens/DetallesUsuarioScreen';

export default function UsuarioRoute() {
  const params = useLocalSearchParams();
  return <DetallesUsuarioScreen usuario={params} />;
}
