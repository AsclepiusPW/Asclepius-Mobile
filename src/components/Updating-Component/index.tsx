//Import
import React from "react";
import { View, ActivityIndicator, Text, Image } from "react-native";

//Estilizações
import { styles } from "./styles";
import { Themes } from "../../../global/theme";

//Imagens
import AsclepiusLogo from "../../../images/logo-color-cropped.png";

export const UpdatingComponent: React.FC<{ImageLoop?: boolean}> = ({ImageLoop}) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentUpdate}>
                {ImageLoop && (
                    <Image source={AsclepiusLogo} style={{ width: "60%", resizeMode: "contain" }} />
                )}
                <ActivityIndicator size="large" color={`${Themes.colors.greenDark}`} />
                <Text style={styles.contentText}>Atualizando...</Text>
            </View>
        </View>
    )
}