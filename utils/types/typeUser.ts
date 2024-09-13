//Importações
import { Vaccination } from "./typeVaccinationRegister"
import { VaccinationRequest } from "./typeVaccinationRequest"

//Tipagem de usuário
export type User = {
    image?: string,
    name?: string,
    email?: string,
    telefone?: string,
    latitude?: number,
    longitude?: number,
    password?: string,
    requestReservation?: VaccinationRequest[],
    vaccination?: Vaccination[],
}