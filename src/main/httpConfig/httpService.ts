import axios, { AxiosInstance, AxiosError } from 'axios';
import { ITelemetry } from '../../global/types/types';

class HTTPError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'HTTPError';
    }
}

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

    private handleHttpError(error: AxiosError): never {
        if (error.response) {
            const statusCode = error.response.status;
            let message: string;

            switch (statusCode) {
                case 400:
                    message = 'Bad Request: The server cannot process the request due to a client error.';
                    break;
                case 401:
                    message = 'Unauthorized: Authentication is required and has failed or has not been provided.';
                    break;
                case 403:
                    message = 'Forbidden: The server understood the request but refuses to authorize it.';
                    break;
                case 404:
                    message = 'Not Found: The requested resource could not be found.';
                    break;
                case 429:
                    message = 'Too Many Requests: You have sent too many requests in a given amount of time.';
                    break;
                case 500:
                    message = 'Internal Server Error: The server has encountered a situation it does not know how to handle.';
                    break;
                default:
                    message = `HTTP Error: The server responded with status code ${statusCode}`;
            }

            throw new HTTPError(statusCode, message);
        } else if (error.request) {
            throw new Error('No response received from the server. Please check your network connection.');
        } else {
            throw new Error('Error setting up the request: ' + error.message);
        }
    }

    private async retryOperation<T>(
        operation: () => Promise<T>, 
        retries: number = 0
    ): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429 || (error.response?.status && error.response.status >= 500)) {
                    if (retries < this.maxRetries) {
                        console.log(`Retrying operation in ${this.retryDelay / 1000} seconds...`);
                        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                        return this.retryOperation(operation, retries + 1);
                    }
                }
                this.handleHttpError(error);
            }
            throw error; // Re-throw if it's not an Axios error
        }
    }

    transmitData = async (data: ITelemetry): Promise<void> => {
        try {
            await this.retryOperation(async () => {
                const response = await this.http.post('/', data);
                console.log('Data transmitted successfully:', response.data);
            });
        } catch (error) {
            if (error instanceof HTTPError) {
                console.error(`Failed to transmit data: ${error.message}`);
            } else {
                console.error('Unexpected error while transmitting data:', error);
            }
            throw error;
        }
    };

    clearSession = async (): Promise<void> => {
        try {
            await this.retryOperation(async () => {
                const response = await this.http.delete('/');
                console.log('Postgres session cleared successfully:', response.data);
            });
        } catch (error) {
            if (error instanceof HTTPError) {
                console.error(`Failed to clear session: ${error.message}`);
            } else {
                console.error('Unexpected error while clearing session:', error);
            }
            throw error;
        }
    };

    static async checkConnection(): Promise<number> {
        const url = 'https://orion-server-oek4.onrender.com/api/telemetry';
        const timeout = 30000; // 30 seconds

        try {
            const startTime = Date.now();
            const response = await axios.get(url, { timeout });
            const endTime = Date.now();
            const duration = endTime - startTime;

            if (duration > timeout) {
                throw new Error('Connection timeout: Duration exceeded 30 seconds');
            }

            return response.status;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    throw new Error('Connection timeout: Duration exceeded 30 seconds');
                }
                if (error.response) {
                    return error.response.status;
                }
            }
            throw error;
        }
    }
}

export default new HTTPService();