import axios, { AxiosInstance } from 'axios';
import { ITelemetry } from '../../global/types/types';

class HTTPService {
    private readonly apiBase: string = 'http://localhost:3000/api/telemetry';
    private readonly http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            baseURL: this.apiBase,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
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
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }
}

export default new HTTPService()