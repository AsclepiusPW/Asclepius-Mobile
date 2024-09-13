import { infoVaccine } from "../types/typeInfoVaccine";

export const arrayInfoVaccines: infoVaccine[] = [
  {
    id: "1",
    description:
      "A vacina contra a febre amarela é utilizada para prevenir a infecção pelo vírus da febre amarela, que pode causar febre alta e complicações graves.",
    contraindications:
      "Indivíduos com alergia grave a ovos, ou com sistemas imunológicos comprometidos, não devem receber esta vacina.",
    manufacturer: "Bio-Manguinhos",
    type: "Vacina contra febre amarela",
    name: "Febre Amarela",
    observations:
      "Recomendada para pessoas que vivem ou viajam para áreas de risco. Geralmente, uma única dose é suficiente para imunidade ao longo da vida.",
  },
  {
    id: "2",
    description:
      "A vacina contra varicela protege contra a varicela, uma doença viral altamente contagiosa que causa erupções cutâneas e febre.",
    contraindications:
      "Indivíduos com alergia grave à gelatina ou à neomicina, ou aqueles que são imunocomprometidos, não devem receber esta vacina.",
    manufacturer: "Merck & Co.",
    type: "Vacina contra varicela",
    name: "Varicela",
    observations:
      "Recomendada para crianças entre 12 a 15 meses de idade, com uma segunda dose entre 4 a 6 anos de idade.",
  },
  {
    id: "3",
    description:
      "A vacina pneumocócica conjugada é utilizada para prevenir infecções graves causadas pela bactéria Streptococcus pneumoniae, como pneumonia, meningite e bacteremia.",
    contraindications:
      "Indivíduos com alergia grave a qualquer componente da vacina ou que já tiveram uma reação alérgica grave a uma dose anterior não devem ser vacinados.",
    manufacturer: "Pfizer",
    type: "Vacina pneumocócica conjugada",
    name: "Pneumocócica",
    observations:
      "Recomendada para crianças menores de 2 anos, adultos com mais de 65 anos, e pessoas com certas condições médicas.",
  },
  {
    id: "4",
    description:
      "A vacina contra a COVID-19 ajuda a prevenir infecções graves e mortes causadas pelo coronavírus.",
    contraindications:
      "Indivíduos com alergia grave a qualquer componente da vacina ou que tiveram uma reação alérgica grave a uma dose anterior não devem receber a vacina.",
    manufacturer: "Pfizer-BioNTech",
    type: "Vacina contra COVID-19",
    name: "Covid-19",
    observations:
      "A vacina está disponível para todos os maiores de 12 anos. É recomendada a dose de reforço após seis meses.",
  },
];
