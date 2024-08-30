// Imports
import React, {useState, useEffect} from "react";
import Yup from "yup";
import * as Location from 'expo-location';
import { View, Image, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Validação
import { SignUpValidation } from "../../../global/validationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';

// Components
import { TouchButton } from "../../components/Touch-Button";
import { InputForm } from "../../components/Input-Form";
import { ModalComponent } from "../../components/Modal-Component";

// Styles
import { LoginButtonSubmit, ContainerLogin, LoginForm, SignUpText, TouchLogin } from "./style";
import { Themes } from "../../../global/theme";

//Imagens
import AsclepiusLogo from "../../../images/logo-color-cropped.png";


export const ScreenSignUp = () => {
    const [modalVisible, setModalVisible] = useState(false);

    //Constantes para controle do modal
    const handleOpenModal = () => setModalVisible(true); //Função para abrir o modal
    const handleCloseModal = () => setModalVisible(false); //Função para fechar o modal

    //Constante de navegação
    const navigation = useNavigation();

    //Pegando a localização automaticamente
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    //Validação do formulário
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nameUser:  '',
            emailUser:  '',
            phoneUser:  '',
            passwordUser: '',
        },
        resolver: yupResolver(SignUpValidation),
    });

    //Submisao do formulário
    const onSubmit = (data: any) => {
        Alert.alert(
            'Formulário enviado com sucesso!',
            JSON.stringify(data),
            [
                {
                    text: 'OK',
                    onPress: () => {
                        handleOpenModal();
                    }
                }
            ]
        );
        console.log(currentLocation?.latitude, currentLocation?.longitude);
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

    return (
        <ContainerLogin>
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