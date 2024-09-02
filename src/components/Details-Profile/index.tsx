//Importações
import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

//Componentes
import { PresentInformation } from "../Present-Information";

//Icones
import Icon from 'react-native-vector-icons/Feather';
import userUndefined from "../../../images/user-undefined.jpg";

//Estilização
import { styles } from "./style";
import { Themes } from "../../../global/theme";

//Props
interface props {
    userName?: string,
    userEmail?: string,
    userPhone?: string
    userImage?: string,
}

export const DetailsProfile: React.FC<props> = ({ userEmail, userName, userPhone, userImage }) => {
    //Const de navigação
    const navigation = useNavigation();
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
        <View style={styles.container}>
            <LinearGradient
                colors={['#2C6975', '#05E9AC']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.containerDetails}
            >
                <View style={styles.circleDetails}>
                    <Image
                        source={userImage && userImage !== "Image not registered" ? { uri: imageProfile } : userUndefined}
                        style={styles.circleImage}
                    />
                </View>

                <View>
                    <Text style={styles.textDetails}>Bem-Vindo</Text>
                    <Text style={[styles.textDetails, styles.userNameText]}>{userName ? userName : "Nome de usuário"}</Text>
                </View>

            </LinearGradient>

            <View style={styles.informationProfileContainer}>
                <View style={styles.informationProfileHeader}>
                    <Text style={styles.textHeader}>Detalhes de Pefil</Text>

                    <TouchableOpacity onPress={()=> navigation.navigate("EditProfile")}>
                        <Icon name="settings" size={24} color={`${Themes.colors.black}`} />
                    </TouchableOpacity>
                </View>

                <View style={styles.informationProfileContent}>

                    <PresentInformation
                        key="name"
                        title="Nome"
                        text={userName}
                    />

                    <PresentInformation
                        key="email"
                        title="Email"
                        text={userEmail}
                    />

                    <PresentInformation
                        key="phone"
                        title="Telefone"
                        text={userPhone}
                    />

                </View>
            </View>
        </View>
    )
}