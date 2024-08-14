import { ScrollView, View } from "react-native";
import EventComponent from "../../components/Event-Component";
import CalendarComponent from "../../components/Calendar-Component";

const ScreenEvent = () => {
  return (
    <ScrollView>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <CalendarComponent />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
        <EventComponent
          dateEvent={new Date("2020-10-02").toLocaleDateString()}
          localName="UBS"
          vacancies={30}
          vacineName="BCG"
        />
      </View>
    </ScrollView>
  );
};

export default ScreenEvent;
