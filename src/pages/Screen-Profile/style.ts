//Importações
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const ContainerProfile = styled.View`
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: ${Themes.colors.bacgroundScreens};
`;

export const ContainerMap = styled.View`
    width: 95%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${Themes.colors.white};
    border-radius: 20px;
    padding-bottom: 25px;
`;

export const ViewTitle = styled.View`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
`;

export const ViewMap = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98%;
    height: auto;
`;

export const styles = StyleSheet.create({
    detailsTitle: {
        fontFamily: `${Themes.fonts.bold}`,
        fontSize: 16,
    },
})