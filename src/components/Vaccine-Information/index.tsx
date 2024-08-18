import { View } from "react-native";
import TextComponent from "../Text-Component";
import styles from "./style";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";

const VaccineInformation = ({ manufacturer, type, title }: infoVaccine) => {
  return (
    <View>
      <View style={styles.title}>
        <TextComponent title={title} />
      </View>
      <TextComponent
        subTitle="Fabricante"
        text={manufacturer}
        iconName="truck"
      />
      <TextComponent subTitle="Tipo" text={type} iconName="sliders-h" />
    </View>
  );
};

export default VaccineInformation;
