//Imports
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Types
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";

//Styles
import styles from "./style";
import VaccineInformation from "../Vaccine-Information";
import Icon from "react-native-vector-icons/FontAwesome5";

//props
interface props {
  manufacturer: string, 
  type: string, 
  name: string,
  idVaccine: string, //Recebendo o id da vacina
}

const VaccineRegister = ({ manufacturer, type, name, idVaccine }: props) => {
  //Const navegação
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() =>navigation.navigate("DetailsVaccine", {idVaccine: idVaccine})}>
      <View style={styles.styledViewIcon}>
        <Icon style={styles.styledIcon} size={64} name="syringe" />
      </View>
      <View style={styles.informations}>
        <VaccineInformation
          manufacturer={manufacturer}
          name={name}
          type={type}
        />
      </View>
    </TouchableOpacity>
  );
};

export default VaccineRegister;
