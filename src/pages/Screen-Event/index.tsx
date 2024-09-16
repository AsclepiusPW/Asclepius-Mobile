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
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7) //Settando com a data atual
  );

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

  //Effect de busca de eventos (Filtra por mês e por pesquisa)
  useEffect(() => {
    setLoading(true);
    setNoRecords(false);

    setTimeout(() => {
      // Filtrando por busca ou por mês
      let filteredEvents = allEvent;
      console.log(selectedMonth);

      // Se há uma pesquisa ativa, ignoramos o filtro de mês
    if (searchQuery !== "") {
      filteredEvents = allEvent.filter((event) =>
        event.local.toLowerCase().includes(searchQuery)
      );
    } else if (selectedMonth !== "") {
      // Se não há pesquisa, aplicamos o filtro por mês
      filteredEvents = allEvent.filter((event) =>
        event.date.startsWith(selectedMonth)
      );
    }

      setEvent(filteredEvents);
      setNoRecords(filteredEvents.length === 0);
      setLoading(false);
    }, 1000);
  }, [searchQuery, allEvent, selectedMonth]);

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
        <CalendarComponent 
          date={dateEvent} 
          onMonthChange={(month: string) => setSelectedMonth(month)}
        />

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
