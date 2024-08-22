import { View } from "react-native";
import TextComponent from "../Text-Component";
import styles from "./style";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";
import React from "react";

const VaccineInformation = ({ manufacturer, type, title }: infoVaccine) => {
  return (
    <View>
      <TextComponent title={title} textStyles={{ maxWidth: "80%" }} />
      <TextComponent
        subTitle="Fabricante"
        text={manufacturer}
        iconName="truck"
        textStyles={{ maxWidth: "60%" }}
      />
      <TextComponent subTitle="Tipo" text={type} iconName="sliders-h" />
    </View>
  );
};

export default VaccineInformation;
