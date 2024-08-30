//Importações
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

//Componentes
import { ItemVaccinationRequest } from "../Item-Vaccination-Request";

//Icones
import Icon from 'react-native-vector-icons/AntDesign';

//Estilizações
import { styles } from "./style";
import { Themes } from "../../../global/theme";

export const VaccinationRequest = () => {
    return(
        <View style={styles.container}>
            <View style={styles.containerApresentation}>
                <Text style={styles.apresentationText}>Solicitações de Vacinação</Text>

                
                <TouchableOpacity style={styles.buttonPress}>
                    <Text>Ver mais</Text>
                    <Icon name="pluscircleo" size={15} color={`${Themes.colors.black}`} />
                </TouchableOpacity>
            </View>

            <View style={styles.latestRequestVacination}>

                <ItemVaccinationRequest
                    // key="request one"
                    place="Hospital Arcanjo Gabriel"
                    data="02/ 08/ 2024"
                    responsible="Dr. Carlos Miguel"
                    vacancies="45"
                    vaccine="Vacinada da Gripe"
                    accepted={true}
                />

                <ItemVaccinationRequest/>
            </View>
        </View>
    )
}