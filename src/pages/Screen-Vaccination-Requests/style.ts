//Importações
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

//Método para os buttons
export const styles = StyleSheet.create({
    touchableApproved: {
        color: `${Themes.colors.greenAcqua}`,
        fontFamily: `${Themes.fonts.bold}`,
        borderBottomWidth: 3,
        borderBottomColor: `${Themes.colors.greenAcqua}`
    },

    touchableDanied: {
        color: `${Themes.colors.redHot}`,
        fontFamily: `${Themes.fonts.bold}`,
        borderBottomWidth: 3,
        borderBottomColor: `${Themes.colors.redHot}`
    },

    touchableDisabled: {
        color: `${Themes.colors.disabled}`,
        fontFamily: `${Themes.fonts.bold}`,
        borderBottomColor: `${Themes.colors.disabled}`
    },

    messageEvent: {
        position: 'absolute',
        width: "65%",
        height: 50,
        right: 0,
        top: 10,
        backgroundColor: Themes.colors.greenSpringTiny,
        borderTopLeftRadius: 20, 
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Certifica-se de que está sobre os outros elementos
    },
    messageText: {
        color: Themes.colors.black,
        fontSize: 16,
    },

});

//Componentes
export const ContainerVaccinationRequest = styled.View`
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${Themes.colors.bacgroundScreens};
`;

export const VaccinationRequestHeader = styled.View`
    width: 100%;
    height: auto;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const VaccinationRequestButtonState = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const VaccinationRequestList = styled.View`
    width: 100%;
    height: auto;
    min-height: 80%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;