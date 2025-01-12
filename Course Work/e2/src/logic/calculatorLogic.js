var msgs = ['Error', 'Undefined', ':)'];
var operators = ['.', '+', '-', '/', '*'];

export function handleInput(prevInputs, input){
    let logMsg = input;
    if(operators.indexOf(input) > 0){
        logMsg = " " + input + " ";
    }
    logger(logMsg);
    if (msgs.indexOf(prevInputs) >= 0 || (prevInputs === '0' && operators.indexOf(input) < 0)){
        return input;
    } else {
        return prevInputs + input;
    }
}

export function calculateResult(currentValue){
    try{
        if(msgs.indexOf(currentValue) >= 0){
            return '0';
        }
        const fracs = currentValue.split('/');
        const nFracs = fracs.length;
        let ret = eval(currentValue).toString();

        if (fracs.slice(1, nFracs).some(frac => eval(frac).toString() === '0')) {
            ret = 'Undefined';
        }
        logger(" = " + ret + "\n");
        return ret;
    } catch{
        return 'Error';
    }
}

export function setPrevAns(prevAns, newAns){
    if(msgs.indexOf(newAns) >= 0 || operators.indexOf(newAns) >= 0){
        return prevAns;
    }
    return newAns;
}

export function clearDisplay(){
    logger("\nCLEAR\n");
    return '0';
}

export function logger(prevAns){
    let curElement = document.getElementById("log");
    let text = curElement.textContent || curElement.innerText;
    curElement.textContent = text + prevAns;
}

export function clearLog(){
    let curElement = document.getElementById("log");
    let text = curElement.textContent || curElement.innerText;
    curElement.textContent = "";
}

export function suprise(currentValue){
    if (currentValue === '6969'){
        window.open('https://www.youtube.com/watch?v=nat2-OTTXyU', "_blank")
        return ':)';
    }
    return currentValue;
}
