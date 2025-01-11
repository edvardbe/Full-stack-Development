export function handleInput(currentValue, input){
    if(currentValue === '0' || currentValue === 'Error'){
        return input;
    }
    else {
        return currentValue + input;
    }
}

export function calculateResult(currentValue){
    try{
        let ret = eval(currentValue).toString();
        if (ret === 'Infinity'){
            return 'Undefined';
        }
        return ret;
    } catch{
        return 'Error';
    }
}

export function clearDisplay(){
    return '0';
}
