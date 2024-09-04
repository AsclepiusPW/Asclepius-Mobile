//Imports
import { infoVaccine } from "./typeInfoVaccine"

//type Vaccination
export type Vaccination = {
    id: string;
    date: string;
    quantityApplied: number;
    vaccine: infoVaccine;
}