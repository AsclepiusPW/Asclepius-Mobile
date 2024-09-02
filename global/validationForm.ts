import * as Yup from 'yup';


export const validationSchema = Yup.object().shape({
    nameUser: Yup.string().required('Nome é obrigatório'),
    emailUser: Yup.string().email('Email inválido').required('Email é obrigatório'),
    phoneUser: Yup.string().matches(/^(\+\d{1,2}\s?)?(\()?\d{2,4}(\))?\s?(\d{4,5}(-|\s)?\d{4})$/, 'Telefone inválido').required('Telefone é obrigatório'),
});

export const LoginValidationSchema = Yup.object().shape({
    userEmail: Yup.string().email('Email inválido').required('Email é obrigatório'),
    userPassword: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

export const SignUpValidation = Yup.object().shape({
    nameUser: Yup.string().required('Nome é obrigatório'),
    emailUser: Yup.string().email('Email inválido').required('Email é obrigatório'),
    phoneUser: Yup.string().matches(/^(\+\d{1,2}\s?)?(\()?\d{2,4}(\))?\s?(\d{4,5}(-|\s)?\d{4})$/, 'Telefone inválido').required('Telefone é obrigatório'),
    passwordUser: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    latitudeUser: Yup.number().optional(),
    longitudeUser: Yup.number().optional(),
});

export const validationSchemaNewPassword = Yup.object().shape({
    userEmail: Yup.string().email('Email inválido').required('Email é obrigatório'),
    userPassword: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    userConfirmPassword: Yup.string().oneOf([Yup.ref('userPassword')], 'As senhas devem ser iguais').required('Confirmação de senha é obrigatória'),
});