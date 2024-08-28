import { parentPort } from "worker_threads";
import httpService from "../httpConfig/httpService";

const isSync = async (): Promise<boolean> => {
    try {
        const status = await httpService.checkConnection();
        return status >= 200 && status < 300;
    } catch (error) {
        console.error("Error checking connection:", error);
        return false;
    }
};

const analyzeNetwork = async (): Promise<void> => {
    try {
        const status = await isSync();
        console.log("Status ", status);
        parentPort?.postMessage(status);
    } catch (error) {
        console.error("Error in analyzeNetwork:", error);
        parentPort?.postMessage(false);
    } finally {
        // Always schedule the next check, regardless of the outcome
        setTimeout(analyzeNetwork, 1000);
    }
};

console.log("Worker started...");
analyzeNetwork();
