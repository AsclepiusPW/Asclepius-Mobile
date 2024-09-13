//Arquivo de configuração do contexto de autenticação

//Importações
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//API
import { Api } from "../connection/axios";
import { AxiosError } from "axios";

//Definição do contexto
interface AuthContextData {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
    loading: boolean;
    signIn(data: { userEmail: string; userPassword: string }): Promise<void>;
    signOut(): void;
    checkTokenValidity(token: string): Promise<void>;
};

//Criando o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//Props
interface propsContext {
    children: React.ReactNode;
}

//Provedor do contexto
export const AuthProvider: React.FC<propsContext> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); //Commeça carregando para verificar se o usuário está autenticado
    const isAuthenticated = !!user;

    useEffect(() => {
        //Buscar o token no AsyncStorage quando o APP for iniciado
        const loadStorageData = async () => {
            const storedToken = await AsyncStorage.getItem('@user_token');
            const storedUser = await AsyncStorage.getItem('@user_name');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(storedUser);

                Api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                
                // Verifica a validade do token
                await checkTokenValidity(storedToken);
            }
            
            setLoading(false); //Termina de carregar após a verificação da autenticação do usuário
        }

        loadStorageData();
    }, []);

    //Função para verificar a validade do token Só posso fazer a função se o token existir
    const checkTokenValidity = async (token: string) => {
        try {
            const response = await Api.get('/user/authentication/isValid', {
                headers: {
                    Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
                }
            });
    
            if (response.status === 200) {
                // Token é válido, nada a fazer
                return;
            } else if (response.status === 401) {
                // Token inválido, fazer logout
                await signOut();
            } else {
                // Outros erros de status
                throw new Error(`Erro ao verificar o token: ${response.status}`);
            }
        } catch (error) {
            const errorMessage = handleAuthContxtErrors(error);
            // Exibe a mensagem de erro ou toma outras ações se necessário
            await signOut(); // Desconecta o usuário em caso de erro
        }
    };

    //Função de login
    const signIn = async (data: { userEmail: string; userPassword: string }) => {
        try {
            const response = await Api.post('/user/authentication', {
                email: data.userEmail,
                password: data.userPassword,
            });

            const { token } = response.data;
            const userName = response.data.user?.name;

            await AsyncStorage.setItem('@user_token', token);
            await AsyncStorage.setItem('@user_name', userName);

            setToken(token);
            setUser(userName);

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        } catch (error) {
            const errorMessage = handleAuthContxtErrors(error);
            throw new Error(errorMessage); // Propaga a mensagem de erro formatada
        }
    };

    //Função de sair
    const signOut = async () => {
        await AsyncStorage.removeItem('@user_token');
        await AsyncStorage.removeItem('@user_name');
        await AsyncStorage.removeItem('@user_data'); //Remove dados do usuário

        setToken(null);
        setUser(null);

        delete Api.defaults.headers.common['Authorization'];
    };

    //Função de erros
    const handleAuthContxtErrors = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response) {
                if (error.response.status === 401) {
                    signOut(); // Desconecta o usuário em caso de erro de autenticação
                }
                // Erro de resposta do servidor
                return error.response.data.error || 'Erro ao realizar a autenticação';
            } else if (error.request) {
                // Erro de rede
                console.error("Erro de rede:", error.request);
                return 'Erro de rede ao realizar a autenticação';
            } else {
                // Erro desconhecido
                console.error("Erro desconhecido:", error.message);
                return 'Erro desconhecido ao realizar a autenticação';
            }
        }
        return 'Erro desconhecido ao realizar a autenticação';
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, token, user, loading, checkTokenValidity }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook para acessar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};