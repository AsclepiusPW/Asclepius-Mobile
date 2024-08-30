//Importações
import React, {useState} from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert, FlatList, Dimensions } from "react-native";

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { NewsList } from "../../components/NewsList-Component";
import { HomeCalendarComponent } from "../../components/Home-Calendar-Component"
import { VaccinationRequest } from "../../components/Vaccination-Request";

//Estilização
import { ContainerHomePage } from "./style";


export const HomePage = () => {

    return (
        <ScrollView>
            <ContainerHomePage>
                <HeaderApresentation homePresentation={true} />

                <NewsList/>

                <HomeCalendarComponent/>

                <VaccinationRequest/>

            </ContainerHomePage>
        </ScrollView>
    )
}