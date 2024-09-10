//Imports
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

//Components
import EventComponent from "../../components/Event-Component";
import CalendarComponent from "../../components/Calendar-Component";
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { NoRecordView } from "../../components/No-Record-View";

//Styles
import { Themes } from "../../../global/theme";
import styles from "./style";

//Types
import { Event } from "../../../utils/types/typeEvent";

//EventContext
import { userEvent } from "../../context/EventContext";

export const ScreenEvent = () => {
  //Pegando as informações que necessito
  const { eventData, loadingEvent } = userEvent();

  const [event, setEvent] = useState<Event[]>([]); //Dados mutáveis localmente
  const [allEvent, setAllEvent] = useState<Event[]>([]); //Dados vindos da API
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);

  const [dateEvent, setDateEvent] = useState<string[]>([]);

  const searchEvent = (event: string) => {
    setSearchQuery(event.toLowerCase());
  };

  // Carregando os dados do contexto na montagem do componente
  useEffect(() => {
    if (eventData.length > 0) {
      setLoading(loadingEvent);
      setAllEvent(eventData);
      setEvent(eventData);

      // Convertendo as datas para o formato 'YYYY-MM-DD'
      const dateEvents = eventData.map(
        (event: Event) => event.date.slice(0, 10) // Extrai a parte da data 'YYYY-MM-DD'
      );
      setDateEvent(dateEvents);

      // Verificando se existem eventos
      setNoRecords(eventData.length === 0);
    } else {
      setNoRecords(true);
      setLoading(false);
    }
  }, [eventData]);

  //Effect de busca de eventos
  useEffect(() => {
    setLoading(true);
    setNoRecords(false);

    setTimeout(() => {
      if (searchQuery === "") {
        setEvent(allEvent);
        setNoRecords(false);
      } else {
        const searchEvent = allEvent.filter((event) =>
          event.local.toLowerCase().includes(searchQuery)
        );

        setEvent(searchEvent);
        setNoRecords(searchEvent.length === 0);
      }
      setLoading(false);
    }, 1000);
  }, [searchQuery, allEvent]);

  return (
    <ScrollView>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <HeaderApresentation
          search={true}
          title="Vaccine Calendar"
          placeholder="Pesquisar evento..."
          changeSubmit={searchEvent}
        />
        <CalendarComponent date={dateEvent} />

        {loading ? (
          <ActivityIndicator
            size="large"
            color={`${Themes.colors.greenDark}`}
          />
        ) : (
          <View style={styles.viewList}>
            {noRecords ? (
              <NoRecordView title="Nenhum Evento Encontrado" />
            ) : (
              event.map((content, index) => (
                <EventComponent
                  key={index}
                  idEvent={content.id}
                  date={content.date}
                  local={content.local}
                  places={content.places}
                  vaccine={content.vaccine.name}
                  latitude={content.latitude}
                  longitude={content.longitude}
                />
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
