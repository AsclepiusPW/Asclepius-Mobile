//Importações
import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert, FlatList, Dimensions, RefreshControl } from "react-native";

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { NewsList } from "../../components/NewsList-Component";
import { HomeCalendarComponent } from "../../components/Home-Calendar-Component"
import { VaccinationRequestComponent } from "../../components/Vaccination-Request";

//Estilização
import { ContainerHomePage } from "./style";
import { Themes } from "../../../global/theme";

//Context
import { useUser } from "../../context/UserContext";

export const HomePage = () => {
    const { userData, loadDataUser } = useUser();

    const [refreshing, setRefreshing] = useState<boolean>(false); //Função de refresh

    // Função de recarregamento (pull-to-refresh)
    const onRefresh = async () => {
        setRefreshing(true); // Ativa o indicador de refresh
        await loadDataUser(); // Recarrega os dados do usuário
        setRefreshing(false); // Desativa o indicador de refresh após o carregamento
    };

    return (
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[`${Themes.colors.greenDark}`]} 
            />
          }>
            <ContainerHomePage>
                <HeaderApresentation homePresentation={true} />

                <NewsList />

                <HomeCalendarComponent />

                <VaccinationRequestComponent requestVaccination={userData?.requestReservation} />

            </ContainerHomePage>
        </ScrollView>
    )
}