// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        marginTop: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: 'column',
        gap: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerText: {
        fontFamily: `${Themes.fonts.bold}`,
        fontSize: 18,
        textAlign: 'center'
    }
});