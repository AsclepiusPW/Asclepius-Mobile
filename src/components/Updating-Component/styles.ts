//importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        marginBottom: 30,
        display: "flex",
        alignItems: "center",
        backgroundColor: Themes.colors.bacgroundScreens,
    },

    contentUpdate: {
        width: "100%", 
        height: "100%", 
        display: "flex", 
        alignItems:"center", 
        justifyContent: "center"
    },

    contentText: {
        fontFamily: Themes.fonts.semiBold,
    }
})