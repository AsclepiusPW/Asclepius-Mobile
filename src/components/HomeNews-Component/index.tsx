//Importações
import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Alert } from "react-native";

//Imagem Deafault
import news from "../../../images/news.png";

//Estilização
import {styles} from "./style";

//Props
interface props {
    title?: string,
    description?: string,
    image?: string
}

export const NewsComponent: React.FC<props> = ({title, description, image}) => {
    
    const handleChangeNews = () => {
        Alert.alert("Clicou na notícia")
    }
    
    return(
        <TouchableOpacity style={styles.container} onPress={handleChangeNews}>
            <View style={styles.containerImage}>
                <Image source={image ? image : news} style={styles.image}/>
            </View>

            <View style={styles.contentInformation}>
                <Text style={styles.informationText}>
                    {title ? title : "Sem título"}
                </Text>

                <Text style={styles.informationDescription}>
                    {description ? description : "Sem descrição"}
                </Text>
            </View>
        </TouchableOpacity>
    )
}