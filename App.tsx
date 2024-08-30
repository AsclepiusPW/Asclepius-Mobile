//Importações
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import { HomePage } from './src/pages/Screen-HomePage';

//Componentes
import { Themes } from './global/theme';

//Importação de fonts
import useCustomFonts from "./global/useFonts";

export default function App() {
  //Carregando as fontes
  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:`${Themes.colors.bacgroundScreens}`}}>
      <ThemeProvider theme={Themes}>
        <StatusBar
          backgroundColor="transparent"
          translucent
        />
        <HomePage/>
      </ThemeProvider>
    </SafeAreaView>
  );
}