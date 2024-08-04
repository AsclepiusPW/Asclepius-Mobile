// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 'auto',
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 20,
        alignItems: 'center',
        gap: 3,
        backgroundColor: `${Themes.colors.white}`
    },

    containerHeader: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    headerTitle: {
        flexDirection: 'row',
        alignItems: "center",
        gap:10,
    },

    title: {
        fontFamily: `${Themes.fonts.bold}`,
        fontSize: 18,
    },

    containerList: {
        width: '100%',
        height: 'auto',
        paddingVertical: 25,
        flexDirection: 'column',
        gap: 20,
        alignItems: 'flex-start',
    },

    itemList: {
        flexDirection: 'row',
        alignItems: "center",
        gap:10,
    },

    titleList: {
        fontFamily: `${Themes.fonts.bold}`,
        fontSize: 15,
    },
    
    textList: {
        fontFamily: `${Themes.fonts.regular}`,
        fontSize: 13,
    },

    textListDescription: {
        fontFamily: `${Themes.fonts.regular}`,
        fontSize: 13,
        paddingHorizontal: 40,
    },
});