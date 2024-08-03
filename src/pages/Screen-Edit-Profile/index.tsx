//Importações
import { useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

//Validação de formulário
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from "../../../global/validationForm";

//Componentes
import { SmallDetailsProfile } from "../../components/Small-Details-Profile";
import { TouchButton } from "../../components/Touch-Button";
import { InputForm } from "../../components/Input-Form";

//Estilização
import { ContainerEditProfile, EditProfileHeader, EditProfileForm, ContainerButtonSubmmit } from "./style";
import { Themes } from "../../../global/theme";

//props
interface props {
    userName?: string,
    userEmail?: string,
    userPhone?: string,
    userPassword?: string,
    userImage?: string,
}

export const ScreenEditProfile: React.FC<props> = ({ userName, userEmail, userPassword, userPhone, userImage }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null); //State para armazenar a aimagem
    
    //Validação do formulário
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nameUser: userName || '',
            emailUser: userEmail || '',
            phoneUser: userPhone || '',
            passwordUser: userPassword || '',
        },
        resolver: yupResolver(validationSchema),
    });

    //Função de enviar formulário
    const onSubmit = (data: any) => {
        Alert.alert('Formulário enviado com sucesso!', JSON.stringify(data));
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

    return (
        <ContainerEditProfile>

            <EditProfileHeader>
                <SmallDetailsProfile profileImage={profileImage} />

                <TouchButton text="Editar imagem" styleType="buttonSmallSolid" onPress={handleSelectImage}/>
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
                            value={value}
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
        </ContainerEditProfile>
    )
}