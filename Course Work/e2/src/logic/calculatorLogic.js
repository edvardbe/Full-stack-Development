var errMsgs = ['Error', 'Undefined', ':)'];
var operators = ['.', '+', '-', '/', '*'];
var isCompleted = true;

export function handleInput(prevInputs, input){
    let logMsg = input;
    if(operators.indexOf(input) > 0){
        logMsg = " " + input + " ";
    }
    if (!isCompleted || errMsgs.indexOf(prevInputs) >= 0){
        console.log("First: " + isCompleted + ", " + errMsgs.indexOf(prevInputs));
        logger(logMsg);
        isCompleted = false;
        return prevInputs + input;
    } 
    else if(prevInputs === '0' && operators.indexOf(input) >= 0){
        console.log("Second");

        logMsg = (operators.indexOf(input) === 0) ? "0" + input : "0 " + input;
        logger(logMsg);
        isCompleted = false;
        return '0' + input;
    } else {
        console.log("Third");
        logger(logMsg);
        isCompleted = false;
        return input;
    }
}

export function calculateResult(currentValue){
    try{
        isCompleted = true;
        if(errMsgs.indexOf(currentValue) >= 0){
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
        logger(" = Error\n")
        return 'Error';
    }
}

export function setPrevAns(prevAns, newAns){
    if(errMsgs.indexOf(newAns) >= 0 || operators.indexOf(newAns) >= 0){
        return prevAns;
    }
    return newAns;
}

export function clearDisplay(){
    isCompleted ? logger("CLEAR\n") : logger("\nCLEAR\n");
    isCompleted = true;
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
