import { View } from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";
import VaccineInformation from "../Vaccine-Information";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";

const VaccineRegister = ({ manufacturer, type, title }: infoVaccine) => {
  return (
    <View style={styles.container}>
      <View style={styles.styledViewIcon}>
        <Icon style={styles.styledIcon} size={64} name="syringe" />
      </View>
      <View style={styles.informations}>
        <VaccineInformation
          manufacturer={manufacturer}
          title={title}
          type={type}
        />
      </View>
    </View>
  );
};

export default VaccineRegister;
