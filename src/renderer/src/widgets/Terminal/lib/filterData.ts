export const filterToLastData = <T> (data:Array<T>, start: number):Array<T>=> {
    if(data.length>start){
        return data.slice(data.length-start)
    }
    else return data
}