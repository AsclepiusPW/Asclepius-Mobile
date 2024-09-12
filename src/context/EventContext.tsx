//Criando contexto para armazanar as informações dos eventos
import React, { createContext, useContext, useEffect, useState } from "react";

//Api
import { Api } from "../connection/axios";

//Type
import { Event } from "../../utils/types/typeEvent";

//Contexto de autenticação
import { useAuth } from "./AuthContext";

//Definição do contexto
interface EventContextData {
    eventData: Event[];
    loadingEvent: boolean;
    loadEventData: () => Promise<void>;
}

//Criando o contexto
const EventContext = createContext<EventContextData>({} as EventContextData);

//Props
interface EventContextProps {
    children: React.ReactNode;
}

//Provedor do contexto
export const EventProvider: React.FC<EventContextProps> = ({ children }) => {
    const {token} = useAuth();
    const [eventData, setEventData] = useState<Event[]>([]);
    const [loadingEvent, setLoadingEvent] = useState<boolean>(false);

    //Função para carregar os eventos
    const loadEventData = async () => {
        try {
            setLoadingEvent(true);
            const response = await Api.get("/event");

            //Salvando as informações no state
            setEventData(response.data);
        } catch (error) {
            console.log("Error ao buscar os eventos na API: ", error);
        }finally{
            setLoadingEvent(false);
        }
    };

    // Coleta as informações automáticamente
    useEffect(() => {
        loadEventData(); // Carrega os eventos automaticamente
    }, [token]);

    return (
        <EventContext.Provider value={{ eventData, loadingEvent, loadEventData }}>
            {children}
        </EventContext.Provider>
    )
}

//Hook para acessar o contexto de eventos
export const userEvent = () => {
    return useContext(EventContext);
}