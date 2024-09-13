//Importações
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

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
import { Api } from "../../connection/axios";

//Types
type eventType = "Reservation approved" | "Reservation denied" | "Reservation requested";

//Props
interface props {
    idEvent: string,
    dateEvent: string,
    dateRequest: string,
    latitude: string,
    longitude: string,
    nameEvent: string,
    responseEvent: eventType,
    statusEvent: string,
    vacanciesEvent: number,
    vaccineEvent: string,
    onRemove: (value: boolean) => void;
}

//Contextos
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

export const RequestVaccination: React.FC<props> = ({ idEvent, dateEvent, dateRequest, latitude, longitude, nameEvent, responseEvent, statusEvent, vacanciesEvent, vaccineEvent, onRemove }) => {
    //Usando os contextos
    const { token } = useAuth();
    const { userData, updateUser } = useUser();

    //Remoção de um solicitação
    const handleRemoverRequestEvent = async () => {
        try {
            const response = await Api.delete(`/reservation/remove/${idEvent}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
                }
            });

            if (response.status === 200) {
                onRemove(true);
                await handleUpdateRequestEventsUser();
                console.log("Evento removido com o id: ", idEvent)
            }
        } catch (error) {
            console.error("Erro ao remover reserva:", error);
        }
    }

    //Função para atualização do dados do usuário
    const handleUpdateRequestEventsUser = async () => {
        try {
            const response = await Api.get("/reservation", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Status correto para a obtenção de dados
                updateUser({
                    ...userData, // Atualiza todos os campos do usuário
                    requestReservation: response.data,
                });
            }
        } catch (error) {
            console.log("Um erro encontrado ao buscar os dados do usuário: ", error);
        }
    };

    //Edição de date
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

    //Código para a edição do componente
    let contentStyle;
    let contentText;

    if (responseEvent === 'Reservation approved') {
        contentStyle = styles.acceptedTrue;
        contentText = 'Aprovada';
    } else if (responseEvent === 'Reservation denied') {
        contentStyle = styles.acceptedFalse;
        contentText = 'Negado';
    } else {
        contentStyle = styles.acceptedDisabled;
        contentText = 'Não respondido';
    }

    return (
        <View style={styles.containerRequest}>
            <View style={[styles.requestHeader, contentStyle]}>
                <Text style={[styles.requestHeaderTitle, contentStyle]}>Solicitação - {dateRequest ? formatDate(dateRequest) : "00/ 00/ 0000"}</Text>

                {responseEvent !== "Reservation approved" && (
                    <TouchableOpacity onPress={() => handleRemoverRequestEvent()}>
                        <IconVaccine name="delete" size={25} color={`${Themes.colors.black}`} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.requestMap}>
                <PresentMap
                    latitude={latitude}
                    longitude={longitude}
                    scrollEnable={false}
                    zoomEnable={false}
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

                        <Text style={styles.textList}>{dateEvent ? formatDate(dateEvent) : "00/ 00/ 0000"}</Text>
                    </View>

                    <View style={styles.itemList}>
                        <View style={styles.listHeaderTitle}>
                            <IconPeople name="users" size={20} color={`${Themes.colors.black}`} />
                            <Text style={styles.titleList}>Vagas:</Text>
                        </View>

                        <Text style={styles.textList}>{vacanciesEvent ? vacanciesEvent.toString() : "00"}</Text>
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