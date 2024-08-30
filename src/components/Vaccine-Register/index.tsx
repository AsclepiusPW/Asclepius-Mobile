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

const VaccineRegister = ({ manufacturer, type, title }: infoVaccine) => {
  //Const navegação
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() =>navigation.navigate("DetailsVaccine")}>
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
    </TouchableOpacity>
  );
};

export default VaccineRegister;
