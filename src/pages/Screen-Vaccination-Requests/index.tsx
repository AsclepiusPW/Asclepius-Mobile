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
import { arrayVaccinationRequest } from "../../../utils/tests/arrayVaccinationResquest";

//Estilização
import { ContainerVaccinationRequest, VaccinationRequestHeader, VaccinationRequestButtonState, styles, VaccinationRequestList } from "./style";
import { Themes } from "../../../global/theme";

//Types
type eventType = "Reservation approved" | "Reservation denied" | "Reservation requested";

export const ScreenVaccinationRequest = () => {
    const [visibleEvents, setVisibleEvents] = useState<eventType>("Reservation approved");
    const [vaccinationRequest, setVaccinationRequest] = useState<VaccinationRequest[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noRecords, setNoRecords] = useState<boolean>(false);

    useEffect(() => {
        // Inicializar com eventos aprovados
        setVaccinationRequest(
            arrayVaccinationRequest.filter((data) => data.status === "Reservation approved")
        );
    }, []);

    // Função de busca de solicitações de vacinação
    const searchVaccinationRequest = (event: string) => {
        setSearchQuery(event.toLowerCase());
    };

    //Função para o estado da visualização das informações    
    const handleVisibleEvents = (event: eventType) => {
        setIsLoading(true);
        setVisibleEvents(event);

        setTimeout(() => {
            const filteredRequests = arrayVaccinationRequest.filter((data) =>
                event === "Reservation approved"
                    ? data.status === "Reservation approved"
                    : data.status === "Reservation denied" || data.status === "Reservation requested"
            );

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
                const searchRegister = arrayVaccinationRequest.filter((register) =>
                    register.calendar.local?.toLowerCase().includes(searchQuery)
                );
                setVaccinationRequest(searchRegister);
                setNoRecords(searchRegister.length === 0);
            }
            setIsLoading(false);
        }, 1000); // Simula um tempo de carregamento
    }, [searchQuery, visibleEvents]);

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

                    <VaccinationRequestButtonState style={searchQuery === '' ? {display: 'flex'} : {display: 'none'}}>
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
                            <NoRecordView title="Nenhum registro encontrado"/>
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