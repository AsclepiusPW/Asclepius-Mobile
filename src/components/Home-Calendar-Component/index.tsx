//Importações
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Components
import CalendarComponent from "../../components/Calendar-Component";

//Icones
import Icon from 'react-native-vector-icons/AntDesign';

//Estilização
import { ComponentCalendar, ListTitle, Title, ButtonPress, ContentCalendar, FooterContent } from "./style";
import { Themes } from "../../../global/theme";

//EventContext
import { userEvent } from "../../context/EventContext";

export const HomeCalendarComponent = () => {
    //Constante de eventos
    const { eventData } = userEvent();

    //Constante de navegação
    const navigation = useNavigation();

    const [dateEvent, setDateEvent] = useState<string[]>([]);

    useEffect(() => {
        if (eventData.length > 0) {
            // Convertendo as datas para o formato 'YYYY-MM-DD'
            const dateEvents = eventData.map((event) =>
                event.date.slice(0, 10) // Extrai a parte da data 'YYYY-MM-DD'
            );
            setDateEvent(dateEvents);
        }else{
            setDateEvent([]);
        }
    }, [eventData]);

    return (
        <ComponentCalendar>
            <ListTitle>
                <Title>Calendário</Title>

                <ButtonPress onPress={() => navigation.navigate("ListEvents")}>
                    <Text>Ver mais</Text>
                    <Icon name="pluscircleo" size={15} color={`${Themes.colors.black}`} />
                </ButtonPress>

            </ListTitle>

            <ContentCalendar>
                <CalendarComponent date={dateEvent} />
            </ContentCalendar>

            <FooterContent>
                <Text>Clique para ver mais</Text>
            </FooterContent>
        </ComponentCalendar>
    )
}