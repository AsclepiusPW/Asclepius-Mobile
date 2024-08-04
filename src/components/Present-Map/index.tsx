//Importações 
import React, {useState, useEffect} from "react";
import { View, Alert, StyleProp, ViewStyle } from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';

//Estilizações
import { styles } from "./style";

//props
interface props {
    latitude?: string,
    longitude?: string,
    pattent?: keyof typeof styles, //Se tem a possibilidade de reutiliza esse código estabelecendo uma nova estilização com novos valores
}

export const PresentMap:React.FC<props> = ({latitude, longitude, pattent = "container"}) => {
    const mapStyle = styles[pattent] as StyleProp<ViewStyle>; //Estilização 
    
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    // Seria interresante adicionar uma função para listar no mapa do usuário
    // uma lista de eventos próximos a sua localização

    //O ideal é que isso já seja pego ao adentrar o sistema, somente exemplo
    //Depois refatorar
    useEffect(() => {
        (async () => {
            if (!latitude || !longitude) {
                // Solicitar permissão de localização
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão negada', 'A permissão de localização é necessária para mostrar o mapa.');
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
        latitude: latitude ? parseFloat(latitude) : currentLocation?.latitude || 37.78825,
        longitude: longitude ? parseFloat(longitude) : currentLocation?.longitude || -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    
    return(
        <View style={mapStyle}>
            <MapView 
                style={styles.containerMapProfile}
                region={mapRegion}
                showsUserLocation={true}
            >
                {(latitude && longitude) || currentLocation ? (
                    <Marker
                        coordinate={{
                            latitude: latitude ? parseFloat(latitude) : currentLocation?.latitude || 0,
                            longitude: longitude ? parseFloat(longitude) : currentLocation?.longitude || 0,
                        }}
                        title="Minha Localização"
                    />
                ) : null}
            </MapView>
        </View>
    )
}