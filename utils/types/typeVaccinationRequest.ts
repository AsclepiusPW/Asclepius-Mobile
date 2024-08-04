//type
export type VaccinationRequest = {
    dateRequest?: string,
    nameEvent?: string,
    dateEvent?: string,
    vacanciesEvent?: string,
    statusEvent?: string,
    vaccineEvent?: string,
    responseEvent?: "approved" | "denied" | "noResponse",
    latitude?: string,
    longitude?: string
}