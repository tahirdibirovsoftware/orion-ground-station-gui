interface IFilteredData {
  outputData: Array<number>;
  time: Array<number>;
}

function generateRange(start, end):Array<number> {
  const range:Array<number> = [];
  for (let i:number = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}

export const filteredData = (data: Array<number>): IFilteredData=>{
    if(data.length>=50){
      const startIndex = data.length - 51
      const seconds = generateRange(startIndex, data.length-1)
      const filteredData = data.slice(startIndex)
      return {outputData: filteredData, time: seconds}
    }
    else return {outputData: data, time: data.map((_,idx)=>idx)};
  }