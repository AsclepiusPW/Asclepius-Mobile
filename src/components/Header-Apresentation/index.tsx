//Importações
import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

//Icones
import Icon from 'react-native-vector-icons/Feather';

//Componente
import { ModalComponent } from "../Modal-Component";

//Estlização
import { styles } from "./style";
import { Themes } from "../../../global/theme";

//Props
interface props {
    title?: string,
    search?: boolean, //Se vai apresentar o input ou não
    placeholder?: string,
    homePresentation?: boolean,
    changeSubmit?: (text: string) => void; //Modificar essa função para a realização da busca
}

//Header de apresentação com a possibilidade de apresentar o header com o input de pesquisa ou não
export const HeaderApresentation: React.FC<props> = ({ title, search, placeholder, homePresentation, changeSubmit }) => {
    //Const de navigação
    const navigation = useNavigation();
    
    const [inputValue, setInputValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    //Função para realizar a pesquisa no input
    const handleChangePress = () => {
        if (changeSubmit && inputValue.trim() !== "") {
            changeSubmit(inputValue);
        }
    }
    
    //Constantes para controle do modal
    const handleOpenModal = () => setModalVisible(true); //Função para abrir o modal
    const handleCloseModal = () => setModalVisible(false); //Função para fechar o modal

    return (
        <LinearGradient
            colors={['#05E9AC', '#68B2A0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View style={styles.headerApresentation}>
               {/* Atualização para a home page */}
               {homePresentation ? ( 
                    <Text style={styles.textHomePage}>
                        Bem vindo ao <Text style={styles.textSpan}>Asclepius</Text>
                    </Text>) : (
                    <Text style={styles.text}>
                        {title ? title : "Sem título"}
                    </Text>
                    )}

                <TouchableOpacity onPress={handleOpenModal}>
                    <Icon name="settings" size={28} color={`${Themes.colors.black}`} />
                </TouchableOpacity>
            </View>

            {search && search === true && (
                <View>
                    <View style={styles.inputDev}>
                        <TextInput
                            style={styles.input}
                            placeholder={placeholder}
                            onChangeText={setInputValue}
                            onSubmitEditing={(event) => {
                                if (changeSubmit) {
                                    changeSubmit(event.nativeEvent.text);
                                }
                            }}
                        />

                        <TouchableOpacity onPress={handleChangePress}>
                            <Icon name="search" size={20} color={`${Themes.colors.black}`} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Modal para opções */}
            <ModalComponent visible={modalVisible} onClose={handleCloseModal} typeModal="modalInformation"/>

        </LinearGradient>
    )
}