// Imports
import React from "react";
import Yup from "yup";
import { View, Image, Alert, Text } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { LoginValidationSchema } from "../../../global/validationForm";
import { yupResolver } from "@hookform/resolvers/yup";

// Components
import { TouchButton } from "../../components/Touch-Button";
import { InputForm } from "../../components/Input-Form";

// Styles
import { LoginButtonSubmit, ContainerLogin, LoginForm, SignUpText } from "./style";
import AsclepiusLogo from "../../../images/logo-color-cropped.png";
import { Themes } from "../../../global/theme";




export const ScreenLogin = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userEmail: "",
            userPassword: "",
        },
        resolver: yupResolver(LoginValidationSchema),
    });

    const onSubmit = (data: any) => {
        Alert.alert('Formulário enviado com sucesso!', JSON.stringify(data));
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
            <SignUpText>Não tem uma conta ainda? Cadastre-se!</SignUpText>
        </ContainerLogin>
    );
}