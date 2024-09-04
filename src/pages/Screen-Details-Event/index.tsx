//Imports
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

//Styles
import styles from "./style";
import { Themes } from "../../../global/theme";

//Types
import { arrayInfoVaccines } from "../../../utils/tests/arrayInfoVaccine";
import { arrayEvent } from "../../../utils/tests/arrayEvent";
import { Event } from "../../../utils/types/typeEvent";

//Components
import PresentDetails from "../../components/Present-Details";
import { NoRecordView } from "../../components/No-Record-View";
import { PresentMap } from "../../components/Present-Map";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";
import EventComponent from "../../components/Event-Component";
import { TouchButton } from "../../components/Touch-Button";

type Prop = {
  localName?: string;
};

export const ScreenDetailsEvent = ({ localName }: Prop) => {
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const [event, setEvent] = useState<Event>();
  const [infoVaccine, setInfoVaccine] = useState<infoVaccine>();
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setNoRecords(false);

    setTimeout(() => {
      const selectedEvent = arrayEvent.find(
        (event) => event.local === localName
      );
      setEvent(selectedEvent);

      const selectedVaccine = arrayInfoVaccines.find(
        (event) => event.name === selectedEvent?.vaccine.name
      );
      setInfoVaccine(selectedVaccine);

      if (!selectedVaccine && !selectedEvent) {
        setNoRecords(true);
      }
      setLoading(false);
    }, 1000);
  }, [localName]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
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
              contraindications={infoVaccine.contraindications}
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
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchButton
                text="Ver Outros Eventos"
                styleType="buttonLargerOpacity"
              />
            </View>
          </View>
        ) : (
          <NoRecordView title="Vacina não encontrada" />
        )}
      </View>
    </ScrollView>
  );
};