//Imports
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View, RefreshControl } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

//Styles
import styles from "./style";
import { Themes } from "../../../global/theme";

//Types
import { Event } from "../../../utils/types/typeEvent";
import { ModalType } from "../../../utils/types/typeModal";

//Components
import PresentDetails from "../../components/Present-Details";
import { NoRecordView } from "../../components/No-Record-View";
import { PresentMap } from "../../components/Present-Map";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";
import { TouchButton } from "../../components/Touch-Button";
import { ModalComponent } from "../../components/Modal-Component";

//Api
import { Api } from "../../connection/axios";
import { AxiosError } from "axios";

//Contexts
import { userEvent } from "../../context/EventContext";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

export const ScreenDetailsEvent = () => {
  //Contextos
  const { eventData, loadingEvent, loadEventData } = userEvent();
  const { token, checkTokenValidity } = useAuth(); //Token do usuário
  const { userData, updateUser } = useUser();

  //Pegando o id da requisição
  const route = useRoute();
  const { idEvent } = route.params as { idEvent: string };

  //Navigator
  const navigator = useNavigation();

  //States
  const [event, setEvent] = useState<Event | undefined>();
  const [infoVaccine, setInfoVaccine] = useState<infoVaccine>();
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState<boolean>(false); //Função de refresh
  
  //Contorladores do modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("sucessfulRequest"); // Estado para o tipo do modal

  //Constantes para controle do modal
  const handleOpenModal = () => setModalVisible(true); //Função para abrir o modal
  const handleCloseModal = () => setModalVisible(false); //Função para fechar o modal

  //Formatação da data
  const formatDate = (dateString: string): string => {
    // Cria uma instância de Date a partir da string ISO
    const date = new Date(dateString);
    
    // Obtém o dia, mês e ano
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mês é 0 indexado, por isso adicionamos 1
    const year = date.getUTCFullYear();

    // Retorna no formato "DD/MM/YYYY"
    return `${day}/${month}/${year}`;
  };

  //Função de redenrização
  useEffect(() => {
    if (eventData.length > 0) {
      const foundEvent = eventData.find((event) => event.id === idEvent);

      if (foundEvent) {
        setEvent(foundEvent);
        setInfoVaccine(foundEvent.vaccine);
        setNoRecords(false);
      } else {
        setNoRecords(true);
      }
    }
  }, [eventData, idEvent]);

  //Função para realizar a solicitação de reseva:
  const handleReservationRequest = async () => {
    if (!event) return;
    if (!token) return; 

    try {
      await checkTokenValidity(token); //Validando que o token é válido

      setLoading(true);
      // Pega a data e hora atuais no formato ISO (padrão UTC)
      const currentDate = new Date().toISOString();

      //Requisição a API
      const response = await Api.post(
        "/reservation",
        {
          date: currentDate, // Data do evento
          idCalendar: idEvent, // ID do calendário (evento)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
          },
        }
      );

      if (response.status === 201) {
        setModalType("sucessfulRequest");
        await handleUpdateRequestEventsUser();
      }
    } catch (error) {
      handleRequestErrors(error); //Função para tratar erros
    } finally {
      setLoading(false);
      handleOpenModal();
    }
  };

  //Função de erros
  const handleRequestErrors = (error: unknown) => {
    if (error instanceof AxiosError) {
      //Possíveis erros do backend
      const status = error.response?.status;
      if (status === 409) {
        setModalType("faliedRequestAlreadyDone"); //Solicitação já existe
      } else {
        setModalType("faliedRequest"); //Solicitação deu erro de alguma outra coisa
      }
    } else {
      console.error("Erro inesperado:", (error as Error).message);
      Alert.alert(
        "Erro",
        "Ocorreu um erro inesperado. Tente novamente mais tarde."
      );
    }
  };

  //Função para atualização do dados do usuário
  const handleUpdateRequestEventsUser = async () => {
    try {
      const response = await Api.get("/reservation", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Status correto para a obtenção de dados
        updateUser({
          ...userData, // Atualiza todos os campos do usuário
          requestReservation: response.data,
        });
      }
    } catch (error) {
      console.log("Um erro encontrado ao buscar os dados do usuário: ", error);
    }
  };

   // Função para recarregar os dados no pull-to-refresh
   const onRefresh = async () => {
    setRefreshing(true);
    await loadEventData(); // Recarrega os dados de eventos
    setRefreshing(false);
  };

  return (
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={[`${Themes.colors.greenDark}`]} 
      />
    }>
      <View style={styles.container}>
        {loadingEvent ? (
          <ActivityIndicator
            size="large"
            color={`${Themes.colors.greenDark}`}
          />
        ) : event && infoVaccine ? (
          <View style={styles.viewList}>
            <View style={styles.mapContainer}>
              <PresentMap
                pattent="mapEventDetails"
                latitude={`${event.latitude}`}
                longitude={`${event.longitude}`}
              />
            </View>
            <PresentDetails
              details={[
                {
                  iconName: "syringe",
                  label: "Vacina",
                  text: event.vaccine.name,
                },
                {
                  iconName: "calendar",
                  label: "Data",
                  text: formatDate(event.date),
                },
                {
                  iconName: "calendar-minus",
                  label: "Status",
                  text: "Não Realizado",
                },
              ]}
              title={event.local}
            />
            <PresentDetails
              title={infoVaccine.name}
              contraindications={infoVaccine.contraIndication}
              description={infoVaccine.description}
              details={[
                {
                  iconName: "truck",
                  label: "Fabricante",
                  text: infoVaccine.manufacturer,
                },
                {
                  iconName: "sliders-h",
                  label: "Tipo",
                  text: infoVaccine.type,
                },
              ]}
            />
            <PresentDetails
              title="Mais Informações"
              details={[
                {
                  iconName: "user-alt",
                  label: "Responsável",
                  text: event.local,
                },
              ]}
              observation={infoVaccine.observations}
            />
            <View style={styles.buttonContainer}>
              <TouchButton
                text="Solicitar Reserva de Vaga"
                styleType="buttonLargerSolid"
                onPress={() => handleReservationRequest()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchButton
                text="Ver Outros Eventos"
                styleType="buttonLargerOpacity"
                onPress={() => navigator.navigate("ListEvents")}
              />
            </View>
          </View>
        ) : (
          <NoRecordView title="Vacina não encontrada" />
        )}
      </View>

      <ModalComponent
        visible={modalVisible}
        onClose={handleCloseModal}
        typeModal={modalType}
      />
    </ScrollView>
  );
};
