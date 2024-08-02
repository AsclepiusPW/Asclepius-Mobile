// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    present: {
        width: '100%',
        gap: 5,
        borderBottomColor: `${Themes.colors.greenAcqua}`,
        borderBottomWidth: 2,
    },

    presentTitle: {
        fontFamily: `${Themes.fonts.bold}`,
    },

    presentText: {
        fontFamily: `${Themes.fonts.regular}`,
        paddingLeft: 10,
    }
})