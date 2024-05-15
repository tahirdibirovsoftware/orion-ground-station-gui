export interface IConnector{
    type: 'flight' | 'iot'
}

export type ConnectionStatus = 'connected' | 'disconnected'