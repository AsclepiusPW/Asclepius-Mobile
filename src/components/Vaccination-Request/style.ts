// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 490,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `${Themes.colors.white}`
    },

    containerApresentation: {
        width: '100%',
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    apresentationText: {
        fontSize: 15,
        fontFamily: `${Themes.fonts.bold}`,
    },

    buttonPress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },

    latestRequestVacination: {
        width: '98%',
        height: '88%',
        paddingHorizontal: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});