import { Event } from "../types/typeEvent";

export const arrayEvent: Event[] = [
  {
    id: "1",
    local: "Posto de Saúde Central",
    latitude: "-23.550520",
    longitude: "-46.633308",
    date: "2024-08-20",
    places: 50,
    status: "Scheduled",
    observation: "First dose",
    responsible: "Dr. João Silva",
    vaccine: {
      id: "v1",
      manufacturer: "Pfizer",
      type: "mRNA",
      name: "Covid-19",
      description: "Vaccine for Covid-19",
      contraindications: "Allergy to any component",
      observations: "Two doses required"
    }
  },
  {
    id: "2",
    local: "Posto de Saúde Central",
    latitude: "-23.550520",
    longitude: "-46.633308",
    date: "2024-08-27",
    places: 40,
    status: "Scheduled",
    observation: "Annual vaccine",
    responsible: "Dr. João Silva",
    vaccine: {
      id: "v2",
      manufacturer: "Sanofi",
      type: "Inactivated",
      name: "Influenza",
      description: "Flu vaccine",
      contraindications: "Severe allergy to egg proteins",
      observations: "Administered annually"
    }
  },
  {
    id: "3",
    local: "Posto de Saúde Central",
    latitude: "-23.550520",
    longitude: "-46.633308",
    date: "2024-09-03",
    places: 35,
    status: "Scheduled",
    observation: "First dose",
    responsible: "Dr. João Silva",
    vaccine: {
      id: "v3",
      manufacturer: "GSK",
      type: "Recombinant",
      name: "Hepatite B",
      description: "Hepatitis B vaccine",
      contraindications: "None known",
      observations: "Three doses required"
    }
  },
  {
    id: "4",
    local: "Posto de Saúde Central",
    latitude: "-23.550520",
    longitude: "-46.633308",
    date: "2024-09-10",
    places: 25,
    status: "Scheduled",
    observation: "First dose",
    responsible: "Dr. João Silva",
    vaccine: {
      id: "v4",
      manufacturer: "Bio-Manguinhos",
      type: "Live attenuated",
      name: "Febre Amarela",
      description: "Yellow Fever vaccine",
      contraindications: "Immunosuppression",
      observations: "Single dose"
    }
  },
];
