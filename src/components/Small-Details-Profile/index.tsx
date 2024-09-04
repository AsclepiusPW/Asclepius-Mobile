//Importações
import React, { useEffect, useState } from "react";
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
    const [imageProfile, setImageProfile] = useState<string | undefined>("Image not registered");
    
    //Função para listar a imagem de perfil
    const handleSelectImmageProfile = () => {
        if (userImage && userImage !== "Image not registered") {
            return `http://192.168.0.101:5000/images/${userImage}`; //Mudar isso caso mudar o ip do axios
        }else {
            return undefined;
        }
    }

    //O UseEffect será chamado sempre que a imagem mmudar
    useEffect(()=> {
        const imageURI = handleSelectImmageProfile();
        setImageProfile(imageURI);
    }, [userImage])
    
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