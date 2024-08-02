// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    containerItem: {
        width: '100%',
        paddingVertical: 20,
    },
    
    content: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    contentTitle: {
        width: '100%',
        marginBottom: 15,
        borderBottomColor: `${Themes.colors.greenAcqua}`,
        borderBottomWidth: 2,
        fontFamily: `${Themes.fonts.bold}`
    },

    listContent: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomColor: `${Themes.colors.greenAcqua}`,
        borderBottomWidth: 2,
    },

    listContentTitle: {
        fontFamily: `${Themes.fonts.bold}`,
    },
    
    listContentText: {
        fontFamily: `${Themes.fonts.regular}`,
        marginLeft: 10,
    },

    contentAccepted: {
        fontFamily: `${Themes.fonts.semiBold}`,
        textAlign: 'right',
    },

    acceptedTrue: {
        color: `${Themes.colors.greenAcqua}`,
        borderBottomColor: `${Themes.colors.greenAcqua}`,
    },

    acceptedFalse: {
        color: `${Themes.colors.redHot}`,
        borderBottomColor: `${Themes.colors.redHot}`,
    },
});