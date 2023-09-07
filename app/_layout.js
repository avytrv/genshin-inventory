import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function AppLayout() {
  return (
    <PaperProvider>
        <Slot />
    </PaperProvider>
  );
}
