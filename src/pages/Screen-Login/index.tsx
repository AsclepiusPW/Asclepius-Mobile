// Imports
import React, {useState} from "react";
import Yup from "yup";
import { View, Image, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

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


export const ScreenLogin = () => {
    const [modalVisible, setModalVisible] = useState(false);

    //Constantes para controle do modal
    const handleOpenModal = () => setModalVisible(true); //Função para abrir o modal
    const handleCloseModal = () => setModalVisible(false); //Função para fechar o modal

    //Const da navegação
    const navigation = useNavigation();

    //Constante de validação
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userEmail: "",
            userPassword: "",
        },
        resolver: yupResolver(LoginValidationSchema),
    });

    //Função de submisão de formulário
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
        ); //Após a validação e o envio da função, o app leva para a home
    };

    return (
        <ContainerLogin>
            <Image source={AsclepiusLogo} style={{ width: "80%", resizeMode: "contain" }} />

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
            <ModalComponent visible={modalVisible} onClose={handleCloseModal} typeModal="autenticadedSucessfull" />
        </ContainerLogin>
    );
}