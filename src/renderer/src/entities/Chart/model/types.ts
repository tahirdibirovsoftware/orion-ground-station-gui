
export type ChartType = 'temperature' | 'pressure' | 'altitude' | 'descentRate' | 'position' | 'axes' | 'voltage';

export interface IChart{
    type: ChartType;
    mainData: Array<number>;
    optionalData?: Array<number>;
  }