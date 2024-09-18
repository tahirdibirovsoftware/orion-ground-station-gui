export interface ILineChart {
    title: string;
    mainLabelTitle: string;
    optionalLabelTitle?: string;
    additionalLabel1Title?: string;
    additionalLabel2Title?: string;
    mainYTitle: string;
    mainXTitle: string;
    optionalYTitle?: string;
    optionalXTitle?: string;
    mainData: Array<number>;
    optionalData?: Array<number>;
    additionalData1?: Array<number>;
    additionalData2?: Array<number>;
}