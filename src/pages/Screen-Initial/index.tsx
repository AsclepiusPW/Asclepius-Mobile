
// Imports
import React from "react";
import { Image, View } from "react-native"
import { ContainerInitialScreen, InitialTitle, Content, InitialText } from "./style"
import AsclepiusLogo from "../../../images/logo-color-cropped.png"

// Components
import { TouchButton } from "../../components/Touch-Button";

export const InitialScreen = () => {
    return (
        <ContainerInitialScreen>
            <Content>
                
                <View style={{width: "100%", alignItems: "center"}}>
                    <Image source={AsclepiusLogo} style={{ width: "80%", resizeMode: "contain" }} />
                    <InitialTitle>Vamos começar!</InitialTitle>
                    <InitialText>Acesse seu perfil. Se você não tem uma conta, crie uma agora.</InitialText>
                </View>
                <View style={{width: "100%", alignItems: "center", gap: 15}}>
                    <TouchButton styleType="buttonLargerSolid" text={"Log In"} />
                    <TouchButton styleType="buttonLargerOpacity" text={"Sign Up"} />
                </View>
            </Content>
        </ContainerInitialScreen>
    )
}