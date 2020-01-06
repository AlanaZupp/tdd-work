import { delimiter } from "path";

function escapeRegExp(string:string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

export const add =(input:string)=>{
    let neg="negatives not allowed";
    let delimiterGiven = undefined;
    let delimiterMulti= undefined;
    let values= undefined;

    //if empty
    if(input===''){
        return 0;
    }

    if(input.startsWith("//["))
    {
        input= input.replace(/]/g,"[");
        delimiterMulti= (input.substring(2,input.indexOf("\n")-1)).split("[");
        delimiterMulti = delimiterMulti.filter(delimiter => delimiter); //remove empty values
        input=input.substring(input.indexOf("\n")+1);
    }
    else if(input.startsWith("//"))
    {
        delimiterGiven = input.substring(2,3);
        input=input.substring(input.indexOf("\n")+1);
    }
   
    if(delimiterMulti){
        const delimiterRegex = new RegExp(`(${delimiterMulti.map(delimiter=>escapeRegExp(delimiter)).join('|')})`);
        values = input.split(delimiterRegex).filter(value=> delimiterMulti.indexOf(value)===-1);
    }
    else{
        values= input.split(delimiterGiven || /[,\n]/); //regular expresion 
    }
    
    //if negative numbers
    values.forEach(number => {
        if(Number.parseInt(number)<0)
        {
            neg+=" "+number;
        }
        if(Number.parseInt(number)>1000)
        {
            values.splice(values.indexOf(number),1);
        }
    });

    //return neg or answer
    if(neg.length>"negatives not allowed".length)
    {
        return neg;
    }
    const sum = values.reduce((previousValue,currentValue)=>previousValue + Number.parseInt(currentValue),0)
    return sum;
}