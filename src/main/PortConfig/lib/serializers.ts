import { IRecievingData } from "../../../global/types/types";


export const serialize = (data: string):string => {
    const parsedData: IRecievingData = JSON.parse(data)
    return `{${parsedData.parachuteState}#${parsedData.iot}#${parsedData.mfm}}`
}