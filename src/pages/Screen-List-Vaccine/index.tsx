import { ActivityIndicator, ScrollView, View } from "react-native";
import { HeaderApresentation } from "../../components/Header-Apresentation";
import React from "react";
import styles from "./style";
import VaccineRegister from "../../components/Vaccine-Register";
import { useEffect, useState } from "react";
import { infoVaccine } from "../../../utils/types/typeInfoVaccine";
import { Themes } from "../../../global/theme";
import { NoRecordView } from "../../components/No-Record-View";

//Api
import { Api } from "../../connection/axios";

export const ScreenListVaccine = () => { //Refatorando importação
  const [infoVaccines, setInfoVaccines] = useState<infoVaccine[]>([]); //Armazenar informações que seão listadas
  const [allVaccines, setAllVaccines] = useState<infoVaccine[]>([]); //Armazenar informações da API
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [noRecords, setNoRecords] = useState<boolean>(false);

  const searchInfoVaccines = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  //Vantagem dessa abordagem: A requisição a API é somente feita uma vez
  // Buscando as vacinas da API (requisição feita uma vez)
  useEffect(() => {
    const fetchVaccinesApi = async () => {
      try {
        setLoading(true);
        const response = await Api.get("/vaccine/");

        // Atualizando as informações
        setInfoVaccines(response.data); // Dados locais (são alterados)
        setAllVaccines(response.data); // Dados vindos da API (não são alterados)
        setNoRecords(response.data.length === 0);
      } catch (error) {
        console.log("Erro ao buscar as vacinas:", error);
        setNoRecords(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccinesApi();
  }, []); // Executa apenas ao montar o componente

  // Atualiza as informações com base na função de busca
  useEffect(() => {
    if (searchQuery === "") {
      // Se não houver pesquisa, exibe os dados da API
      setInfoVaccines(allVaccines);
      setNoRecords(allVaccines.length === 0);
    } else {
      // Filtra as vacinas com base no nome (pesquisa com os dados originais da API)
      const filteredVaccines = allVaccines.filter((info) =>
        info.name.toLowerCase().includes(searchQuery)
      );
      setInfoVaccines(filteredVaccines);
      setNoRecords(filteredVaccines.length === 0);
    }
  }, [searchQuery, allVaccines]);

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
                  idVaccine={content.id}
                />
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};