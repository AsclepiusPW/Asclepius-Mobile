import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "./style";

const CalendarComponent = () => {
  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        disableArrowLeft={true}
        disableArrowRight={true}
        hideArrows={true}
      />
    </View>
  );
};

export default CalendarComponent;
