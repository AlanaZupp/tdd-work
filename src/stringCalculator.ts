export const add =(input:string)=>{
    if(input===''){
        return 0;
    }
    if(input.indexOf(",")>=0||input.indexOf("\n")>=0)
    {
        const values= input.split(/[,\n]/); //regular expresion 
        const sum = values.reduce((previousValue,currentValue)=>previousValue + Number.parseInt(currentValue),0)
        return sum;
    }
    return Number.parseInt(input);
}