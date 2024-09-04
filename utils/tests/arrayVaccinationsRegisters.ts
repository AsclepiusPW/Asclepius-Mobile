import { Vaccination } from "../types/typeVaccinationRegister";

// O exemplo server como se fosse o banco de dados
export const arrayVaccinationRegister: Vaccination[] = [
  {
    id: "1",
    date: "28/01/1998",
    quantityApplied: 1,
    vaccine: {
      id: "bcg-1",
      manufacturer: "Instituto Butantan",
      type: "Vacina contra tuberculose",
      name: "BCG 1° dose",
      description:
        "A vacina Bacilo Calmette-Guérin (BCG) é utilizada para ajudar na prevenção da tuberculose (TB).",
      observations:
        "Recomendada para recém-nascidos, preferencialmente até o primeiro mês de vida.",
    },
  },
  {
    id: "2",
    date: "01/02/1998",
    quantityApplied: 1,
    vaccine: {
      id: "hepb-1",
      manufacturer: "Sanofi Pasteur",
      type: "Vacina contra hepatite B",
      name: "Hepatite B 1° dose",
      description:
        "A vacina contra Hepatite B é administrada para prevenir a infecção pelo vírus da hepatite B.",
      observations:
        "Recomendada logo após o nascimento, com doses subsequentes aos 2 e 6 meses de idade.",
    },
  },
  {
    id: "3",
    date: "15/02/1998",
    quantityApplied: 1,
    vaccine: {
      id: "polio-1",
      manufacturer: "Sanofi Pasteur",
      type: "Vacina oral contra poliomielite (VOP)",
      name: "Poliomielite 1° dose",
      description:
        "A vacina contra poliomielite protege contra a poliomielite, uma doença que pode causar paralisia permanente.",
      observations:
        "Parte do calendário vacinal infantil, com doses aos 2, 4 e 6 meses de idade.",
    },
  },
  {
    id: "4",
    date: "01/03/1998",
    quantityApplied: 1,
    vaccine: {
      id: "penta-1",
      manufacturer: "Bio-Manguinhos",
      type: "Vacina pentavalente",
      name: "Pentavalente 1° dose",
      description:
        "A vacina pentavalente protege contra difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae tipo b.",
      observations:
        "Parte do calendário vacinal infantil, com doses aos 2, 4 e 6 meses de idade.",
    },
  },
];
