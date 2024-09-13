// Imports
import React, { useState, useEffect } from "react";
import Yup from "yup";
import * as Location from 'expo-location';
import { View, Image, Alert, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Contexto
import { useAuth } from "../../context/AuthContext";

//Axios
import { Api } from "../../connection/axios";
import { AxiosError } from "axios";

//Validação
import { SignUpValidation } from "../../../global/validationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, } from 'react-hook-form';

// Components
import { TouchButton } from "../../components/Touch-Button";
import { InputForm } from "../../components/Input-Form";
import { ModalComponent } from "../../components/Modal-Component";

// Styles
import { LoginButtonSubmit, ContainerLogin, LoginForm, SignUpText, TouchLogin } from "./style";
import { Themes } from "../../../global/theme";

//Types
import { ModalType } from "../../../utils/types/typeModal";

export const ScreenSignUp = () => {
    const { signIn } = useAuth(); //Importando a função de autenticação

    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<ModalType>('autenticadedSucessfull'); // Estado para o tipo do modal

    //Constantes para controle do modal
    const handleOpenModal = () => setModalVisible(true); //Função para abrir o modal
    const handleCloseModal = () => setModalVisible(false); //Função para fechar o modal

    //Constante de navegação
    const navigation = useNavigation();

    //Pegando a localização automaticamente
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    //Validação do formulário
    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            nameUser: '',
            emailUser: '',
            phoneUser: '',
            passwordUser: '',
        },
        resolver: yupResolver(SignUpValidation),
    });

    //Submisao do formulário
    const onSubmit = async (data: any) => {
        if (!currentLocation) {
            Alert.alert("Erro", "Não foi possível obter a localização");
            return;
        }

        setLoading(true);
        try {
            const response = await Api.post('/user/', {
                name: data.nameUser,
                email: data.emailUser,
                telefone: data.phoneUser,
                password: data.passwordUser,
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
            });

            if (response.status === 201) {
                await signIn({
                    userEmail: data.emailUser,
                    userPassword: data.passwordUser,
                });

                setModalType("autenticadedSucessfull");
                handleOpenModal();
            } else {
                Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
            }
        } catch (error) {
            handleSignUpErrors(error);   
        } finally {
            setLoading(false);
        }
    };

    //Pegar a latitude e longitude
    useEffect(() => {
        (async () => {
            if (!currentLocation?.latitude || !currentLocation.longitude) {
                // Solicitar permissão de localização
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão negada', 'A permissão de localização é necessária para mostrar o mapa.');
                    return;
                }

                // Obter a localização atual
                let location = await Location.getCurrentPositionAsync({});
                setCurrentLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }
        })();
    }, [currentLocation?.latitude, currentLocation?.longitude]);


    //Função de erros
    const handleSignUpErrors = (error: unknown) => {
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
            
            } else {
                Alert.alert("Erro", "Ocorreu um erro ao criar a conta. Tente novamente.");
            }
        } else {
            console.error("Erro inesperado:", (error as Error).message);
            Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
    }

    return (
        <ContainerLogin>

            {loading && <ActivityIndicator size="large" color={`${Themes.colors.greenDark}`} />}

            <LoginForm>
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
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry={true}
                        />
                    )}
                />
                {errors.passwordUser && <Text style={{ color: `${Themes.colors.redHot}` }}>{errors.passwordUser.message}</Text>}

                <LoginButtonSubmit>
                    <TouchButton
                        styleType="buttonLargerSolid"
                        text="Criar Conta"
                        onPress={handleSubmit(onSubmit)}
                    />
                </LoginButtonSubmit>
            </LoginForm>

            <SignUpText>
                Já tem uma conta?
                <TouchLogin onPress={() => navigation.navigate("Login")}>Faça Log-In!</TouchLogin>
            </SignUpText>
            {/* Modal para opções */}
            <ModalComponent visible={modalVisible} onClose={handleCloseModal} typeModal="autenticadedSucessfull" />

        </ContainerLogin>
    );
}