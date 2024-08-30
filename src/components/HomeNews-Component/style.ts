import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: 400,
        display: "flex",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 20,
        backgroundColor: `${Themes.colors.white}`,
        marginBottom: 5,
    },

    containerImage: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginBottom: 15,
    },
    
    image: {
        maxWidth: "100%",
        resizeMode: "contain",
    },

    contentInformation: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap:10
    },

    informationText: {
        fontFamily: `${Themes.fonts.bold}`,
        fontSize: 16,
        textAlign: "justify",
    },

    informationDescription: {
        textAlign: "left",
        maxWidth: "100%"
    }
});