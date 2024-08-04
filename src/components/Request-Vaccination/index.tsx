//Importações
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

//Componentes
import { PresentMap } from "../Present-Map";
import { VaccinationRequest } from "../../../utils/types/typeVaccinationRequest";

//Icones
import Icon from 'react-native-vector-icons/AntDesign';
import IconPeople from 'react-native-vector-icons/FontAwesome';
import IconVaccine from 'react-native-vector-icons/MaterialIcons';
import IconCalendar from 'react-native-vector-icons/FontAwesome5';

//Estilização
import { styles } from "./style";
import { Themes } from "../../../global/theme";

export const RequestVaccination: React.FC<VaccinationRequest> = ({ dateEvent, dateRequest, latitude, longitude, nameEvent, responseEvent, statusEvent, vacanciesEvent, vaccineEvent }) => {
    //Código para a edição do componente
    let contentStyle;
    let contentText;

    if (responseEvent === 'approved') {
        contentStyle = styles.acceptedTrue;
        contentText = 'Aprovada';
    } else if (responseEvent === 'denied') {
        contentStyle = styles.acceptedFalse;
        contentText = 'Negado';
    } else {
        contentStyle = styles.acceptedDisabled;
        contentText = 'Não respondido';
    }
    
    return (
        <View style={styles.containerRequest}>
            <View style={styles.requestHeader}>
                <Text style={[styles.requestHeaderTitle, contentStyle]}>Solicitação - {dateRequest ? dateRequest : "00/ 00/ 0000"}</Text>
            </View>

            <View style={styles.requestMap}>
                <PresentMap
                    latitude={latitude}
                    longitude={longitude}
                    pattent="containerMediumPattent"
                />
            </View>

            <View style={styles.requestDetails}>
                <Text style={styles.detailsTitle}>{nameEvent ? nameEvent : "Nome do evento"}</Text>

                <View style={styles.containerList}>
                    <View style={styles.itemList}>
                        <View style={styles.listHeaderTitle}>
                            <IconCalendar name="calendar-alt" size={20} color={`${Themes.colors.black}`} />
                            <Text style={styles.titleList}>Data:</Text>
                        </View>

                        <Text style={styles.textList}>{dateEvent ? dateEvent : "00/ 00/ 0000"}</Text>
                    </View>

                    <View style={styles.itemList}>
                        <View style={styles.listHeaderTitle}>
                            <IconPeople name="users" size={20} color={`${Themes.colors.black}`} />
                            <Text style={styles.titleList}>Vagas:</Text>
                        </View>

                        <Text style={styles.textList}>{vacanciesEvent ? vacanciesEvent : "00"}</Text>
                    </View>

                    <View style={styles.itemList}>
                        <View style={styles.listHeaderTitle}>
                            <IconCalendar name="archive" size={20} color={`${Themes.colors.black}`} />
                            <Text style={styles.titleList}>Status:</Text>
                        </View>

                        <Text style={styles.textList}>{statusEvent ? statusEvent : "Não informado"}</Text>
                    </View>

                    <View style={styles.itemList}>
                        <View style={styles.listHeaderTitle}>
                            <IconVaccine name="vaccines" size={20} color={`${Themes.colors.black}`} />
                            <Text style={styles.titleList}>Vacina:</Text>
                        </View>

                        <Text style={styles.textList}>{vaccineEvent ? vaccineEvent : "Não informado"}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.bottomContent, contentStyle]}>
            <Text style={[styles.contentAccepted, contentStyle]}>
                {contentText}
            </Text>
        </View>
        </View>
    )
}