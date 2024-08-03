//Importações
import styled from "styled-components/native";
import { Themes } from "../../../global/theme";

export const ContainerEditProfile = styled.View`
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${Themes.colors.bacgroundScreens};
`;

export const EditProfileHeader = styled.View`
    width: 100%;
    height: auto;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const EditProfileForm = styled.View`
    width: 100%;
    height: auto;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

export const ContainerButtonSubmmit = styled.View`
    margin-top: 50px;
`;