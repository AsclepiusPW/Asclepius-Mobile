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