import { DataMode } from "../../../shared/config/theme/types";

export const getTitle = (mode: DataMode):string=>{
    if(mode==='flight') return 'Flight_Port_Configuration'.toUpperCase()
    else return 'IoT_Port_Configuration'.toUpperCase()
}