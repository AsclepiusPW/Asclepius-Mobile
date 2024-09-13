// Importações
import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas
import { HomePage } from "../../pages/Screen-HomePage";
import { ScreenListVaccine } from "../../pages/Screen-List-Vaccine";
import { ScreenEvent } from "../../pages/Screen-Event";
import { ScreenVaccinationRegisters } from "../../pages/Screen-Vaccination-Registers";
import { ScreenProfile } from "../../pages/Screen-Profile";

// Estilização
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Themes } from "../../../global/theme";

//Constante do tab
const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: `${Themes.colors.white}`, // Cor de fundo da barra de abas
                    borderTopWidth: 0, // Remove a borda superior
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    height: 80, // Altura da barra de abas
                },
                tabBarLabelStyle: {
                    display: "none", // Deixa invisível o nome das páginas
                },
                tabBarIcon: ({ focused, color, size }) => {
                    // Define a cor do ícone com base no estado de seleção
                    const iconColor = focused ? Themes.colors.greenAcqua : Themes.colors.disabled;
                    return (
                        <MaterialCommunityIcons
                            name={
                                route.name === 'Home' ? 'home' :
                                route.name === 'ListVaccines' ? 'eyedropper' :
                                route.name === 'ListEvents' ? 'calendar' :
                                route.name === 'VaccinationRegisters' ? 'medical-bag' :
                                'account'
                            }
                            color={iconColor}
                            size={30} // Ajuste o tamanho do icone
                        />
                    );
                },
                headerShown: false, // Oculta o cabeçalho
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={HomePage} 
            />
            
            <Tab.Screen 
                name="ListVaccines" 
                component={ScreenListVaccine}
            />

            <Tab.Screen 
                name="ListEvents" 
                component={ScreenEvent}
            />

            <Tab.Screen 
                name="VaccinationRegisters" 
                component={ScreenVaccinationRegisters}
            />

            <Tab.Screen 
                name="Profile" 
                component={ScreenProfile}
            />
        </Tab.Navigator>
    )
};
