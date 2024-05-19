export const getBatteryLevel = (currentVoltage:number, maxVoltage:number):number=>{
    return currentVoltage*100/maxVoltage
}

