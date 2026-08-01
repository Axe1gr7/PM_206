import { useLocalSearchParams } from 'expo-router';
import ActualizarUsuarioScreen from '../../../screens/ActualizarUsuarioScreen';

export default function ActualizarUsuarioRoute() {
  const params = useLocalSearchParams();
  return <ActualizarUsuarioScreen usuario={params} />;
}
