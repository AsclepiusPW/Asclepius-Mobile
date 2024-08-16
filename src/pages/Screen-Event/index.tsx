import { ActivityIndicator, ScrollView, View } from "react-native";
import EventComponent from "../../components/Event-Component";
import CalendarComponent from "../../components/Calendar-Component";
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { useEffect, useState } from "react";
import { Event } from "../../../utils/types/typeEvent";
import { arrayEvent } from "../../../utils/tests/arrayEvent";
import { Themes } from "../../../global/theme";
import { NoRecordView } from "../../components/No-Record-View";
import styles from "./style";

const ScreenEvent = () => {
  const [event, setEvent] = useState<Event[]>(arrayEvent);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);
  const [dateEvent, setDateEvent] = useState<string[]>(
    arrayEvent.map((event) => event.dateEvent)
  );

  const searchEvent = (event: string) => {
    setSearchQuery(event.toLowerCase());
  };

  useEffect(() => {
    setLoading(true);
    setNoRecords(false);

    setTimeout(() => {
      if (searchQuery === "") {
        setEvent(arrayEvent);
        setNoRecords(false);
      } else {
        const searchEvent = arrayEvent.filter((event) =>
          event.localName.toLowerCase().includes(searchQuery)
        );
        console.log(searchEvent);

        setEvent(searchEvent);
        setNoRecords(searchEvent.length === 0);
      }
      setLoading(false);
    }, 1000);
  }, [searchQuery]);

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
                  dateEvent={content.dateEvent}
                  localName={content.localName}
                  vacancies={content.vacancies}
                  vacineName={content.vacineName}
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

export default ScreenEvent;
