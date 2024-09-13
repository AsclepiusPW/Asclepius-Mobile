//Importação 
import { Event } from "./typeEvent"

//type
export type VaccinationRequest = {
    id: string,
    status: "Reservation approved" | "Reservation denied" | "Reservation requested",
    date: string,
    calendar: Event
}