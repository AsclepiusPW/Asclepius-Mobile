//Importações
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

//Icones
import Icon from 'react-native-vector-icons/Feather';

//Estlização
import { styles } from "./style";
import { Themes } from "../../../global/theme";

//Props
interface props {
    title?: string,
    search?: boolean, //Se vai apresentar o input ou não
    placeholder?: string,
    changeSubmit?: (text: string) => void; //Modificar essa função para a realização da busca
}

//Header de apresentação com a possibilidade de apresentar o header com o input de pesquisa ou não
export const HeaderApresentation: React.FC<props> = ({ title, search, placeholder, changeSubmit }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChangePress = () => {
        if (changeSubmit && inputValue.trim() !== "") {
            changeSubmit(inputValue);
        }
    }
    
    return (
        <LinearGradient
            colors={['#05E9AC', '#68B2A0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View style={styles.headerApresentation}>
                <Text style={styles.text}>
                    {title}
                </Text>

                <TouchableOpacity>
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

        </LinearGradient>
    )
}