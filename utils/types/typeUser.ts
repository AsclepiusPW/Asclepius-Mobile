//Tipagem de usuário

export type User = {
    image?: string,
    name?: string,
    email?: string,
    telefone?: string,
    latitude?: number,
    longitude?: number,
    password?: string,
    requestReservation?: any[],
    vaccination?: any[],
}