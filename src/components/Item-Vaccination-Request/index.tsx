//Importações
import { View, Text } from "react-native";
import React from "react";

//Estlização
import { styles } from "./style";

//Types
type eventType = "Reservation approved" | "Reservation denied" | "Reservation requested";

//props
interface props {
    data?: string,
    place?: string,
    vaccine?: string,
    vacancies?: number,
    responsible?: string,
    accepted?: eventType
}

export const ItemVaccinationRequest: React.FC<props> = ({ data, place, responsible, vacancies, vaccine, accepted }) => {
    
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

    // Determina o estilo baseado no valor de accepted
    const getStatusStyle = () => {
        if (accepted === "Reservation approved") {
            return styles.acceptedTrue;
        } else if (accepted === "Reservation denied") {
            return styles.acceptedFalse;
        } else if (accepted === "Reservation requested") {
            return styles.acceptedResquested; // Ou qualquer outro estilo desejado
        }
        return {}; // Retorna um objeto vazio se não houver estilo correspondente
    };

    return (
        <View style={styles.containerItem}>
            <View style={styles.content}>
                <Text style={[styles.contentTitle, getStatusStyle()]}>Solicitação - {data ? formatDate(data) : "00/ 00/ 0000"}</Text>

                <View style={[styles.listContent, getStatusStyle()]}>
                    <Text style={styles.listContentTitle}>
                        Local: 
                        <Text style={styles.listContentText}>{place ? place : "Hospital Leôncio Sampaio"}</Text>
                    </Text>

                    <Text style={styles.listContentTitle}>
                        Vacina: 
                        <Text style={styles.listContentText}>{vaccine ? vaccine : "Hepatite A"}</Text>
                    </Text>

                    <Text style={styles.listContentTitle}>
                        Vagas: 
                        <Text style={styles.listContentText}>{vacancies ? vacancies : "25"}</Text>
                    </Text>

                    <Text style={styles.listContentTitle}>
                        Responsável: 
                        <Text style={styles.listContentText}>{responsible ? responsible : "Dr. Miguel Santos"}</Text>
                    </Text>
                </View>
            </View>
            
            { accepted === "Reservation requested" ? (
                <Text style={[styles.contentAccepted, styles.acceptedResquested]}>Solicitada</Text>
            ) : accepted === "Reservation approved" ? (
                <Text style={[styles.contentAccepted, styles.acceptedTrue]}>Aprovada</Text>
            ) : (
                <Text style={[styles.contentAccepted, styles.acceptedFalse]}>Negada</Text>
            )}
        </View>
    )
}