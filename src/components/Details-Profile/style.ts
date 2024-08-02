// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 'auto',
        backgroundColor: `${Themes.colors.white}`,
        borderRadius: 20,
    },

    containerDetails: {
        height: 270,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circleDetails: {
        height: 115,
        width: 115,
        borderRadius: 100,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: `${Themes.colors.white}`,
        backgroundColor: `${Themes.colors.greenSpringTiny}`,
    },

    circleImage: {
        maxHeight: 110,
        maxWidth: 110,
        borderRadius:100,
    },
    
    textDetails: {
        textAlign: 'center',
        fontFamily: `${Themes.fonts.bold}`,
        fontSize: 18,
    },

    userNameText:{
        color: `${Themes.colors.white}`,
    },

    informationProfileContainer:{
        width: '100%',
        height: 325,
        paddingHorizontal: 25,
        paddingVertical: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    informationProfileHeader:{
        width: '100%',
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    textHeader: {
        fontSize: 15,
        fontFamily: `${Themes.fonts.bold}`,
    },

    informationProfileContent: {
        width: '90%',
        height: '80%',
        paddingHorizontal: 15,
        gap: 14,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})