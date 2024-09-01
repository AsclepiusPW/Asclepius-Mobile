//Import
import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

//Estilizações
import { styles } from "./styles";
import { Themes } from "../../../global/theme";

export const UpdatingComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentUpdate}>
                <ActivityIndicator size="large" color={`${Themes.colors.greenDark}`} />
                <Text style={styles.contentText}>Atualizando...</Text>
            </View>
        </View>
    )
}