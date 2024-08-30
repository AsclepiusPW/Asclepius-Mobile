//Importações
import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//Estilização
import { styles } from "./style";

//Imagens
import userUndefined from "../../../images/user-undefined.jpg";

//props
interface props {
    userName?: string,
    userEmail?: string,
    userImage?: string,
    profileImage?: string | null //Para a imagem que será recuperada do dispositivo
}

export const SmallDetailsProfile: React.FC<props> = ({ userName, userImage, userEmail, profileImage }) => {
    return (
        <LinearGradient
            colors={['#05E9AC', '#2C6975']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View style={styles.circleDetails}>
                <Image
                    source={profileImage ? { uri: profileImage } : (userImage ? { uri: userImage } : userUndefined)}
                    style={styles.circleImage}
                />
            </View>

            <View style={styles.containerDetails}>
                <Text style={styles.detailsUserName}>{userName ? userName : "Nome do usuário"}</Text>
                <Text style={styles.detailsUserEmail}>{userEmail ? userEmail : "userTest@gmail.com"}</Text>
            </View>
        </LinearGradient>

    )
}