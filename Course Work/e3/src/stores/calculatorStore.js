import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    displayValue: '0',
    previousAnswer: null,
    log: [],
    isCompleted: true,
    isCollapsed: true,
    errMsgs: ['Error', 'Undefined', ':)'],
    operators: ['.', '+', '-', '/', '*'],
    lastInput: null,
    disabledOperator: false
  }),
  
  actions: {
    handleInput(input) {
      // Replace
      if (this.isCompleted || this.errMsgs.indexOf(this.displayValue) >= 0) {

        console.log("First");
        this.isCompleted = false;
        this.displayValue = input;

      // Operate with 0
      } else if (this.displayValue === '0' && this.operators.indexOf(input) >= 0) {

        console.log("Second");
        this.isCompleted = false;
        this.displayValue = '0' + input;
      
      // Append input
      } else if (this.operators.indexOf(input) >= 0 && this.operators.indexOf(this.lastInput) >= 0) {
        console.log("Replaced operator")
        this.del();
        this.displayValue += input;
      } else {
        console.log("Third: " + this.isCompleted + ", " + this.errMsgs.indexOf(this.displayValue));
        this.isCompleted = false;
        this.displayValue += input;
      }
      this.lastInput = input;
    },
    calculateResult() {
      try {
        this.isCompleted = true;
        if (this.errMsgs.indexOf(this.displayValue) >= 0) {
          this.displayValue = '0';
          return;
        }
        const fracs = this.displayValue.split('/');
        const nFracs = fracs.length;
        let ret = eval(this.displayValue).toString();

        if (fracs.slice(1, nFracs).some(frac => eval(frac).toString() === '0')) {
          ret = 'Undefined';
        }
        this.logger(this.displayValue + " = " + ret);
        this.displayValue = ret;
        this.setPrevAns(ret)
      } catch {
        this.logger(this.displayValue + " = " + "Error");
        this.displayValue = 'Error';
      }
    },
    setPrevAns(newAns) {
      if (this.errMsgs.indexOf(newAns) >= 0 || this.operators.indexOf(newAns) >= 0) {
        return;
      }
      this.previousAnswer = newAns;
    },
    ans() {
      this.handleInput(this.previousAnswer);
    },
    del(){
      if(this.displayValue.length > 1) {
        this.displayValue = this.displayValue.substring(0, this.displayValue.length - 1);
      } else {
        this.displayValue = '0';
        this.isCompleted = true;
      }
    },
    clear() {
      this.logger("CLEAR");
      this.isCompleted = true;
      this.displayValue = '0';
    },
    logger(message) {
      this.log.push(message);
    },
    clearLog() {
      this.log = [];
    },
    toggleCollapsed(){
      this.isCollapsed = !this.isCollapsed;
      if(this.isCollapsed){
        console.log("Log closed")
      } else {
        console.log("Log opened")
      };
    },
    surprise() {
      if (this.displayValue === '6969') {
        window.open('https://www.youtube.com/watch?v=nat2-OTTXyU', "_blank");
        this.displayValue = ':)';
      }
    },
    isOperatorDisabled(operator)  {
      this.disabledOperator = operator === this.lastInput;
      return operator === this.lastInput;
    },
  },
});
