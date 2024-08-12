//Importações
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";

//Estilização
import { styles } from "./style";

//props
/* Estilo do buttons:
    buttonSmallSolid,
    buttonLargerSolid,
    buttonLargerOpacity
*/

interface props {
    onPress?: ()=> void,
    text: string,
    styleType: keyof typeof styles, //Esse atributo descreve quais devem ser os estilos do buttons
}

export const TouchButton:React.FC<props> = ({onPress, styleType, text}) => {
    const buttonStyle = styles[styleType] as StyleProp<ViewStyle>;

    return(
        <TouchableOpacity  style={buttonStyle} onPress={onPress}>
            <Text style={[styles.buttonText, styleType === "buttonLargerOpacity" && styles.buttonTextOpacity]}>{text}</Text>
        </TouchableOpacity>
    )
}