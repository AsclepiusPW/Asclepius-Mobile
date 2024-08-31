//Arquivo de configuração da conexão com a API

import axios from "axios";

export const Api = axios.create({
    baseURL: 'http://192.168.0.101:5000', //Atualizar o local com o IP usado no expo
});