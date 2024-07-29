//Importações
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

//Componentes
import { Themes } from './global/theme';

//Test de styled-component
import styled from 'styled-components/native';

//Importação de fonts
import useCustomFonts from "./global/useFonts";

export default function App() {
  //Carregando as fontes
  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={Themes}>
      <ContainerTest>
      <TextTest>Bem vindo ao Asclepius</TextTest>
      <StatusBar style="auto" />
    </ContainerTest>
    </ThemeProvider>
  );
}

//Depois apagar essas estilizações
const ContainerTest = styled.View`
  background-color: ${Themes.colors.greenAcqua};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextTest = styled.Text`
  color: ${Themes.colors.white};
  font-family: ${Themes.fonts.medium};
`;