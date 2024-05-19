

export interface IBarChart {
    title: string;
    mainLabelTitle: string;
    optionalLabelTitle?: string; 
    mainYTitle: string;
    mainXTitle: string;
    optionalYTitle?: string;
    optionalXTitle?: string;
    mainData: Array<number>
    optionalData?: Array<number>
}