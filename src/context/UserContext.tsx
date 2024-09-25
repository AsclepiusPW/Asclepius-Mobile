//Criando um contexto para armazenar as informações do usuário
//Importações
import React, {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Contexto de autenticação
import { useAuth } from "./AuthContext";

//Api
import { Api } from "../connection/axios";
import { AxiosError } from "axios";

//Type
import { User } from "../../utils/types/typeUser";

//Definição do contexto
interface UserContextData {
    userData: User | null;
    loadDataUser: () => Promise<void>;
    refreshingDataUser: () => Promise<void>;
    updateUser: (updateUser: User) => void;
}

//Criando o context
const UserContext = createContext<UserContextData>({} as UserContextData);

//Props
interface UserContextProps {
    children: React.ReactNode;
}

//Provedor do contexto
export const UserProvider:React.FC<UserContextProps> = ({children}) => {
    const {token} = useAuth();
    const [userData, setUserData] = useState<User | null>(null);

    //Função para carregar os dados do usuário
    const loadDataUser = async () => {
        try {
            //Primeiro procuar no storage
            const storedUser = await AsyncStorage.getItem("@user_data");
            if (storedUser) {
                //Salvando as informações
                setUserData(JSON.parse(storedUser));
            }else if (token){
                //Caso não no storage, e exista o token, pega na API
                const response = await Api.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                //Salvando as informações
                setUserData(response.data);
                await AsyncStorage.setItem("@user_data", JSON.stringify(response.data));
            }

        } catch (error) {
            handleUserError(error);
        }
    };

    //Função para atualização dos dados
    const updateUser = async (updateUser: User) => {
        setUserData(updateUser);
        await AsyncStorage.setItem("@user_data", JSON.stringify(updateUser));
    }

    //Função de refreshing
    const refreshingDataUser = async() => {
        try {
            if (token){
                //Busca as informações e atualiza as mesmas
                const response = await Api.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                //Salvando as informações
                setUserData(response.data);
                await AsyncStorage.setItem("@user_data", JSON.stringify(response.data));
            }
        } catch (error) {
            handleUserError(error);
        }
    }

    //Coletar dados automáticamente ao iniciar o APP, se o token existir
    useEffect(()=> {
        if (token) {
            loadDataUser();
        }
    }, [token]) //A função somente será chamada quando token estiver disponível

    return(
        <UserContext.Provider value={{userData, loadDataUser, updateUser, refreshingDataUser}}>
            {children}
        </UserContext.Provider>
    )
};

// Hook para acessar o contexto do usuário
export const useUser = () => {
    return useContext(UserContext);
};

//Função de erros
const handleUserError = (error: unknown) => {
    if (error instanceof AxiosError) {
        console.error("Erro ao coletar os dados do usuário", error.response?.data || error.message);
    } else {
        console.error("Erro inesperado ao coletar os dados do usuário", (error as Error).message);
    }
};