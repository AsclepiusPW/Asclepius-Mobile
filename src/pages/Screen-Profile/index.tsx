//Importações
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity, RefreshControl } from "react-native";
import { getDistance } from 'geolib';

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation"
import { DetailsProfile } from "../../components/Details-Profile";
import { PresentMap } from "../../components/Present-Map";
import { VaccinationRequestComponent } from "../../components/Vaccination-Request";
import { UpdatingComponent } from "../../components/Updating-Component";

//Estilização
import { ContainerProfile, ContainerMap, ViewMap, ViewTitle, styles } from "./style"
import Icon from 'react-native-vector-icons/Feather';

//Contexto
import { useUser } from "../../context/UserContext";
import { userEvent } from "../../context/EventContext";
import { Event } from "../../../utils/types/typeEvent";
import { Themes } from "../../../global/theme";

export const ScreenProfile = () => {
    const { userData, loadDataUser } = useUser();
    const { eventData } = userEvent(); // Adicionando contexto de eventos

    const [loading, setLoading] = useState<boolean>(false);
    const [nearbyEvents, setNearbyEvents] = useState<Event[]>([]); //Eventos próximos do usuário

    const [refreshing, setRefreshing] = useState<boolean>(false); //Função de refresh

    //Pegando informações do usuário do banco de dados
    useEffect(() => {
        if (!userData) {
            setLoading(true);
            loadDataUser();
            setLoading(false)
        }
    }, [userData]);

    //Pegando as informações dos eventos
    useEffect(() => {
        if (userData && eventData && userData.latitude && userData.longitude) {
            const userLat = userData.latitude;
            const userLon = userData.longitude;

            const filteredEvents = eventData.filter(event => {
                const eventLat = parseFloat(event.latitude);
                const eventLon = parseFloat(event.longitude);
                const distance = getDistance(
                    { latitude: userLat, longitude: userLon },
                    { latitude: eventLat, longitude: eventLon }
                );
                return distance <= 10000; // 10 km
            });

            setNearbyEvents(filteredEvents);
        }
    }, [userData, eventData]);

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
            {
                loading ? (
                    <UpdatingComponent />
                ) : (
                    <ContainerProfile>

                        <HeaderApresentation
                            title={"Perfil"}
                        />

                        <DetailsProfile
                            userImage={userData && userData.image === "Image not registered" ? "" : userData?.image}
                            userEmail={userData ? userData.email : "User Not found"}
                            userName={userData ? userData.name : "User Not found"}
                            userPhone={userData ? userData.telefone : "User Not found"}
                        />

                        <ContainerMap>
                            <ViewTitle>
                                <Text style={styles.detailsTitle}>Sua localização</Text>

                                <TouchableOpacity>
                                    <Icon name="edit" size={20} color={`${Themes.colors.black}`} />
                                </TouchableOpacity>
                            </ViewTitle>
                            <ViewMap>
                                <PresentMap
                                    zoomEnable={true}
                                    scrollEnable={true}
                                    latitude={userData && userData.latitude !== undefined ? userData.latitude.toString() : ""}
                                    longitude={userData && userData.longitude !== undefined ? userData.longitude.toString() : ""}
                                    events={nearbyEvents}
                                />
                            </ViewMap>
                        </ContainerMap>

                        {
                            userData?.requestReservation && userData?.requestReservation?.length > 0 && (
                                <VaccinationRequestComponent requestVaccination={userData.requestReservation} />
                            )
                        }
                    </ContainerProfile>
                )}
        </ScrollView>
    )
}
