

export const getBatteryLevel = (currentVoltage: number):number => {
    const maxVoltage = 8.4;
    const minVoltage = 7.0;

    if (currentVoltage > maxVoltage) {
        return 100.0;
    } else if (currentVoltage < minVoltage) {
        return 0.0;
    } else {
        const percentage = ((currentVoltage - minVoltage) / (maxVoltage - minVoltage)) * 100;
        return percentage;
    }
}

