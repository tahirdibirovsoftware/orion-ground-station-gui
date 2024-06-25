import axios, { AxiosInstance } from 'axios';
import { ITelemetry } from '../../global/types/types';

class HTTPService {
    private readonly apiBase: string = 'https://orion-server-oek4.onrender.com/api/telemetry';
    private readonly http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            baseURL: this.apiBase,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    transmitData = async (data: ITelemetry): Promise<void> => {
        try {
            const response = await this.http.post('/', data);
            console.log('Data transmitted successfully:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error transmitting data:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    clearSession = async (): Promise<void> => {
        try {
            const response = await this.http.delete('/');
            console.log('Session cleared successfully:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error clearing session:', error.response?.data || error.message);
               await this.clearSession()
            } else {
                console.error('Unexpected error:', error);
                await this.clearSession()
            }
        }
    }
}

export default new HTTPService()