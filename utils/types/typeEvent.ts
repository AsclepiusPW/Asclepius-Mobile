//Importações
import { infoVaccine } from "./typeInfoVaccine";

export type Event = {
  id: string,
  local: string;
  latitude: string;
  longitude: string;
  date: string;
  places: number;
  status: string;
  observation: string;
  responsible: string;
  vaccine: infoVaccine; //Mudando para receber um objeto
};
