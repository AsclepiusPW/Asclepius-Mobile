//Importações
import { View, Text } from "react-native";

//Estlização
import { styles } from "./style";

//props
interface props {
    data?: string,
    place?: string,
    vaccine?: string,
    vacancies?: string,
    responsible?: string,
    accepted?: boolean
}

export const ItemVaccinationRequest: React.FC<props> = ({ data, place, responsible, vacancies, vaccine, accepted }) => {
    return (
        <View style={styles.containerItem}>
            <View style={styles.content}>
                <Text style={[styles.contentTitle, accepted ? styles.acceptedTrue : styles.acceptedFalse]}>Solicitação - {data ? data : "00/ 00/ 0000"}</Text>

                <View style={[styles.listContent, accepted ? styles.acceptedTrue : styles.acceptedFalse]}>
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
            
            { accepted && accepted === true ? (
                <Text style={[styles.contentAccepted, accepted ? styles.acceptedTrue : styles.acceptedFalse]}>Aprovada</Text>
            ): (
                <Text style={[styles.contentAccepted, accepted ? styles.acceptedTrue : styles.acceptedFalse]}>Negada</Text>
            )}
        </View>
    )
}