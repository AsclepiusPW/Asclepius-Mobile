// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    container: {
        width:'95%',
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circleDetails: {
        height: 95,
        width: 95,
        borderRadius: 100,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: `${Themes.colors.white}`,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    circleImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    containerDetails:{
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    detailsUserName: {
        fontFamily: `${Themes.fonts.bold}`,
        color: `${Themes.colors.white}`,
        fontSize: 18,
    },

    detailsUserEmail: {
        fontFamily: `${Themes.fonts.regular}`,
        color: `${Themes.colors.white}`,
        fontSize: 12,
    },
});