import { Event } from "./typeEvent";

export type infoVaccine = {
  id: string,
  manufacturer: string;
  type: string;
  name: string;
  description?: string;
  contraIndication?: string;
  observations?: string;
  vaccinationCalendar?: Event[]; 
};
