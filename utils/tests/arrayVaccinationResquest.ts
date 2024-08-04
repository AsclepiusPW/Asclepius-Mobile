import { VaccinationRequest } from "../types/typeVaccinationRequest"

//Exemplo de banco de dados para simular o banco de dados
export const arrayVaccinationRequest: VaccinationRequest[] = [
    {
        dateRequest: "22/01/2024",
        nameEvent: "Hospital Corréia Saraiva",
        dateEvent: "22/02/2024",
        vacanciesEvent: "45",
        statusEvent: "Não realizado",
        vaccineEvent: "BCG 1° dose",
        responseEvent: "approved",
        latitude: "-23.550520",
        longitude: "-46.633308"
    },
    {
        dateRequest: "25/01/2024",
        nameEvent: "Centro de Saúde Jardim Primavera",
        dateEvent: "25/02/2024",
        vacanciesEvent: "50",
        statusEvent: "Não realizado",
        vaccineEvent: "Hepatite B 1° dose",
        responseEvent: "approved",
        latitude: "-22.906847",
        longitude: "-43.172896"
    },
    {
        dateRequest: "28/01/2024",
        nameEvent: "Clínica São José",
        dateEvent: "28/02/2024",
        vacanciesEvent: "30",
        statusEvent: "Não realizado",
        vaccineEvent: "Poliomielite 1° dose",
        responseEvent: "approved",
        latitude: "-19.917299",
        longitude: "-43.934559"
    },
    {
        dateRequest: "02/02/2024",
        nameEvent: "Hospital Santa Maria",
        dateEvent: "02/03/2024",
        vacanciesEvent: "40",
        statusEvent: "Não realizado",
        vaccineEvent: "Pentavalente 1° dose",
        responseEvent: "denied",
        latitude: "-15.7801",
        longitude: "-47.9292"
    },
    {
        dateRequest: "05/02/2024",
        nameEvent: "UBS Vila Nova",
        dateEvent: "05/03/2024",
        vacanciesEvent: "35",
        statusEvent: "Não realizado",
        vaccineEvent: "Rotavírus 1° dose",
        responseEvent: "denied",
        latitude: "-22.970722",
        longitude: "-43.182365"
    },
    {
        dateRequest: "10/02/2024",
        nameEvent: "Hospital Central",
        dateEvent: "10/03/2024",
        vacanciesEvent: "25",
        statusEvent: "Não realizado",
        vaccineEvent: "Tríplice viral 1° dose",
        responseEvent: "denied",
        latitude: "-30.034647",
        longitude: "-51.217658"
    },
    {
        dateRequest: "15/02/2024",
        nameEvent: "Centro de Vacinação Municipal",
        dateEvent: "15/03/2024",
        vacanciesEvent: "20",
        statusEvent: "Não realizado",
        vaccineEvent: "BCG 1° dose",
        responseEvent: "noResponse",
        latitude: "-25.429596",
        longitude: "-49.271272"
    },
    {
        dateRequest: "20/02/2024",
        nameEvent: "Clínica de Imunização",
        dateEvent: "20/03/2024",
        vacanciesEvent: "60",
        statusEvent: "Não realizado",
        vaccineEvent: "Hepatite B 1° dose",
        responseEvent: "noResponse",
        latitude: "-1.45502",
        longitude: "-48.50237"
    }
] 