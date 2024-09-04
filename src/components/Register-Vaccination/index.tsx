//Importações
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

//Icons
import Icon from 'react-native-vector-icons/AntDesign';
import IconTitle from 'react-native-vector-icons/MaterialIcons';
import IconCalendar from 'react-native-vector-icons/FontAwesome5';

//Estilizações
import { styles } from "./style";
import { Themes } from "../../../global/theme";


//props
interface props {
    nameVaccina?: string,
    dateVaccination?: string,
    dosage?: number,
    description?: string,
}

export const RegisterVaccination: React.FC<props> = ({ nameVaccina, dateVaccination, dosage, description }) => {
    
    const formatDate = (dateString: string): string => {
        // Cria uma instância de Date a partir da string ISO
        const date = new Date(dateString);
    
        // Obtém o dia, mês e ano
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mês é 0 indexado, por isso adicionamos 1
        const year = date.getUTCFullYear();
    
        // Retorna no formato "DD/MM/YYYY"
        return `${day}/${month}/${year}`;
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.headerTitle}>
                    <IconTitle name="vaccines" size={28} color={`${Themes.colors.black}`} />
                    <Text style={styles.title}>{nameVaccina ? nameVaccina : "Nome da Vacina"}</Text>
                </View>

                <TouchableOpacity>
                    <Icon name="ellipsis1" size={28} color={`${Themes.colors.black}`} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerList}>
                <View style={styles.itemList}>
                    <View style={styles.headerTitle}>
                        <IconCalendar name="calendar-alt" size={20} color={`${Themes.colors.black}`} />
                        <Text style={styles.titleList}>Data:</Text>
                    </View>
                    
                    <Text style={styles.textList}>{dateVaccination ? formatDate(dateVaccination) : "00/ 00/ 0000"}</Text>
                </View>
            
                <View style={styles.itemList}>
                    <View style={styles.headerTitle}>
                        <IconTitle name="vaccines" size={22} color={`${Themes.colors.black}`} />
                        <Text style={styles.titleList}>Dosagem:</Text>
                    </View>
                    
                    <Text style={styles.textList}>{dosage ? dosage.toString() : "dose única"}</Text>
                </View>

                <View>
                    <View style={styles.headerTitle}>
                        <Icon name="medicinebox" size={20} color={`${Themes.colors.black}`} />
                        <Text style={styles.titleList}>Descrição:</Text>
                    </View>
                    
                    <Text style={styles.textListDescription}>{description ? description : "Descrição"}</Text>
                </View>
            </View>
        </View>
    )
}