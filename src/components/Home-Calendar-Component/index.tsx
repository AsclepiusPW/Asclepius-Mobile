//Importações
import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Components
import CalendarComponent from "../../components/Calendar-Component";

//Icones
import Icon from 'react-native-vector-icons/AntDesign';

//Estilização
import { ComponentCalendar, ListTitle, Title, ButtonPress, ContentCalendar, FooterContent } from "./style";
import { Themes } from "../../../global/theme";

//Test
import { arrayEvent } from "../../../utils/tests/arrayEvent";

export const HomeCalendarComponent = () => {
    //Constante de navegação
    const navigation = useNavigation();

    const [dateEvent, setDateEvent] = useState<string[]>(
        arrayEvent.map((event) => event.dateEvent)
    );

    return (
        <ComponentCalendar>
            <ListTitle>
                <Title>Calendário</Title>

                <ButtonPress onPress={ () => navigation.navigate("ListEvents")}>
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