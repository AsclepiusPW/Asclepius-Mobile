// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 'auto',
        minHeight: 70,
        maxHeight: 130,
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 20,
        justifyContent: 'center',
    },
    
    headerApresentation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 20,
        fontFamily: `${Themes.fonts.bold}`,
    },

    textHomePage: {
        fontSize: 20,
        fontFamily: Themes.fonts.bold,
        width: "60%",
    },

    textSpan: {
        color: Themes.colors.white
    },
    
    inputDev: {
        width: '100%',
        marginTop: 12,
        paddingHorizontal: 10,
        borderRadius: 12,
        gap: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `${Themes.colors.white}`,
    },

    input: {
        width: '90%',
        paddingVertical: 8,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: '80%',
        height: 410,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Themes.colors.white,
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});
