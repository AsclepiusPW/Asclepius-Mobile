import { ActivityIndicator, ScrollView, View } from "react-native";
import { HeaderApresentation } from "../../components/Header-Apresentation";
import React from "react";
import styles from "./style";
import VaccineRegister from "../../components/Vaccine-Register";
import { useEffect, useState } from "react";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";
import { arrayInfoVaccines } from "../../../utils/tests/arrayInfoVaccine";
import { Themes } from "../../../global/theme";
import { NoRecordView } from "../../components/No-Record-View";

export const ScreenListVaccine = () => { //Refatorando importação
  const [infoVaccines, setInfoVaccines] =
    useState<infoVaccine[]>(arrayInfoVaccines);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);

  const searchInfoVaccines = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  useEffect(() => {
    setLoading(true);
    setNoRecords(false);

    setTimeout(() => {
      if (searchQuery === "") {
        setInfoVaccines(arrayInfoVaccines);
        setNoRecords(false);
      } else {
        const searchInfoVaccines = arrayInfoVaccines.filter((info) =>
          info.name.toLowerCase().includes(searchQuery)
        );

        setInfoVaccines(searchInfoVaccines);
        setNoRecords(searchInfoVaccines.length === 0);
      }
      setLoading(false);
    }, 1000);
  }, [searchQuery]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerApresentation}>
          <HeaderApresentation
            search={true}
            title="Vacinas Registradas"
            placeholder="Pesquisar vacinas..."
            changeSubmit={searchInfoVaccines}
          />
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={`${Themes.colors.greenDark}`}
          />
        ) : (
          <View style={styles.viewList}>
            {noRecords ? (
              <NoRecordView title="Nenhum Evento Encontrado" />
            ) : (
              infoVaccines.map((content, index) => (
                <VaccineRegister
                  key={index}
                  manufacturer={content.manufacturer}
                  name={content.name}
                  type={content.type}
                />
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};