// Imports
import React from "react";
import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Estilazação
import { ContainerInitialScreen, InitialTitle, Content, InitialText } from "./style";

//Imagens
import AsclepiusLogo from "../../../images/logo-color-cropped.png";

// Components
import { TouchButton } from "../../components/Touch-Button";

export const InitialScreen = () => {

    //Constante de navegação
    const navigation = useNavigation();

    return (
        <ContainerInitialScreen>
            <Content>
                
                <View style={{width: "100%", alignItems: "center"}}>
                    <Image source={AsclepiusLogo} style={{ width: "80%", resizeMode: "contain" }} />
                    <InitialTitle>Vamos começar!</InitialTitle>
                    <InitialText>Acesse seu perfil. Se você não tem uma conta, crie uma agora.</InitialText>
                </View>
                <View style={{width: "100%", alignItems: "center", gap: 15}}>
                    <TouchButton styleType="buttonLargerSolid" text={"Log In"} onPress={() => navigation.navigate('Login')}/>
                    <TouchButton styleType="buttonLargerOpacity" text={"Sign Up"} onPress={() => navigation.navigate('SignUp')}/>
                </View>
            </Content>
        </ContainerInitialScreen>
    )
}