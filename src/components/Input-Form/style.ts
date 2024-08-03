// Importações
import { StyleSheet } from "react-native";
import { Themes } from "../../../global/theme";

export const styles = StyleSheet.create({
    inputContainer: {
        width: '85%',
        height: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 3,
        borderColor: `${Themes.colors.greenDark}`,
        color: `${Themes.colors.greenDark}`,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
    },
});