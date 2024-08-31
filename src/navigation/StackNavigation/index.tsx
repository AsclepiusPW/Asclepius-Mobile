//Importações
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Telas
import { InitialScreen } from "../../pages/Screen-Initial";
import { ScreenLogin } from '../../pages/Screen-Login';
import { ScreenSignUp } from '../../pages/Screen-SignUp';
import { ScreenDetailsEvent } from '../../pages/Screen-Details-Event';
import { ScreenDetailsVaccine } from '../../pages/Screen-Details-Vaccine';
import { ScreenEditProfile } from '../../pages/Screen-Edit-Profile';
import { ScreenVaccinationRequest } from '../../pages/Screen-Vaccination-Requests';

//Navegação por abas
import { TabNavigation } from '../TabNavigation';

//Contexto
import { useAuth } from '../../context/AuthContext';

//Configuração
const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
    const { isAuthenticated } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 18,
                    }
                }}
            >
                {isAuthenticated === false ? ( //Verifica se o usuário está autenticado
                    //Se não estiver autenticado
                    <>
                        <Stack.Screen
                            name="Initial"
                            component={InitialScreen}
                            options={{ headerShown: false }} //Retirando o cabeçalho
                        />
                        <Stack.Screen name="Login" component={ScreenLogin} options={{ title: "Acessar conta" }} />
                        <Stack.Screen name="SignUp" component={ScreenSignUp} options={{ title: "Criar conta" }} />
                    </>
                ) : (
                    //Se estiver autenticado
                    <>
                        <Stack.Screen
                            name="TabNaviagtion"
                            component={TabNavigation}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="DetailsEvent" component={ScreenDetailsEvent} options={{ title: "Detalhes do evento" }} />
                        <Stack.Screen name="DetailsVaccine" component={ScreenDetailsVaccine} options={{ title: "Detalhes da vacina" }} />
                        <Stack.Screen name="EditProfile" component={ScreenEditProfile} options={{ title: "Edição de Perfil" }} />
                        <Stack.Screen name="VaccinationRequest" component={ScreenVaccinationRequest} options={{ title: "Solicitações" }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}