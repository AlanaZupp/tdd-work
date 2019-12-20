export const add =(input:string)=>{
    let neg="negatives not allowed";
    let delimiterGiven = undefined;
    //if empty
    if(input===''){
        return 0;
    }

    //if specifiec delim
    if(input.startsWith("//"))
    {
        delimiterGiven = input.substring(2,3);
        input=input.substring(input.indexOf("\n")+1);
    }
    //     const values= input.split(delimiterGiven);
    //     values.forEach(number => {
    //         if(Number.parseInt(number)<0)
    //         {
    //             neg+=" "+number;
    //         }
    //     });
    //     if(neg.length>"negatives not allowed".length)
    //     {
    //         return neg;
    //     }
    //     const sum = values.reduce((previousValue,currentValue)=>previousValue + Number.parseInt(currentValue),0)
    //     return sum;
    // }

    //if regular delim
    // if(input.indexOf(",")>=0||input.indexOf("\n")>=0)
    // {
        const values= input.split(delimiterGiven || /[,\n]/); //regular expresion 
        values.forEach(number => {
            if(Number.parseInt(number)<0)
            {
                neg+=" "+number;
            }
        });
        if(neg.length>"negatives not allowed".length)
        {
            return neg;
        }
        const sum = values.reduce((previousValue,currentValue)=>previousValue + Number.parseInt(currentValue),0)
        return sum;
    // }
    // return Number.parseInt(input);
}