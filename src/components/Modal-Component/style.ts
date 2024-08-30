//Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo semi-transparente
    },

    modalContent: {
        width: '80%',
        height: 450,
        backgroundColor: Themes.colors.white,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center",
        gap: 30,
    },

    touchCloseIcon: {
        position: "absolute",
        right: 20,
        top: 20,
    },

    modalCircle: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderColor: Themes.colors.greenAcqua,
        borderWidth: 4,
        backgroundColor: Themes.colors.disabled,
        alignItems: "center",
        justifyContent: "center",
    },

    contentModel: {
        width: "80%",
        height: "auto",
    },

    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
        fontFamily: Themes.fonts.semiBold,
    },

    modalSmallText: {
        textAlign: "center",
        marginBottom: 20,
    },

    modalViewChoises: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        justifyContent: "space-around",
    }
});