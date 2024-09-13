//Importações
import styled from "styled-components/native";
import { Themes } from "../../../global/theme";

export const ComponentCalendar = styled.View`
    width: 95%;
    height: auto;
    background-color: ${Themes.colors.greenSpring};
    border-radius: 20px;
    display: flex;
    align-items: center;
`;

export const ListTitle = styled.View`
    width: 90%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-family: ${Themes.fonts.bold};
    font-size: 17px;
    color: ${Themes.colors.greenAcqua};
`;

export const ButtonPress = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-family: ${Themes.fonts.extraBold};
`;

export const ContentCalendar = styled.View`
    width: 95%;
    height: auto;
    display: flex;
    align-items: center;
`;

export const FooterContent = styled.View`
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;