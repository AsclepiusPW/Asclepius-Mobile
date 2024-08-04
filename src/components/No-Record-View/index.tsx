//Importações
import { View, Text  } from "react-native";

//Estelização
import { styles } from "./style";
import { Themes } from "../../../global/theme";

//Icones
import Icon from 'react-native-vector-icons/AntDesign';

//props
interface props {
    title?: string
}

export const NoRecordView:React.FC<props> = ({title}) => {
    return(
        <View style={styles.container}>
            <Icon name="disconnect" size={60} color={`${Themes.colors.greenDark}`} />
            
            <Text style={styles.containerText}>{title ? title : "Nenhuma informação encontrada"}</Text>
        </View>
    )
}