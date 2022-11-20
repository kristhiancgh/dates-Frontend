import { Turn } from "src/app/models/turn";

export const ELEMENT_DATA: Turn[] = [
    {
      
      turnDate: "11/11/2022",
      initHour: "13:00",
      endHour: "13:30",
      status: "active",
      service: {
        idService: 1,
        store: {
          idStore: 1,
          storeName: "Car Center",
          maxCapacity: 100,
        },
        serviceName: "Lavado general",
        openingHour: "08:00",
        closingHour: "18:00",
        duration: "30",
  
      }
    },
    {
    
      turnDate: "10/10/2022",
      initHour: "12:00",
      endHour: "15:00",
      status: "active",
      service: {
        idService: 2,
        store: {
          idStore: 2,
          storeName: "Centro Diseño",
          maxCapacity: 100,
        },
        serviceName: "Diseño cocina",
        openingHour: "08:00",
        closingHour: "18:00",
        duration: "30",
  
      }
    }
  ];