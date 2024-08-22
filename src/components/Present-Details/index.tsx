import { Text, View } from "react-native";
import React from "react";
import TextComponent from "../Text-Component";
import styles from "./style";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";

const PresentDetails = ({
  description,
  contraindications,
  manufacturer,
  title,
  type,
}: infoVaccine) => {
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={styles.titleStyled}>{title}</Text>
        <View style={styles.detailsStyled}>
          <TextComponent
            iconName="truck"
            subTitle="Fabricante"
            text={manufacturer}
            textStyles={styles.subTitleStyled}
          />

          <TextComponent
            subTitle="Tipo"
            iconName="sliders-h"
            text={type}
            textStyles={styles.subTitleStyled}
          />
          <TextComponent
            subTitle="Descrição"
            iconName="list"
            textStyles={styles.subTitleStyled}
          />
          <Text style={styles.paragraphStyled}>{description}</Text>
          <TextComponent
            subTitle="Contraindicações"
            textStyles={styles.subTitleStyled}
            iconName="list"
          />
          <Text style={styles.paragraphStyled}>{contraindications}</Text>
        </View>
      </View>
    </View>
  );
};

export default PresentDetails;
