// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    buttonSmallSolid: {
        width: 150,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${Themes.colors.greenAcqua}`,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonLargerSolid: {
        width: 340,
        height: 50,
        borderRadius: 30,
        backgroundColor: `${Themes.colors.greenDark}`,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonLargerOpacity: {
        width: 340,
        height: 50,
        borderRadius: 30,
        borderColor: `${Themes.colors.greenDark}`,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontFamily: `${Themes.fonts.bold}`,
        color: `${Themes.colors.white}`,
    },

    buttonTextOpacity: {
        fontFamily: `${Themes.fonts.bold}`,
        color: `${Themes.colors.greenDark}`,
    }

});