import { ServiceModel } from "./serviceModel";

export interface Turn {

  turnDate: string,
  initHour: string,
  endHour: string,
  status:string,
  service: ServiceModel

}