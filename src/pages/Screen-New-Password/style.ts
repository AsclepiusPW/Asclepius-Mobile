import styled from "styled-components/native";
import { Themes } from "../../../global/theme";

export const ContainerForm = styled.View`
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${Themes.colors.bacgroundScreens};
    justify-content: center;
`;

export const NewPassordForm = styled.View`
    width: 100%;
    height: auto;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

export const ButtonSubmit = styled.View`
    margin-top: 50px;
`;

export const SignUpText = styled.Text`
    font-size: 14px;
    font-weight: ${Themes.fonts.regular};;
`

export const TouchSignUp = styled.Text`
    color: ${Themes.colors.greenAcqua};
`;