//Importações
import { useEffect, useState } from "react";
import { View, TextInput, KeyboardTypeOptions, TouchableOpacity } from "react-native";
import React from "react";

//Icon
import Icon from 'react-native-vector-icons/FontAwesome';

// //Estilização
import { styles } from "./style";
import { Themes } from "../../../global/theme";

//props
interface props {
    icon?: string,
    placeholder?: string,
    value?: string,
    onChangeText?: (text: string) => void,
    keyboardType?: KeyboardTypeOptions,
    secureTextEntry?: boolean,
    onBlur?: (e: any) => void,
}

export const InputForm: React.FC<props> = ({ icon, placeholder, value, onChangeText, keyboardType, secureTextEntry, onBlur }) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

    const handleTextChange = (text: string) => {
        setInputValue(text);
        if (onChangeText) {
            onChangeText(text);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.inputContainer}>
            {icon && <Icon name={icon} size={24} color={`${Themes.colors.greenDark}`} />}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={inputValue}
                onChangeText={handleTextChange}
                keyboardType={keyboardType}
                secureTextEntry={!isPasswordVisible && secureTextEntry}
                onBlur={onBlur}
            />

            {secureTextEntry && (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={24} color={`${Themes.colors.greenDark}`} />
                </TouchableOpacity>
            )}
        </View>
    )
}