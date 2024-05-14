import { DataMode } from "../../../shared/config/theme/types";

export const getTitle = (mode: DataMode):string=>{
    if(mode==='flight') return 'Flight Port Configuration'
    else return 'IoT Port Configuration'
}