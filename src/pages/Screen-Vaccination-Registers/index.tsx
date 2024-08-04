//Importações
import { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator, Text  } from "react-native";

//Componentes
import { HeaderApresentation } from "../../components/Header-Apresentation";
import { SmallDetailsProfile } from "../../components/Small-Details-Profile";
import { RegisterVaccination } from "../../components/Register-Vaccination";
import { NoRecordView } from "../../components/No-Record-View";

//Testes
import { Vaccination } from "../../../utils/types/typeVaccinationRegister";
import { arrayVaccinationRegister } from "../../../utils/tests/arrayVaccinationsRegisters";

//Estelização
import { ContainerVaccinationRegister, VaccinationRegisterHeader, VaccinationRegisterList } from "./style";
import { Themes } from "../../../global/theme";

//props
interface props {
    userName?: string,
    userEmail?: string,
    userImage?: string,
}

export const ScreenVaccinationRegisters: React.FC<props> = ({ userName, userEmail, userImage }) => {

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

            </ContainerVaccinationRegister>

        </ScrollView>
    )
}