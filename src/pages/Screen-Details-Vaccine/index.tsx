import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import PresentDetails from "../../components/Present-Details";
import styles from "./style";
import EventComponent from "../../components/Event-Component";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";
import { arrayInfoVaccines } from "../../../utils/tests/arrayInfoVaccine";
import { Themes } from "../../../global/theme";
import { NoRecordView } from "../../components/No-Record-View";
import { arrayEvent } from "../../../utils/tests/arrayEvent";
import { Event } from "../../../utils/types/typeEvent";

type prop = {
  vaccine: string;
};

const ScreenDetailsVaccine = ({ vaccine }: prop) => {
  const [arrayInfo, setArrayInfo] = useState<infoVaccine | undefined>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setNoRecords(false);

    // Filtra a vacina pelo nome passado na prop
    const selectedVaccine = arrayInfoVaccines.find(
      (info) => info.title === vaccine
    );
    setArrayInfo(selectedVaccine);

    // Filtra os eventos associados ao nome da vacina
    const filteredEvents = arrayEvent.filter(
      (event) => event.vacineName === vaccine
    );
    setEvents(filteredEvents);

    if (filteredEvents.length === 0) {
      setNoRecords(true);
    }

    setLoading(false);
  }, [vaccine]);

  return (
    <ScrollView>
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
              contraindications={arrayInfo.contraindications}
              manufacturer={arrayInfo.manufacturer}
              type={arrayInfo.type}
              title={arrayInfo.title}
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
              {noRecords ? (
                <NoRecordView title="Não Há Eventos Cadastrados" />
              ) : (
                events.map((content, index) => (
                  <EventComponent
                    key={index}
                    dateEvent={content.dateEvent}
                    localName={content.localName}
                    vacancies={content.vacancies}
                    vacineName={content.vacineName}
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

export default ScreenDetailsVaccine;
