import { Text, TextStyle, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./style";
import React from "react";

type props = {
  iconName?: string;
  text?: string;
  subTitle?: string;
  title?: string;
  textStyles?: TextStyle;
};

const TextComponent = ({
  iconName,
  text,
  subTitle,
  title,
  textStyles,
}: props) => {
  return (
    <View style={styles.container}>
      {title ? (
        <Text style={[styles.title]} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      ) : (
        ""
      )}
      {iconName ? (
        <Icon style={[styles.styledIcon, textStyles]} name={iconName} />
      ) : (
        ""
      )}
      {subTitle ? (
        <Text style={[styles.subTitle, textStyles]}>{subTitle + ": "}</Text>
      ) : (
        ""
      )}
      {text ? (
        <Text style={[textStyles]} numberOfLines={1} ellipsizeMode="tail">
          {text}
        </Text>
      ) : (
        ""
      )}
    </View>
  );
};

export default TextComponent;
