//Importações
import { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { RequestVaccination } from "../../components/Request-Vaccination";
import { NoRecordView } from "../../components/No-Record-View";

//Testes
import { VaccinationRequest } from "../../../utils/types/typeVaccinationRequest";

//Estilização
import { ContainerVaccinationRequest, VaccinationRequestHeader, VaccinationRequestButtonState, styles, VaccinationRequestList } from "./style";
import { Themes } from "../../../global/theme";

//Types
type eventType = "Reservation approved" | "Reservation denied" | "Reservation requested";

//Contexto
import { useUser } from "../../context/UserContext";

export const ScreenVaccinationRequest = () => {
    const { userData, loadDataUser } = useUser();

    const [visibleEvents, setVisibleEvents] = useState<eventType>("Reservation approved");
    const [vaccinationRequest, setVaccinationRequest] = useState<VaccinationRequest[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noRecords, setNoRecords] = useState<boolean>(false);

    useEffect(() => {
        //Pegando os dados do usuário
        const fetchData = async () => {
            setIsLoading(true);
            await loadDataUser();
            setIsLoading(false);
        };
        if (!userData) {
            fetchData();
        } else {
            // Inicializar com eventos aprovados
            setVaccinationRequest(
                userData.requestReservation?.filter((data) => data.status === "Reservation approved") || []
            );
        }
    }, [userData, loadDataUser]);

    // Função de busca de solicitações de vacinação
    const searchVaccinationRequest = (event: string) => {
        setSearchQuery(event.toLowerCase());
    };

    //Função para o estado da visualização das informações    
    const handleVisibleEvents = (event: eventType) => {
        setIsLoading(true);
        setVisibleEvents(event);

        setTimeout(() => {
            const filteredRequests = userData?.requestReservation?.filter((data) => {
                if (event === "Reservation approved") {
                    return data.status === "Reservation approved";
                } else {
                    // Exibe os registros com status diferente de "Reservation approved"
                    return data.status !== "Reservation approved";
                }
            }) || [];

            setVaccinationRequest(filteredRequests);
            setNoRecords(filteredRequests.length === 0);
            setIsLoading(false);
        }, 1000); // Simula um tempo de carregamento
    };

    // Atualizar o estado de vaccinationRequest quando searchQuery mudar
    useEffect(() => {
        setIsLoading(true);
        setNoRecords(false);

        setTimeout(() => {
            if (searchQuery === '') {
                handleVisibleEvents(visibleEvents); // Reaplica o filtro atual
            } else {
                const searchRegister = userData?.requestReservation?.filter((register) =>
                    register.calendar.local?.toLowerCase().includes(searchQuery)
                ) || [];
                setVaccinationRequest(searchRegister);
                setNoRecords(searchRegister.length === 0);
            }
            setIsLoading(false);
        }, 1000); // Simula um tempo de carregamento
    }, [searchQuery, visibleEvents, userData]);

    return (
        <ScrollView>
            <ContainerVaccinationRequest>
                <VaccinationRequestHeader>
                    <HeaderApresentation
                        title="Solicitações de Vacinação"
                        search={true}
                        placeholder="Pesquisar solicitação"
                        changeSubmit={searchVaccinationRequest}
                    />

                    <VaccinationRequestButtonState style={searchQuery === '' ? { display: 'flex' } : { display: 'none' }}>
                        <TouchableOpacity onPress={() => handleVisibleEvents("Reservation approved")}>
                            <Text style={visibleEvents === "Reservation approved" ? styles.touchableApproved : styles.touchableDisabled}>Aprovadas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleVisibleEvents("Reservation denied")}>
                            <Text style={visibleEvents === "Reservation denied" ? styles.touchableDanied : styles.touchableDisabled}>Negadas</Text>
                        </TouchableOpacity>
                    </VaccinationRequestButtonState>
                </VaccinationRequestHeader>

                {isLoading ? (
                    <ActivityIndicator size="large" color={`${Themes.colors.greenDark}`} />
                ) : (
                    <VaccinationRequestList>
                        {noRecords ? (
                            <NoRecordView title="Nenhum registro encontrado" />
                        ) : (
                            vaccinationRequest?.map((content, index) => (
                                <RequestVaccination
                                    key={index}
                                    dateRequest={content.date}
                                    nameEvent={content.calendar.local}
                                    dateEvent={content.calendar.date}
                                    vacanciesEvent={content.calendar.places}
                                    statusEvent={content.calendar.status}
                                    vaccineEvent={content.calendar.vaccine.name}
                                    latitude={content.calendar?.latitude}
                                    longitude={content.calendar?.longitude}
                                    responseEvent={content.status}
                                />
                            ))
                        )}
                    </VaccinationRequestList>
                )}

            </ContainerVaccinationRequest>
        </ScrollView>
    )
}