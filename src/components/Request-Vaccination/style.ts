//Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    containerRequest: {
        width: '95%',
        height: 'auto',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        backgroundColor: `${Themes.colors.white}`
    },

    requestHeader:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    requestHeaderTitle:{
        width: '90%',
        fontFamily: `${Themes.fonts.bold}`,
        fontSize: 18,
        paddingBottom: 5,
        color: `${Themes.colors.greenAcqua}`,
        borderBottomWidth: 3,
        borderBottomColor: `${Themes.colors.greenAcqua}`
    },

    requestMap: {
        width: '90%',
        height: 270,
        borderRadius: 20,
        backgroundColor: `${Themes.colors.greenAcqua}`
    },

    requestDetails: {
        width: '90%',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    detailsTitle: {
        fontFamily: `${Themes.fonts.bold}`,
        fontSize: 18,
    },

    containerList: {
        width: '100%',
        height: 'auto',
        paddingVertical: 25,
        paddingHorizontal: 20,
        flexDirection: 'column',
        gap: 15,
        alignItems: 'flex-start',
    },

    itemList: {
        width: '95%',
        flexDirection: 'row',
        alignItems: "center",
        gap:10,
    },

    listHeaderTitle: {
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

    bottomContent: {
        width: '90%',
        borderTopColor: `${Themes.colors.greenAcqua}`,
        borderTopWidth: 3,
        color: `${Themes.colors.disabled}`,
        borderBottomColor: `${Themes.colors.disabled}`,
    },

    contentAccepted: {
        fontFamily: `${Themes.fonts.semiBold}`,
        textAlign: 'right',
        paddingTop: 10,
    },

    acceptedTrue: {
        color: `${Themes.colors.greenAcqua}`,
        borderBottomColor: `${Themes.colors.greenAcqua}`,
        borderTopColor: `${Themes.colors.greenAcqua}`,
    },

    acceptedFalse: {
        color: `${Themes.colors.redHot}`,
        borderBottomColor: `${Themes.colors.redHot}`,
        borderTopColor: `${Themes.colors.redHot}`,
    },

    acceptedDisabled: {
        color: `${Themes.colors.disabled}`,
        borderBottomColor: `${Themes.colors.disabled}`,
        borderTopColor: `${Themes.colors.disabled}`,
    },
});