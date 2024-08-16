import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./style";

type props = {
  iconName?: string;
  text?: string;
  subTitle?: string;
  title?: string;
};
const TextComponent = ({ iconName, text, subTitle, title }: props) => {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : ""}
      {iconName ? <Icon name={iconName} style={styles.styledIcon} /> : ""}
      {subTitle ? <Text style={styles.subTitle}>{subTitle + ": "}</Text> : ""}
      {text ? <Text>{text}</Text> : ""}
    </View>
  );
};

export default TextComponent;
