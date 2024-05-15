export interface IBaudRateConfig {
    type: 'flight' | 'iot'
}

export interface BaudRateState {
    flightBaudRate: number;
    iotBaudRate: number;
}