import { VaccinationRequest } from "../types/typeVaccinationRequest";

export const arrayVaccinationRequest: VaccinationRequest[] = [
    {
        id: "1",
        status: "Reservation approved",
        date: "22/01/2024",
        calendar: {
            id: "event1",
            local: "Hospital Corréia Saraiva",
            latitude: "-23.550520",
            longitude: "-46.633308",
            date: "22/02/2024",
            places: 45,
            status: "Não realizado",
            observation: "",
            responsible: "Dr. Carlos",
            vaccine: {
                id: "vaccine1",
                manufacturer: "Instituto Butantan",
                type: "Vacina contra tuberculose",
                name: "BCG 1° dose",
                description: "A vacina Bacilo Calmette-Guérin (BCG) é utilizada para ajudar na prevenção da tuberculose (TB).",
                contraindications: "Esta vacina é geralmente segura, mas indivíduos com sistemas imunológicos comprometidos ou alergias graves à vacina ou a qualquer um de seus componentes não devem recebê-la.",
                observations: "Recomendada para recém-nascidos, preferencialmente até o primeiro mês de vida.",
            }
        }
    },
    {
        id: "2",
        status: "Reservation approved",
        date: "25/01/2024",
        calendar: {
            id: "event2",
            local: "Centro de Saúde Jardim Primavera",
            latitude: "-22.906847",
            longitude: "-43.172896",
            date: "25/02/2024",
            places: 50,
            status: "Não realizado",
            observation: "",
            responsible: "Dr. Ana",
            vaccine: {
                id: "vaccine2",
                manufacturer: "Sanofi Pasteur",
                type: "Vacina contra hepatite B",
                name: "Hepatite B 1° dose",
                description: "A vacina contra o vírus da hepatite B é altamente eficaz na prevenção da infecção pelo vírus da hepatite B (HBV).",
                contraindications: "Pessoas com alergia grave à levedura de padeiro ou a qualquer outro componente da vacina não devem ser vacinadas.",
                observations: "Recomendada logo após o nascimento, com doses subsequentes aos 2 e 6 meses de idade.",
            }
        }
    }
];
