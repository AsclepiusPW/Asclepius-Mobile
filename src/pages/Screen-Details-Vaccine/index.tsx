//Imports
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

//Types
import { arrayEvent } from "../../../utils/tests/arrayEvent";
import { Event } from "../../../utils/types/typeEvent";

//Styles
import styles from "./style";
import { Themes } from "../../../global/theme";

//Components
import EventComponent from "../../components/Event-Component";
import PresentDetails from "../../components/Present-Details";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";
import { arrayInfoVaccines } from "../../../utils/tests/arrayInfoVaccine";
import { NoRecordView } from "../../components/No-Record-View";

type prop = {
  vaccine?: string;
};

export const ScreenDetailsVaccine = ({ vaccine }: prop) => {
  const [arrayInfo, setArrayInfo] = useState<infoVaccine | undefined>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setNoRecords(false);

    // Filtra a vacina pelo nome passado na prop
    const selectedVaccine = arrayInfoVaccines.find(
      (info) => info.name === vaccine //CORRIGIR
    );
    setArrayInfo(selectedVaccine);

    // Filtra os eventos associados ao nome da vacina
    const filteredEvents = arrayEvent.filter(
      (event) => event.vaccine.id === vaccine //CORRIGIR
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
              {noRecords ? (
                <NoRecordView title="Não Há Eventos Cadastrados" />
              ) : (
                events.map((content, index) => (
                  <EventComponent
                    key={index}
                    date={content.date}
                    local={content.local}
                    places={content.places}
                    vaccine={content.vaccine.name}
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