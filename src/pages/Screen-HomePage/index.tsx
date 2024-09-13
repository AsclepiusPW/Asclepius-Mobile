//Importações
import React, {useState} from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert, FlatList, Dimensions } from "react-native";

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { NewsList } from "../../components/NewsList-Component";
import { HomeCalendarComponent } from "../../components/Home-Calendar-Component"
import { VaccinationRequestComponent } from "../../components/Vaccination-Request";

//Estilização
import { ContainerHomePage } from "./style";

//Context
import { useUser } from "../../context/UserContext";

export const HomePage = () => {
    const {userData} = useUser();

    return (
        <ScrollView>
            <ContainerHomePage>
                <HeaderApresentation homePresentation={true} />

                <NewsList/>

                <HomeCalendarComponent/>

                <VaccinationRequestComponent requestVaccination={userData?.requestReservation}/>

            </ContainerHomePage>
        </ScrollView>
    )
}