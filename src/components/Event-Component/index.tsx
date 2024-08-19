import { Text, View } from "react-native";
import { PresentMap } from "../Present-Map";
import styles from "./style";
import { Event } from "../../../utils/types/typeEvent";
import TextComponent from "../Text-Component";

const EventComponent = ({
  vacineName,
  dateEvent,
  vacancies,
  localName,
  latitude,
  longitude,
}: Event) => {
  const formatDate = (dateString: string): string => {
    // Espera-se que a string esteja no formato "YYYY-MM-DD"
    const [year, month, day] = dateString.split("-");

    // Retorna no formato "DD/MM/YYYY"
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 20 }}>
        <PresentMap
          zoomEnable={false}
          scrollEnable={false}
          showLocationButtom={false}
          pattent="mapEvent"
          latitude={latitude}
          longitude={longitude}
        />
      </View>

      <View style={styles.informations}>
        <TextComponent title={localName} />
        <TextComponent subTitle="Vacina" iconName="syringe" text={vacineName} />
        <TextComponent
          iconName="calendar"
          subTitle="Data"
          text={formatDate(dateEvent)}
        />
        <TextComponent iconName="user" subTitle="Vagas" text={`${vacancies}`} />
      </View>
    </View>
  );
};

export default EventComponent;
