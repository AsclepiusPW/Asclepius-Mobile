//Importações
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation"
import { DetailsProfile } from "../../components/Details-Profile";
import { PresentMap } from "../../components/Present-Map";
import { VaccinationRequest } from "../../components/Vaccination-Request";
import { UpdatingComponent } from "../../components/Updating-Component";

//Estilização
import { ContainerProfile } from "./style"

//Contexto
import { useUser } from "../../context/UserContext";

export const ScreenProfile = () => {
    const { userData, loadDataUser } = useUser();

    const [loading, setLoading] = useState<boolean>(false);
    
    //Pegando informações do usuário do banco de dados
    useEffect(() => {
        if (!userData) {
            setLoading(true);
            loadDataUser();
            setLoading(false)
        }
    }, [userData]);

    return (
        <ScrollView>
            {
                loading ? (
                    <UpdatingComponent/>
                ) : (
                    <ContainerProfile>

                        <HeaderApresentation
                            title={"Perfil"}
                        />

                        <DetailsProfile
                            userImage={userData && userData.image === "Image not registered" ? "" : userData?.image}
                            userEmail={userData ? userData.email : "User Not found"}
                            userName={userData ? userData.name : "User Not found"}
                            userPhone={userData ? userData.telefone : "User Not found"}
                        />

                        <PresentMap
                            zoomEnable={false}
                            scrollEnable={false}
                            latitude={userData && userData.latitude !== undefined ? userData.latitude.toString() : ""}
                            longitude={userData && userData.longitude !== undefined ? userData.longitude.toString() : ""}
                        />

                        { //Atualizar 
                            userData?.requestReservation && (
                                <VaccinationRequest />
                            ) 
                        }
                    </ContainerProfile>
                )}
        </ScrollView>
    )
}
