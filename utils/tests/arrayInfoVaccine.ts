import { infoVaccine } from "../types/typeInfoVaccine";

export const arrayInfoVaccines: infoVaccine[] = [
  {
    description:
      "A vacina contra a febre amarela é utilizada para prevenir a infecção pelo vírus da febre amarela, que pode causar febre alta e complicações graves.",
    contraindications:
      "Indivíduos com alergia grave a ovos, ou com sistemas imunológicos comprometidos, não devem receber esta vacina.",
    manufacturer: "Bio-Manguinhos",
    type: "Vacina contra febre amarela",
    title: "Febre Amarela",
    observations:
      "Recomendada para pessoas que vivem ou viajam para áreas de risco. Geralmente, uma única dose é suficiente para imunidade ao longo da vida.",
  },
  {
    description:
      "A vacina contra varicela protege contra a varicela, uma doença viral altamente contagiosa que causa erupções cutâneas e febre.",
    contraindications:
      "Indivíduos com alergia grave à gelatina ou à neomicina, ou aqueles que são imunocomprometidos, não devem receber esta vacina.",
    manufacturer: "Merck & Co.",
    type: "Vacina contra varicela",
    title: "Varicela",
    observations:
      "Recomendada para crianças entre 12 a 15 meses de idade, com uma segunda dose entre 4 a 6 anos de idade.",
  },
  {
    description:
      "A vacina pneumocócica conjugada é utilizada para prevenir infecções graves causadas pela bactéria Streptococcus pneumoniae, como pneumonia, meningite e bacteremia.",
    contraindications:
      "Indivíduos com alergia grave a qualquer componente da vacina ou que já tiveram uma reação alérgica grave a uma dose anterior não devem ser vacinados.",
    manufacturer: "Pfizer",
    type: "Vacina pneumocócica conjugada",
    title: "Pneumocócica",
    observations:
      "Recomendada para crianças menores de 2 anos, adultos com mais de 65 anos, e pessoas com certas condições médicas.",
  },
  {
    description:
      "A vacina contra hepatite A é utilizada para prevenir a infecção pelo vírus da hepatite A, que pode causar inflamação do fígado.",
    contraindications:
      "Indivíduos com alergia grave a qualquer componente da vacina não devem ser vacinados.",
    manufacturer: "GlaxoSmithKline",
    type: "Vacina contra hepatite A",
    title: "Hepatite A",
    observations:
      "Recomendada para todas as crianças com 1 ano de idade, bem como para adultos que viajam para áreas onde a hepatite A é comum.",
  },
  {
    description:
      "A vacina contra a COVID-19 ajuda a prevenir infecções graves e mortes causadas pelo coronavírus.",
    contraindications:
      "Indivíduos com alergia grave a qualquer componente da vacina ou que tiveram uma reação alérgica grave a uma dose anterior não devem receber a vacina.",
    manufacturer: "Pfizer-BioNTech",
    type: "Vacina contra COVID-19",
    title: "Covid-19",
    observations:
      "A vacina está disponível para todos os maiores de 12 anos. É recomendada a dose de reforço após seis meses.",
  },
  {
    description:
      "A vacina Bacilo Calmette-Guérin (BCG) é utilizada para ajudar na prevenção da tuberculose (TB).",
    contraindications:
      "Esta vacina é geralmente segura, mas indivíduos com sistemas imunológicos comprometidos ou alergias graves à vacina ou a qualquer um de seus componentes não devem recebê-la.",
    manufacturer: "Instituto Butantan",
    type: "Vacina contra tuberculose",
    title: "BCG 1° dose",
    observations:
      "Recomendada para recém-nascidos, preferencialmente até o primeiro mês de vida.",
  },
  {
    description:
      "A vacina contra sarampo, caxumba e rubéola (tríplice viral) protege contra três doenças altamente contagiosas.",
    contraindications:
      "Indivíduos com alergia grave à gelatina, neomicina, ou aqueles que são imunocomprometidos, não devem receber esta vacina.",
    manufacturer: "Fundação Oswaldo Cruz (Fiocruz)",
    type: "Vacina tríplice viral",
    title: "Sarampo",
    observations:
      "Parte do calendário vacinal infantil. Deve ser administrada em duas doses, a primeira aos 12 meses de idade.",
  },
  {
    description:
      "A vacina contra o vírus da hepatite B é altamente eficaz na prevenção da infecção pelo vírus da hepatite B (HBV).",
    contraindications:
      "Pessoas com alergia grave à levedura de padeiro ou a qualquer outro componente da vacina não devem ser vacinadas.",
    manufacturer: "Sanofi Pasteur",
    type: "Vacina contra hepatite B",
    title: "Hepatite B",
    observations:
      "Recomendada logo após o nascimento, com doses subsequentes aos 2 e 6 meses de idade.",
  },
  {
    description:
      "A vacina contra o vírus do papiloma humano (HPV) ajuda a proteger contra infecções causadas por cepas de HPV associadas ao câncer cervical e outras condições.",
    contraindications:
      "Indivíduos que tiveram uma reação alérgica grave a uma dose anterior da vacina ou a qualquer um de seus componentes não devem recebê-la.",
    manufacturer: "Merck & Co.",
    type: "Vacina contra HPV",
    title: "HPV",
    observations:
      "Disponível para meninas e meninos a partir dos 9 anos. Protege contra cânceres causados pelo HPV.",
  },
  {
    description:
      "A vacina contra influenza (gripe) é utilizada para prevenir infecções por vírus influenza, que podem causar doenças respiratórias graves.",
    contraindications:
      "Indivíduos com alergia grave a ovos, ou que tiveram uma reação alérgica grave a uma dose anterior da vacina, devem evitar a vacinação.",
    manufacturer: "GSK (GlaxoSmithKline)",
    type: "Vacina contra influenza",
    title: "Influenza",
    observations:
      "Recomendada anualmente, especialmente para idosos, crianças pequenas e pessoas com doenças crônicas.",
  },
  {
    description:
      "A vacina contra meningite C protege contra infecções causadas pela bactéria Neisseria meningitidis do grupo C, que pode causar meningite e septicemia.",
    contraindications:
      "Indivíduos com histórico de reação alérgica grave a qualquer componente da vacina ou que já tiveram uma reação alérgica grave a uma dose anterior não devem receber esta vacina.",
    manufacturer: "Novartis",
    type: "Vacina contra meningite C",
    title: "Meningite C",
    observations:
      "Parte do calendário de vacinação infantil. Também recomendada para adolescentes e adultos jovens.",
  },
  {
    description:
      "A vacina contra poliomielite (VOP) é utilizada para prevenir a poliomielite, uma doença viral altamente contagiosa que pode causar paralisia.",
    contraindications:
      "Indivíduos com alergia grave a qualquer componente da vacina ou que já tiveram uma reação alérgica grave a uma dose anterior não devem ser vacinados.",
    manufacturer: "Sanofi Pasteur",
    type: "Vacina oral contra poliomielite (VOP)",
    title: "Poliomielite",
    observations:
      "Administração em gotas. Parte do calendário vacinal infantil, com doses aos 2, 4 e 6 meses de idade.",
  },
];
