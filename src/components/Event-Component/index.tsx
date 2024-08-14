import { Text, View } from "react-native";
import { PresentMap } from "../Present-Map";
import styles from "./style";
import { string } from "yup";

type props = {
  vacineName: string;
  localName: string;
  dateEvent: string;
  vacancies: number;
};
const EventComponent = ({
  vacineName,
  dateEvent,
  vacancies,
  localName,
}: props) => {
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 20 }}>
        <PresentMap
          zoomEnable={false}
          scrollEnable={false}
          showLocationButtom={false}
          pattent="mapEvent"
        />
      </View>

      <View style={styles.informations}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{localName}</Text>
        <Text>Vacina: {vacineName}</Text>
        <Text>{`${dateEvent}`}</Text>
        <Text>Vagas: {vacancies}</Text>
      </View>
    </View>
  );
};

export default EventComponent;
