import { Text, View } from "react-native";
import React from "react";
import TextComponent from "../Text-Component";
import styles from "./style";

type Prop = {
  title?: string;
  details?: {
    label: string;
    iconName?: string;
    text?: string;
  }[];
  description?: string;
  contraindications?: string;
  observation?: string;
};

const PresentDetails = ({
  title,
  details,
  description,
  contraindications,
  observation,
}: Prop) => {
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={styles.titleStyled}>{title}</Text>
        <View style={styles.detailsStyled}>
          {details?.map((detail, index) => (
            <TextComponent
              key={index}
              subTitle={detail.label}
              iconName={detail.iconName}
              text={detail.text}
              textStyles={styles.subTitleStyled}
            />
          ))}
          {description && (
            <>
              <TextComponent
                subTitle="Descrição"
                textStyles={styles.subTitleStyled}
                iconName="list"
              />
              <Text style={styles.paragraphStyled}>{description}</Text>
            </>
          )}
          {contraindications && (
            <>
              <TextComponent
                subTitle="Contraindicações"
                textStyles={styles.subTitleStyled}
                iconName="list"
              />
              <Text style={styles.paragraphStyled}>{contraindications}</Text>
            </>
          )}
          {observation && (
            <>
              <TextComponent
                subTitle="Observação"
                textStyles={styles.subTitleStyled}
                iconName="list"
              />
              <Text style={styles.paragraphStyled}>{observation}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default PresentDetails;
