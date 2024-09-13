//Importações
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

//Estilização
import { styles } from "./style";

//props
interface props {
    title?: string,
    text?: string,
}

export const PresentInformation: React.FC<props> = ({title, text}) => {
    return(
        <View style={styles.present}>
            <Text style={styles.presentTitle}>{title ? title : "Título"}</Text>
            <Text style={styles.presentText}>{text ? text : "Texto"}</Text>
        </View>
    )
} 