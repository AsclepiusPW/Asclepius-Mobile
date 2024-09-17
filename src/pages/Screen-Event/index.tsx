//Imports
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, RefreshControl } from "react-native";

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
  const { eventData, loadingEvent, loadEventData } = userEvent();

  const [event, setEvent] = useState<Event[]>([]); //Dados mutáveis localmente
  const [allEvent, setAllEvent] = useState<Event[]>([]); //Dados vindos da API
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState<boolean>(false); //Função de refresh

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
  }, [searchQuery, allEvent, selectedMonth, refreshing]);

  //Função de refresh (Atualização da tela)
  const onRefresh = async () => {
    setRefreshing(true);

    // Chama a função de carregar eventos
    await loadEventData(); // Aqui você garante que a função será chamada antes de seguir

    // Recarrega os eventos e atualiza o estado
    setAllEvent(eventData); // Usa o dado atualizado após carregar
    setEvent(eventData);

    // Verifica se há registros
    setNoRecords(eventData.length === 0);

    // Finaliza o refresh
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
