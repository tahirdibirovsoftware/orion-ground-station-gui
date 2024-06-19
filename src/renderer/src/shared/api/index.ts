import { ITelemetry } from "src/global/types/types"
import axios from 'axios';

const API = 'http://localhost:3000/api/telemetry'

export const postData = async (data: ITelemetry): Promise<void> => {
    await axios.post(API, {data,  headers: {
        'Content-Type': 'application/json',}})
}