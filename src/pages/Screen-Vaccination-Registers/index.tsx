// Importações
import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator, Text  } from "react-native";

// Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { SmallDetailsProfile } from "../../components/Small-Details-Profile";
import { RegisterVaccination } from "../../components/Register-Vaccination";
import { NoRecordView } from "../../components/No-Record-View";

// Testes
import { Vaccination } from "../../../utils/types/typeVaccinationRegister";

// Estilização
import { ContainerVaccinationRegister, VaccinationRegisterHeader, VaccinationRegisterList } from "./style";
import { Themes } from "../../../global/theme";

// UseContext
import { useUser } from "../../context/UserContext";

export const ScreenVaccinationRegisters = () => {
    const { userData, loadDataUser } = useUser();
    const [vaccinationRegister, setVaccinationRegister] = useState<Vaccination[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [noRecords, setNoRecords] = useState<boolean>(false);

    // Função de busca de registro de vacinação
    const searchVaccinationRegister = (vaccine: string) => {
        setSearchQuery(vaccine.toLowerCase());
    };

    //Função para retornar imagem (Caso mudar o axios, mudar aqui tbm)
    const handleImageProfileURI = (image: string | undefined) => {
        return `http://192.168.0.101:5000/images/${image}`;
    };

    // Pegando informações do usuário do banco de dados
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await loadDataUser();
            setIsLoading(false);
        };
        if (!userData) {
            fetchData();
        } else {
            setVaccinationRegister(userData.vaccination || []);

            if (userData && userData.image !== "Image not registered") {
                const urlImage = handleImageProfileURI(userData.image); //Capturando a imagem
    
                setProfileImage(userData.image ? urlImage : "");
            }
        }
    }, [userData, loadDataUser]);

    //Função para pesquisar nas vacinações do usuário
    useEffect(() => {
        setIsLoading(true);
    
        // Filtrar registros de vacinação com base na pesquisa
        const filteredRecords = searchQuery
            ? userData?.vaccination?.filter((register) =>
                register.vaccine.name?.toLowerCase().includes(searchQuery)
            ) || []
            : userData?.vaccination || [];
    
        // Atualizar estado com registros filtrados
        setVaccinationRegister(filteredRecords);
    
        // Atualizar estado de noRecords
        setNoRecords(filteredRecords.length === 0);
    
        // Parar carregamento
        setIsLoading(false);
    }, [searchQuery, userData]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ContainerVaccinationRegister>
                <VaccinationRegisterHeader>
                    <HeaderApresentation
                        title="Registro de Vacinação"
                        search={true}
                        placeholder="Pesquisar registro"
                        changeSubmit={searchVaccinationRegister}
                    />

                    <SmallDetailsProfile
                        userName={userData?.name}
                        userEmail={userData?.email}
                        profileImage={profileImage}
                    />
                </VaccinationRegisterHeader>

                {isLoading ? (
                    <ActivityIndicator size="large" color={`${Themes.colors.greenDark}`} />
                ) : (
                    <VaccinationRegisterList>
                        {noRecords ? (
                            <NoRecordView title="Nenhum registro encontrado"/>
                        ) : (
                            vaccinationRegister.map((content, index) => (
                                <RegisterVaccination
                                    key={index}
                                    nameVaccina={content.vaccine.name}
                                    dateVaccination={content.date}
                                    dosage={content.quantityApplied}
                                    description={content.vaccine.description}
                                />
                            ))
                        )}
                    </VaccinationRegisterList>
                )}

            </ContainerVaccinationRegister>
        </ScrollView>
    );
};
