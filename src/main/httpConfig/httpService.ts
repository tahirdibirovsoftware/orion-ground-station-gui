/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { ITelemetry } from '../../global/types/types';

class HTTPService {
    private readonly apiBase: string = 'https://orion-server-oek4.onrender.com/api/telemetry';
    private readonly http: AxiosInstance;

    // Retry mechanism
    private maxRetries: number = 30;
    private retryDelay: number = 1000; // 1 second

    constructor() {
        this.http = axios.create({
            baseURL: this.apiBase,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private async retryOperation<T>(
        operation: () => Promise<T>, 
        retries: number = 0
    ): Promise<T | undefined> {
        try {
            return await operation();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`Error in operation: ${error.response?.data || error.message}`);
            } else {
                console.error('Unexpected error:', error);
            }

            if (retries < this.maxRetries) {
                console.log(`Retrying operation in ${this.retryDelay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.retryOperation(operation, retries + 1);
            } else {
                console.error('Max retries reached. Operation failed.');
                return undefined; // Or throw an error if needed
            }
        }
    }

    transmitData = async (data: ITelemetry): Promise<void> => {
        await this.retryOperation(async () => {
            const response = await this.http.post('/', data);
            console.log('Data transmitted successfully:', response.data);
        });
    };

    clearSession = async (): Promise<void> => {
        await this.retryOperation(async () => {
            const response = await this.http.delete('/');
            console.log('Postgres session cleared successfully:', response.data);
        });
    };
}

export default new HTTPService();
