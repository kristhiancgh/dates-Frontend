import { Store } from "./store";

export interface ServiceModel {
  
    idService: number,
    serviceName: string,
    openingHour: string,
    closingHour: string,
    duration:string,
    store:Store,
  
  }