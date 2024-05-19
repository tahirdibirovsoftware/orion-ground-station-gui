

export interface ILineChart {
    title: string;
    mainYTitle: string;
    mainXTitle: string;
    optionalYTitle?: string;
    optionalXTitle?: string;
    mainData: Array<number>
    optionalData?: Array<number>
}