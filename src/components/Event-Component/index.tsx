//Imports
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Styles
import styles from "./style";

//Types
import { Event } from "../../../utils/types/typeEvent";

//Components
import { PresentMap } from "../Present-Map";
import TextComponent from "../Text-Component";

//Props
type prop = {
  idEvent: string;
  vaccine: string;
  date: string,
  places: number,
  local: string,
  latitude?: string,
  longitude?: string,
};

const EventComponent = ({
  idEvent,
  vaccine,
  date,
  places,
  local,
  latitude,
  longitude,
}: prop) => {
  //Contante de navegação
  const navigation = useNavigation();

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
    <TouchableOpacity style={styles.container} onPress={()=> navigation.navigate("DetailsEvent", {idEvent: idEvent})}>
      <View style={{ marginLeft: 20 }}>
        <PresentMap
          zoomEnable={false}
          scrollEnable={false}
          showLocationButtom={false}
          pattent="mapEvent"
          latitude={latitude}
          longitude={longitude}
        />
      </View>

      <View style={styles.informations}>
        <TextComponent title={local} />
        <TextComponent subTitle="Vacina" iconName="syringe" text={vaccine} />
        <TextComponent
          iconName="calendar"
          subTitle="Data"
          text={formatDate(date)}
        />
        <TextComponent iconName="user" subTitle="Vagas" text={`${places}`} />
      </View>
    </TouchableOpacity>
  );
};

export default EventComponent;
