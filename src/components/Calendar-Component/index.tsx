import React from "react";
import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import styles from "./style";

type Props = {
  date?: string[]; // Array de datas no formato 'YYYY-MM-DD'
  onMonthChange ?: (month: string) => void; //Detectar mudança do mês
};

const CalendarComponent = ({ date, onMonthChange }: Props) => {
  // Filtra as datas pelo mês atual
  const filterDatesByMonth = (dates: string[] | undefined) => {
    if (!dates) return {};

    const markedDates: {
      [key: string]: { customStyles: {} };
    } = {};

    dates.forEach((date) => {
      const dateMonth = date.slice(0, 7); // Extrai 'YYYY-MM' da data

      if (dateMonth) {
        markedDates[date] = {
          customStyles: {
            container: {
              backgroundColor: "#05E9AC", // Cor de fundo do marcador
              borderRadius: 20, // Torna o marcador circular ou arredondado
              width: 32, // Largura do marcador
              maxHeight: 32, // Altura do marcador
              justifyContent: "center",
              alignItems: "center",
            },
            text: {
              color: "white", // Cor do texto da data
              fontWeight: "bold", // Peso do texto
            },
          },
        };
      }
    });

    return markedDates;
  };

  // Pega o mês atual (ou o mês que você deseja filtrar)
  // const currentMonth = new Date().toISOString().slice(0, 7); // 'YYYY-MM'

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markingType="custom"
        markedDates={filterDatesByMonth(date)}
        onMonthChange={(month: DateData) => onMonthChange?.(month.dateString.slice(0, 7))} // Captura o mês 'YYYY-MM'
      />
    </View>
  );
};

export default CalendarComponent;
