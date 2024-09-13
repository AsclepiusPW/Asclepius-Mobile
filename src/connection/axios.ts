//Arquivo de configuração da conexão com a API

import axios from "axios";

//Modificar aqui o Ip da Máquina
//http://192.168.0.101 //Ip do app
//:5000 //Porta da Api
export const portApi = "http://192.168.0.101:5000";

export const Api = axios.create({
    baseURL: portApi, //Atualizar o local com o IP usado no expo
});