//Importações
import { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

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

export const ScreenVaccinationRequest = () => {
    const [visibleEvents, setVisibleEvents] = useState<"approved" | "denied">("approved");
    const [vaccinationRequest, setVaccinationRequest] = useState<VaccinationRequest[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noRecords, setNoRecords] = useState<boolean>(false);

    useEffect(() => {
        // Inicializar com eventos aprovados
        setVaccinationRequest(
            arrayVaccinationRequest.filter((data) => data.responseEvent === "approved")
        );
    }, []);

    // Função de busca de solicitações de vacinação
    const searchVaccinationRequest = (event: string) => {
        setSearchQuery(event.toLowerCase());
    };

    //Função para o estado da visualização das informações    
    const handleVisibleEvents = (eventType: "approved" | "denied") => {
        setIsLoading(true);
        setVisibleEvents(eventType);

        setTimeout(() => {
            const filteredRequests = arrayVaccinationRequest.filter((data) =>
                eventType === "approved"
                    ? data.responseEvent === "approved"
                    : data.responseEvent === "denied" || data.responseEvent === "noResponse"
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
                    register.nameEvent?.toLowerCase().includes(searchQuery)
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
                        <TouchableOpacity onPress={() => handleVisibleEvents("approved")}>
                            <Text style={visibleEvents === "approved" ? styles.touchableApproved : styles.touchableDisabled}>Aprovadas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleVisibleEvents("denied")}>
                            <Text style={visibleEvents === "denied" ? styles.touchableDanied : styles.touchableDisabled}>Negadas</Text>
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
                                    dateRequest={content.dateRequest}
                                    nameEvent={content.nameEvent}
                                    dateEvent={content.dateEvent}
                                    vacanciesEvent={content.vacanciesEvent}
                                    statusEvent={content.statusEvent}
                                    vaccineEvent={content.vaccineEvent}
                                    latitude={content.latitude}
                                    longitude={content.longitude}
                                    responseEvent={content.responseEvent}
                                />
                            ))
                        )}
                    </VaccinationRequestList>
                )}

            </ContainerVaccinationRequest>
        </ScrollView>
    )
}