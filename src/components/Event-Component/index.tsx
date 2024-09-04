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
  vaccine: string;
  date: string,
  places: number,
  local: string,
  latitude?: string,
  longitude?: string,
};

const EventComponent = ({
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
    // Espera-se que a string esteja no formato "YYYY-MM-DD"
    const [year, month, day] = dateString.split("-");

    // Retorna no formato "DD/MM/YYYY"
    return `${day}/${month}/${year}`;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={()=> navigation.navigate("DetailsEvent")}>
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
