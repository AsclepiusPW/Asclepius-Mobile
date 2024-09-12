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
import { portApi } from "../../connection/axios"; //Caminho da Api

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
    const { token, checkTokenValidity } = useAuth(); //Buscando o token do usuário

    //States
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
            phoneUser: userData?.telefone || ''
        },
        resolver: yupResolver(validationSchema),
    });

    //Função para retornar imagem (Caso mudar o axios, mudar aqui tbm)
    const handleImageProfileURI = (image: string | undefined) => {
        return `${portApi}/images/${image}`; //Acessando a imagem da Api
    };

    // Função para carregar a imagem do perfil (depois atualizar)
    useEffect(() => {
        if (userData && userData.image !== "Image not registered") {
            const urlImage = handleImageProfileURI(userData.image); //Capturando a imagem

            setProfileImage(userData.image ? urlImage : "");
        }
    }, [userData]);

    //Função de enviar formulário
    const onSubmit = async (data: any) => {

        setLoading(true);
        if (!token) return;

        try {
            //Criando objeto de atualização de usuário
            const updateUserData: User = {
                name: data.nameUser,
                email: data.emailUser,
                telefone: data.phoneUser,
                password: userData?.password,
                latitude: userData?.latitude,
                longitude: userData?.longitude,
                image: userData?.image,
                requestReservation: userData?.requestReservation,
                vaccination: userData?.vaccination
            };

            await checkTokenValidity(token); //Validando que o token é válido

            const response = await Api.put("/user/update", updateUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                await updateUser(updateUserData); //Atualizar o histórico do user
                setModalType("successfulEdition");
            } else {
                setModalType("faliedEdition");
                Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
            }
        } catch (error) {
            setModalType("faliedEdition");
            handleUpdateUserErrors(error);
        } finally {
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
            const selectImageUri = result.assets[0].uri;
            setProfileImage(selectImageUri); //Se for permitido eu realizo o set da imagem

            try {
                // Enviar a imagem para o backend
                const response = await uploadImageToServer(selectImageUri);
                if (response && response.image) {
                    const urlImage = handleImageProfileURI(response.image); //Pegando a imagem
                    setProfileImage(urlImage); // Atualiza a imagem do perfil com a URL retornada
                }
            } catch (error) {
                Alert.alert('Erro ao enviar imagem', 'Não foi possível enviar a imagem para o servidor.');
            }

        } else if (result.canceled) {
            Alert.alert('Seleção de imagem cancelada');
        } else {
            Alert.alert('Erro ao selecionar imagem');
        }
    };

    //Função para realizar o envio da imagem da foto para a API
    const uploadImageToServer = async (imageURI: string) => {
        const formData = new FormData();

        //Criando um identificador para a imagem com date
        const dateUpload = Date.now();

        formData.append('image', {
            uri: imageURI,
            type: 'image/jpg',
            name: `profile-${dateUpload}.jpg`,
        } as any);

        if (!token) return;

        try {
            await checkTokenValidity(token); //Validando que o token é válido

            //Requisição
            const response = await Api.patch("/user/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                //Criando objeto de atualização de usuário
                const updateUserData: User = {
                    name: userData?.name,
                    email: userData?.email,
                    telefone: userData?.telefone,
                    password: userData?.password,
                    latitude: userData?.latitude,
                    longitude: userData?.longitude,
                    image: response.data.image,
                    requestReservation: userData?.requestReservation,
                    vaccination: userData?.vaccination,
                };

                await updateUser(updateUserData);
                setModalType("successfulEdition");
                
                return response.data; //Retornando a resposta do backend
            } else {
                setModalType("faliedEdition");
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            setModalType("faliedEdition");
            console.error('Error uploading image:', error);
            throw error;
        }finally{
            handleOpenModal();
        }
    }

    //Função para tratar erros da atualização vindo do backend
    const handleUpdateUserErrors = (error: unknown) => {
        if (error instanceof AxiosError) {
            //Possíveis erros do backend
            const status = error.response?.status;
            const backendErrors = error.response?.data;
            console.log(status, backendErrors);
            
            if (status === 409 && backendErrors) {
                let errorMessage = String(backendErrors.error);

                //Há somente dois erros do backend que a validação não consegue resolver por si só
                if (errorMessage.includes("e-mail")) {
                    setError("emailUser", { //Validação de e-mails duplicados
                        message: "E-mail já existente"
                    });
                } else {
                    setError("phoneUser", { //Validação de telefone duplicados
                        message: "Telefone já existente"
                    });
                }
            }
        } else {
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
                        <UpdatingComponent />
                    ) : (
                        <ContainerEditProfile>

                            <EditProfileHeader>
                                <SmallDetailsProfile 
                                    userEmail={userData?.email} 
                                    userName={userData?.name} 
                                    profileImage={profileImage} 
                                />

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