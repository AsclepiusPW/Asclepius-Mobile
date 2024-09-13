//Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

//Método para os buttons
export const styles = StyleSheet.create({

    notificationContainer: {
        position: 'absolute',
        width: "65%",
        right: 0,
        top: 10,
        alignItems: 'center',
        zIndex: 9999, // Certifica-se de que está sobre os outros elementos
    },

    messageEvent: {
        width: "100%",
        height: 50,
        backgroundColor: Themes.colors.white,
        borderTopLeftRadius: 15, 
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    messageText: {
        color: Themes.colors.black,
        fontSize: 16,
    },

    progressBar: {
        height: 4,
        width: "100%",
        backgroundColor: Themes.colors.greenDark,
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomLeftRadius: 20,
    },

});
