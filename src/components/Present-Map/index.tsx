//Importações
import React, { useState, useEffect } from "react";
import { View, Alert, StyleProp, ViewStyle } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import marker from "../../../images/doctor.png";

//Estilizações
import { styles } from "./style";

//Contextos
import { userEvent } from "../../context/EventContext";
import { Event } from "../../../utils/types/typeEvent";
import { Themes } from "../../../global/theme";

//Types
type eventMark = {
  id: string,
  latitude: number,
  longitude: number,
  title: string,
}

//props
interface props {
  latitude?: string;
  longitude?: string;
  zoomEnable?: boolean;
  scrollEnable?: boolean;
  showLocationButtom?: boolean;
  events?: Event[];
  pattent?: keyof typeof styles; //Se tem a possibilidade de reutiliza esse código estabelecendo uma nova estilização com novos valores
}

export const PresentMap: React.FC<props> = ({ latitude, longitude, zoomEnable = true, scrollEnable = true, showLocationButtom = true, pattent = "container", events }) => {
  const navigate = useNavigation();

  const mapStyle = styles[pattent] as StyleProp<ViewStyle>; //Estilização

  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number; } | null>(null);

  useEffect(() => {
    (async () => {
      if (!latitude || !longitude) {
        // Solicitar permissão de localização
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão negada",
            "A permissão de localização é necessária para mostrar o mapa."
          );
          return;
        }

        // Obter a localização atual
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, [latitude, longitude]);

  const mapRegion = {
    latitude: latitude
      ? parseFloat(latitude)
      : currentLocation?.latitude || 37.78825,
    longitude: longitude
      ? parseFloat(longitude)
      : currentLocation?.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={mapStyle}>
      <MapView
        style={styles.containerMapProfile}
        region={mapRegion}
        showsUserLocation={true}
        zoomEnabled={zoomEnable}
        scrollEnabled={scrollEnable}
        showsMyLocationButton={showLocationButtom}
      >
        {(latitude && longitude) || currentLocation ? (
          <Marker
            coordinate={{
              latitude: latitude
                ? parseFloat(latitude)
                : currentLocation?.latitude || 0,
              longitude: longitude
                ? parseFloat(longitude)
                : currentLocation?.longitude || 0,
            }}
            title="Minha Localização"
          />
        ) : null}

        {/* Exibir os eventos próximos como marcadores */}
        {events &&
          events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: parseFloat(event.latitude),
                longitude: parseFloat(event.longitude),
              }}
              title={event.local}
              onPress={() => navigate.navigate("DetailsEvent", {idEvent: event.id})}
              icon={marker}
            />
          ))}
      </MapView>
    </View>
  );
};
