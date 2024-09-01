//Importações
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';

//Context
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

//API
import { Api } from "../../connection/axios";
import { AxiosError } from "axios";

//Types
import { ModalType } from "../../../utils/types/typeModal";

//Validação de formulário
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from "../../../global/validationForm";

//Componentes
import { SmallDetailsProfile } from "../../components/Small-Details-Profile";
import { TouchButton } from "../../components/Touch-Button";
import { InputForm } from "../../components/Input-Form";
import { ModalComponent } from "../../components/Modal-Component";
import { UpdatingComponent } from "../../components/Updating-Component";

//Estilização
import { ContainerEditProfile, EditProfileHeader, EditProfileForm, ContainerButtonSubmmit } from "./style";
import { Themes } from "../../../global/theme";
import { User } from "../../../utils/types/typeUser";

export const ScreenEditProfile = () => {
    const { userData, loadDataUser, updateUser } = useUser(); //Buscando dados do usuário
    const { token } = useAuth(); //Buscando o token do usuário

    const [profileImage, setProfileImage] = useState<string | null>(null); //State para armazenar a aimagem
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false); 
    const [modalType, setModalType] = useState<ModalType>('successfulEdition'); // Estado para o tipo do modal

    //Constantes para controle do modal
    const handleOpenModal = () => setModalVisible(true); //Função para abrir o modal
    const handleCloseModal = () => setModalVisible(false); //Função para fechar o modal

    //Pegando informações do usuário do banco de dados
    useEffect(() => {
        if (!userData) {
            setLoading(true);
            loadDataUser();
            setLoading(false)
        }
    }, [userData]);

    //Validação do formulário
    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            nameUser: userData?.name || '',
            emailUser: userData?.email || '',
            phoneUser: userData?.telefone || '',
            passwordUser: '', //Senha mantida como vazia
        },
        resolver: yupResolver(validationSchema),
    });

    // Função para carregar a imagem do perfil (depois atualizar)
    // useEffect(() => {
    //     if (userData && userData.image) {
    //         setProfileImage(userData.image);
    //     }
    // }, [userData]);

    //Função de enviar formulário
    const onSubmit = async (data: any) => {

        setLoading(true);
        try {
            //Criando objeto de atualização de usuário
            const updateUserData: User = {
                name: data.nameUser,
                email: data.emailUser,
                telefone: data.phoneUser,
                latitude: userData?.latitude,
                longitude: userData?.longitude,
            };

            //Tratamento da senha
            if (data.passwordUser) { //Se alterar no formulário
                updateUserData.password = data.passwordUser
            }else{ //Caso não alterar
                updateUserData.password = userData?.password
            };

            const response = await Api.put("/user/update", updateUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (response.status === 201) {
                await updateUser(updateUserData); //Atualizar o histórico do user
            }else{
                setModalType("faliedEdition");
                Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
            }
        } catch (error) {
            setModalType("faliedEdition");
            handleUpdateUserErrors(error);
        }finally{
            setLoading(false);
            handleOpenModal();
        }
    };

    //Função para pegar uma imagem do dispositivo
    const handleSelectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ //Padrão da biblioteca, dúvida? Lê a documentação
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri); //Se for permitido eu realizo o set da imagem
        } else if (result.canceled) {
            Alert.alert('Seleção de imagem cancelada');
        } else {
            Alert.alert('Erro ao selecionar imagem');
        }
    };

    //Função para realizar o envio da imagem da foto para a API
    

    //Função para tratar erros da atualização vindo do backend
    const handleUpdateUserErrors = (error: unknown) => {
        if (error instanceof AxiosError) {
            //Possíveis erros do backend
            const status = error.response?.status;
            const backendErrors = error.response?.data;

            if (status === 409 && backendErrors) {
                let errorMessage = String(backendErrors.error);
                
                //Há somente dois erros do backend que a validação não consegue resolver por si só
                if (errorMessage.includes("e-mail")) {
                    setError("emailUser", { //Validação de e-mails duplicados
                        message: "E-mail já existente"
                    });
                }else{
                    setError("phoneUser", { //Validação de telefone duplicados
                        message: "Telefone já existente"
                    });
                }
            }
        } else{
            console.error("Erro inesperado:", (error as Error).message);
            Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80} // Ajuste o valor conforme necessário
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {
                    loading ? (
                        <UpdatingComponent/>
                    ):(
                        <ContainerEditProfile>

                            <EditProfileHeader>
                                <SmallDetailsProfile profileImage={profileImage} />

                                <TouchButton text="Editar imagem" styleType="buttonSmallSolid" onPress={handleSelectImage} />
                            </EditProfileHeader>

                            <EditProfileForm>
                                <Controller
                                    control={control}
                                    name="nameUser"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputForm
                                            icon="user"
                                            placeholder="Nome de Usuário"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.nameUser && <Text style={{ color: `${Themes.colors.redHot}` }}>{errors.nameUser.message}</Text>}

                                <Controller
                                    control={control}
                                    name="emailUser"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputForm
                                            icon="envelope-o"
                                            placeholder="Email"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            keyboardType="email-address"
                                        />
                                    )}
                                />
                                {errors.emailUser && <Text style={{ color: `${Themes.colors.redHot}` }}>{errors.emailUser.message}</Text>}

                                <Controller
                                    control={control}
                                    name="phoneUser"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputForm
                                            icon="phone"
                                            placeholder="Telefone"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            keyboardType="phone-pad"
                                        />
                                    )}
                                />
                                {errors.phoneUser && <Text style={{ color: `${Themes.colors.redHot}` }}>{errors.phoneUser.message}</Text>}

                                <Controller
                                    control={control}
                                    name="passwordUser"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputForm
                                            icon="lock"
                                            placeholder="Senha"
                                            value={value || ""}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            secureTextEntry={true}
                                        />
                                    )}
                                />
                                {errors.passwordUser && <Text style={{ color: `${Themes.colors.redHot}` }}>{errors.passwordUser.message}</Text>}

                                <ContainerButtonSubmmit>
                                    <TouchButton text="Editar" styleType="buttonLargerSolid" onPress={handleSubmit(onSubmit)} />
                                </ContainerButtonSubmmit>
                            </EditProfileForm>

                            {/* Modal para opções */}
                            <ModalComponent visible={modalVisible} onClose={handleCloseModal} typeModal={modalType} />
                        </ContainerEditProfile>
                    )
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
};