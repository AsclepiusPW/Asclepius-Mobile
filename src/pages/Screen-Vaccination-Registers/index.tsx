//Importações
import { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator, Text  } from "react-native";

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { SmallDetailsProfile } from "../../components/Small-Details-Profile";
import { RegisterVaccination } from "../../components/Register-Vaccination";
import { NoRecordView } from "../../components/No-Record-View";

//Estelização
import { ContainerVaccinationRegister, VaccinationRegisterHeader, VaccinationRegisterList } from "./style";
import { Themes } from "../../../global/theme";

//props
interface props {
    userName?: string,
    userEmail?: string,
    userImage?: string,
}

//type Vaccination
type Vaccination = {
    nameVaccina?: string,
    dateVaccination?: string,
    dosage?: string,
    description?: string,
}

export const ScreenVaccinationRegisters: React.FC<props> = ({ userName, userEmail, userImage }) => {
    //O exemplo server como se fosse o banco de dados
    const arrayVaccinationRegister: Vaccination[] = [
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

    // Estado inicial dos registros de vacinação
    const [vaccinationRegister, setVaccinationRegister] = useState<Vaccination[]>(arrayVaccinationRegister);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noRecords, setNoRecords] = useState<boolean>(false);

    // Função de busca de registro de vacinação
    const searchVaccinationRegister = (vaccine: string) => {
        setSearchQuery(vaccine.toLowerCase());
    };

    // Atualizar o estado de vaccinationRegister quando searchQuery mudar
    useEffect(() => {
        setIsLoading(true);
        setNoRecords(false);
        setTimeout(() => {
            if (searchQuery === '') {
                setVaccinationRegister(arrayVaccinationRegister);
                setNoRecords(false);
            } else {
                const searchRegister = arrayVaccinationRegister.filter((register) =>
                    register.nameVaccina?.toLowerCase().includes(searchQuery)
                );
                setVaccinationRegister(searchRegister);
                setNoRecords(searchRegister.length === 0);
            }
            setIsLoading(false);
        }, 1000); // Simula um tempo de carregamento
    }, [searchQuery]);

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
                        userName={userName}
                        userEmail={userEmail}
                        userImage={userImage}
                    />
                </VaccinationRegisterHeader>

                <VaccinationRegisterList>

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
                                    nameVaccina={content.nameVaccina}
                                    dateVaccination={content.dateVaccination}
                                    dosage={content.dosage}
                                    description={content.description}
                                />
                            ))
                        )}
                    </VaccinationRegisterList>
                )}

                </VaccinationRegisterList>

            </ContainerVaccinationRegister>

        </ScrollView>
    )
}