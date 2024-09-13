//Importações
import React, { useState } from "react";
import { Image, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Validation
import { validationSchemaNewPassword } from "../../../global/validationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';

//Api
import { Api } from "../../connection/axios";
import { AxiosError } from "axios";

// Components
import { TouchButton } from "../../components/Touch-Button";
import { InputForm } from "../../components/Input-Form";
import { ModalComponent } from "../../components/Modal-Component";

//Styles
import { ContainerForm, NewPassordForm, ButtonSubmit, SignUpText, TouchSignUp } from "./style";
import { Themes } from "../../../global/theme";

//Imagens
import AsclepiusLogo from "../../../images/logo-color-cropped.png";

//Types
import { ModalType } from "../../../utils/types/typeModal";


export const ScreenNewPassword = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<ModalType>('successfulResetPassword'); // Estado para o tipo do modal

    //Constantes para controle do modal
    const handleOpenModal = () => setModalVisible(true); //Função para abrir o modal
    const handleCloseModal = () => setModalVisible(false); //Função para fechar o modal

    //Const da navegação
    const navigation = useNavigation();

    //Constante de validação
    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            userEmail: "",
            userPassword: "",
            userConfirmPassword: "",
        },
        resolver: yupResolver(validationSchemaNewPassword),
    });

    //Função de submmissão de formulário
    const onSubmit = async (data: {userEmail: string, userPassword: string, userConfirmPassword: string}) => {
        setLoading(true);

        try {
            const response = await Api.patch("/user/resetPassword", {
                email: data.userEmail,
                password: data.userPassword,
                confirmPassword: data.userConfirmPassword,
            });

            if (response.status === 200) {
                setModalType("successfulResetPassword");
            }else{
                setModalType("faliedResetPassword");
            }
        } catch (error) {
            console.log(error);
            setModalType("faliedResetPassword");
            handleResetPasswordErros(error);
        }finally{
            handleOpenModal();
            setLoading(false);
        }
    }

    //Função de erros
    const handleResetPasswordErros = (error: unknown) => {
        if (error instanceof AxiosError) {
            //Possíveis erros do backend
            const status = error.response?.status;
            const backendErrors = error.response?.data;

            if (status === 404 && backendErrors) {
                let errorMessage = String(backendErrors.error);
                
                //Há somente um erro do backend que a validação não consegue resolver por si só
                if (errorMessage.includes("Not existing user")) {
                    setError("userEmail", { //Se usuário não existir
                        message: "E-mail não existente"
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
        <ContainerForm>
            <Image source={AsclepiusLogo} style={{ width: "80%", resizeMode: "contain" }} />

            {loading && <ActivityIndicator size="large" color={`${Themes.colors.greenDark}`} />}

            <NewPassordForm>
                <Controller
                    control={control}
                    name="userEmail"
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
                {errors.userEmail && <Text style={{ color: `${Themes.colors.redHot}` }}>{errors.userEmail.message}</Text>}

                <Controller
                    control={control}
                    name="userPassword"
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
                {errors.userPassword && <Text style={{ color: `${Themes.colors.redHot}` }}>{errors.userPassword.message}</Text>}

                <Controller
                    control={control}
                    name="userConfirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputForm
                            icon="lock"
                            placeholder="Confirmar senha"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry={true}
                        />
                    )}
                />
                {errors.userConfirmPassword && <Text style={{ color: `${Themes.colors.redHot}` }}>{errors.userConfirmPassword.message}</Text>}

                <ButtonSubmit>
                    <TouchButton
                        styleType="buttonLargerSolid"
                        text="Redefinir senha"
                        onPress={handleSubmit(onSubmit)}
                    />
                </ButtonSubmit>
            </NewPassordForm>

            <SignUpText>
                Não tem uma conta ainda?
                <TouchSignUp onPress={() => navigation.navigate("SignUp")}>Cadastre-se!</TouchSignUp>
            </SignUpText>

            {/* Modal para opções */}
            <ModalComponent visible={modalVisible} onClose={handleCloseModal} typeModal={modalType} />

        </ContainerForm>
    )
}