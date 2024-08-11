//Importações
import styled from "styled-components/native";
import { Themes } from "../../../global/theme";

export const ContainerInitialScreen = styled.View`
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${Themes.colors.bacgroundScreens};
`;

export const Content = styled.View`
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 10px;
`

export const InitialTitle = styled.Text`
    font-size: 28px;
    font-weight: ${Themes.fonts.bold};
`

export const InitialText = styled.Text`
    text-align: center;
    width: 80%;
    padding-left: 5px;
    padding-right: 5px;
`