//Importações
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';

//Componentes
import { Themes } from './global/theme';

//Telas

//Importação de fonts
import useCustomFonts from "./global/useFonts";

export default function App() {
  //Carregando as fontes
  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <ThemeProvider theme={Themes}>
        <StatusBar
          backgroundColor="transparent"
          translucent
        />
      </ThemeProvider>
    </SafeAreaView>
  );
}