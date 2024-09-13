//Importações
import styled from "styled-components/native";
import { Themes } from "../../../global/theme";

export const ContainerVaccinationRegister = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${Themes.colors.bacgroundScreens};
`;

export const VaccinationRegisterHeader = styled.View`
    width: 100%;
    height: auto;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const VaccinationRegisterList = styled.View`
    flex: 1;
    width: 100%;
    height: auto;
    min-height: 80%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;