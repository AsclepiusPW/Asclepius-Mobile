import { Vaccination } from "../types/typeVaccinationRegister"

//O exemplo server como se fosse o banco de dados
export const arrayVaccinationRegister: Vaccination[] = [
    {
        nameVaccina: "BCG 1° dose",
        dateVaccination: "28/01/1998",
        dosage: "Primeira dose",
        description: "A vacina Bacilo Calmette-Guérin (BCG) é utilizada para ajudar na prevenção da tuberculose (TB)."
    },
    {
        nameVaccina: "Hepatite B 1° dose",
        dateVaccination: "01/02/1998",
        dosage: "Primeira dose",
        description: "A vacina contra Hepatite B é administrada para prevenir a infecção pelo vírus da hepatite B."
    },
    {
        nameVaccina: "Poliomielite 1° dose",
        dateVaccination: "15/02/1998",
        dosage: "Primeira dose",
        description: "A vacina contra poliomielite protege contra a poliomielite, uma doença que pode causar paralisia permanente."
    },
    {
        nameVaccina: "Pentavalente 1° dose",
        dateVaccination: "01/03/1998",
        dosage: "Primeira dose",
        description: "A vacina pentavalente protege contra difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae tipo b."
    },
    {
        nameVaccina: "Rotavírus 1° dose",
        dateVaccination: "15/03/1998",
        dosage: "Primeira dose",
        description: "A vacina contra rotavírus é utilizada para proteger contra infecções causadas pelo rotavírus, que pode causar diarreia grave em crianças."
    },
    {
        nameVaccina: "Tríplice viral 1° dose",
        dateVaccination: "01/04/1998",
        dosage: "Primeira dose",
        description: "A vacina tríplice viral protege contra sarampo, caxumba e rubéola."
    }
]
