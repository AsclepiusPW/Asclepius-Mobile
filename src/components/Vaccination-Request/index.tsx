//Importações
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Componentes
import { ItemVaccinationRequest } from "../Item-Vaccination-Request";

//Icones
import Icon from 'react-native-vector-icons/AntDesign';

//Estilizações
import { styles } from "./style";
import { Themes } from "../../../global/theme";

//Types
import { VaccinationRequest } from "../../../utils/types/typeVaccinationRequest";

//Props
interface props {
    requestVaccination?: VaccinationRequest[];
}

export const VaccinationRequestComponent: React.FC<props> = ({ requestVaccination }) => {
    //Const de navegação
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.containerApresentation}>
                <Text style={styles.apresentationText}>Solicitações de Vacinação</Text>


                <TouchableOpacity style={styles.buttonPress} onPress={() => navigation.navigate("VaccinationRequest")}>
                    <Text>Ver mais</Text>
                    <Icon name="pluscircleo" size={15} color={`${Themes.colors.black}`} />
                </TouchableOpacity>
            </View>

            <View style={styles.latestRequestVacination}>

                {requestVaccination && requestVaccination.length > 0 ? (
                    requestVaccination
                        .slice(-2) // Pega até os dois últimos elementos do array
                        .map((request, index) => (
                            <ItemVaccinationRequest
                                key={index}
                                place={request.calendar.local}
                                data={request.date}
                                responsible={request.calendar.responsible}
                                vacancies={request.calendar.places}
                                vaccine={request.calendar.vaccine.name}
                                accepted={request.status}
                        />
                        ))
                ) : (
                    <Text>Nenhuma solicitação encontrada</Text> // Mensagem alternativa se o array estiver vazio ou indefinido
                )}
            </View>
        </View>
    )
}