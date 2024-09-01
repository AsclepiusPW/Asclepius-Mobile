// Imports
import React, {useState} from "react";
import Yup from "yup";
import { View, Image, Alert, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";

//Context
import { useAuth } from "../../context/AuthContext"; 

//Validation
import { LoginValidationSchema } from "../../../global/validationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';

// Components
import { TouchButton } from "../../components/Touch-Button";
import { InputForm } from "../../components/Input-Form";
import { ModalComponent } from "../../components/Modal-Component";

// Styles
import { LoginButtonSubmit, ContainerLogin, LoginForm, SignUpText, TouchSignUp } from "./style";
import { Themes } from "../../../global/theme";

//Imagens
import AsclepiusLogo from "../../../images/logo-color-cropped.png";

//Types
import { ModalType } from "../../../utils/types/typeModal";

export const ScreenLogin = () => {
    const {signIn} = useAuth(); //Context

    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<ModalType>('autenticadedSucessfull'); // Estado para o tipo do modal

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
        },
        resolver: yupResolver(LoginValidationSchema),
    });

    //Função de submisão de formulário
    const onSubmit = async (data: {userEmail: string, userPassword: string}) => {
        setLoading(true); //Carregar
        try {
            await signIn(data); // Chama a função signIn do contexto de autenticação
            setModalType("autenticadedSucessfull"); // Define o tipo de modal para sucesso
        } catch (error) {
            // Exibe um alerta em caso de falha
            setModalType('autenticadedFallied'); // Define o tipo de modal para falha
            handleLogInErrors(error);
        }finally {
            handleOpenModal();
            setLoading(false);
        }
    };

    //Função de controle de erros do backend
    const handleLogInErrors = (error: unknown) => {
        if (error instanceof Error) {
            const errorMessage = error.message;

            // Atualiza a mensagem de erro conforme necessário
            if (errorMessage.includes("Invalid")) {
                setError("userPassword", {
                    message: "Senha inválida"
                });
            } else if (errorMessage.includes("not exist")) {
                setError("userEmail", {
                    message: "Usuário não existe"
                });
            } else {
                // Exibe uma mensagem de erro genérica
                console.error("Erro desconhecido", errorMessage)
            }
        }
    }

    return (
        <ContainerLogin>
            <Image source={AsclepiusLogo} style={{ width: "80%", resizeMode: "contain" }} />

            {loading && <ActivityIndicator size="large" color={`${Themes.colors.greenDark}`}/>}

            <LoginForm>
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

                <LoginButtonSubmit>
                    <TouchButton
                        styleType="buttonLargerSolid"
                        text="Log In"
                        onPress={handleSubmit(onSubmit)}
                    />
                </LoginButtonSubmit>
            </LoginForm>
            
            <SignUpText>
                Não tem uma conta ainda? 
                <TouchSignUp onPress={() => navigation.navigate("SignUp")}>Cadastre-se!</TouchSignUp> 
            </SignUpText>

            {/* Modal para opções */}
            <ModalComponent visible={modalVisible} onClose={handleCloseModal} typeModal={modalType} />
        </ContainerLogin>
    );
}