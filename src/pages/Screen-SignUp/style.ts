import styled from "styled-components/native";
import { Themes } from "../../../global/theme";

export const ContainerLogin = styled.View`
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

export const LoginForm = styled.View`
    width: 100%;
    height: auto;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

export const LoginButtonSubmit = styled.View`
    margin-top: 50px;
`;

export const SignUpText = styled.Text`
    font-size: 14px;
    font-weight: ${Themes.fonts.regular};;
`