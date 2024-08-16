//Importações
import { ScrollView, View, Text } from "react-native";
import React from "react";

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation"

//Estilização
import { ContainerProfile } from "./style"
import { DetailsProfile } from "../../components/Details-Profile";
import { PresentMap } from "../../components/Present-Map";
import { VaccinationRequest } from "../../components/Vaccination-Request";

export const ScreenProfile = () => {
    return (
        <ScrollView>
            <ContainerProfile>
                <HeaderApresentation
                    title={"Perfil"}
                    placeholder="Pesquisar perfil"
                />

                <DetailsProfile
                    userEmail="userAsclepius@gmail.com"
                    userName="User Test"
                    userPhone="(00) 0 0000-0000"
                />

                <PresentMap />

                <VaccinationRequest/>
            </ContainerProfile>
        </ScrollView>
    )
}
