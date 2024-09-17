//Imports
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View, RefreshControl } from "react-native";
import { useRoute } from "@react-navigation/native";

//Types
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";
import { Event } from "../../../utils/types/typeEvent";

//Styles
import styles from "./style";
import { Themes } from "../../../global/theme";

//Components
import EventComponent from "../../components/Event-Component";
import PresentDetails from "../../components/Present-Details";
import { NoRecordView } from "../../components/No-Record-View";

//Api
import { Api } from "../../connection/axios";

export const ScreenDetailsVaccine = () => {

  //Pegando informações da vacina pela requisição
  const route = useRoute();
  const { idVaccine } = route.params as { idVaccine: string };

  const [arrayInfo, setArrayInfo] = useState<infoVaccine | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);
  const [eventsVaccine, setEventsVaccine] = useState<Event[] | undefined>();

  const [refreshing, setRefreshing] = useState<boolean>(false); //Função de refresh

  useEffect(() => {
    const fetchVaccineIdApi = async () => {
      try {
        setLoading(true);
        const response = await Api.get(`/vaccine/${idVaccine}`);

        setArrayInfo(response.data);
        setNoRecords(response.data.length === 0);
        setEventsVaccine(response.data.vaccinationCalendar);

      } catch (error) {
        console.log("Error ao procurar a vacina:", error);
        setNoRecords(true);
      } finally {
        setLoading(false);
      }
    }

    fetchVaccineIdApi();
  }, [idVaccine]);

  //Função de refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await Api.get(`/vaccine/${idVaccine}`);

      // Atualizando as informações
      setArrayInfo(response.data);
      setNoRecords(response.data.length === 0);
      setEventsVaccine(response.data.vaccinationCalendar);
    } catch (error) {
      console.log("Erro ao atualizar a vacina:", error);
      setNoRecords(true);
    } finally {
      setRefreshing(false); // Finaliza o "refresh"
    }
  };

  return (
    <ScrollView  refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={[`${Themes.colors.greenDark}`]} 
      />
    }>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={`${Themes.colors.greenDark}`}
          />
        ) : arrayInfo ? (
          <>
            <PresentDetails
              description={arrayInfo.description}
              contraindications={arrayInfo.contraIndication}
              details={[
                {
                  iconName: "truck",
                  label: "Fabricante",
                  text: arrayInfo.manufacturer,
                },
                {
                  iconName: "sliders-h",
                  label: "Tipo",
                  text: arrayInfo.type,
                },
              ]}
              title={arrayInfo.name}
            />
            <Text
              style={{
                marginBottom: 10,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Eventos de Vacinação
            </Text>
            <View style={styles.viewList}>
              {eventsVaccine?.length === 0 ? (
                <NoRecordView title="Não Há Eventos Cadastrados" />
              ) : (
                arrayInfo.vaccinationCalendar?.map((content, index) => (
                  <EventComponent
                    key={index}
                    idEvent={content.id}
                    date={content.date}
                    local={content.local}
                    places={content.places}
                    vaccine={arrayInfo.name}
                    latitude={content.latitude} //Adicionei esses campos
                    longitude={content.longitude} //Adicionei esses campos
                  />
                ))
              )}
            </View>
          </>
        ) : (
          <NoRecordView title="Vacina não encontrada" />
        )}
      </View>
    </ScrollView>
  );
};