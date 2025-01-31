<template>
  <div class="calculator-container">
    <div class="calculator">
      <div class="display">{{ this.displayValue }}</div>
      <div class="keys">
        <CalcButton class="operator" @click="this.clear()">C</CalcButton>
        <CalcButton class="operator" @click="this.ans()">ANS</CalcButton>
        <CalcButton class="operator" @click="this.del()">DEL</CalcButton>
        <CalcButton class="operator" @click="this.handleInput('+')" :disabled="this.isOperatorDisabled('+')">+</CalcButton>
        <CalcButton @click="this.handleInput('1')">1</CalcButton>
        <CalcButton @click="this.handleInput('2')">2</CalcButton>
        <CalcButton @click="this.handleInput('3')">3</CalcButton>
        <CalcButton class="operator" @click="this.handleInput('-')" :disabled="this.isOperatorDisabled('-')">-</CalcButton>
        <CalcButton @click="this.handleInput('4')">4</CalcButton>
        <CalcButton @click="this.handleInput('5')">5</CalcButton>
        <CalcButton @click="this.handleInput('6')">6</CalcButton>
        <CalcButton class="operator" @click="this.handleInput('*')" :disabled="this.isOperatorDisabled('*')">*</CalcButton>
        <CalcButton @click="this.handleInput('7')">7</CalcButton>
        <CalcButton @click="this.handleInput('8')">8</CalcButton>
        <CalcButton @click="this.handleInput('9')">9</CalcButton>
        <CalcButton class="operator" @click="this.handleInput('/')" :disabled="this.isOperatorDisabled('/')">/</CalcButton>
        <CalcButton class="operator" @click="this.surprise()"></CalcButton>
        <CalcButton @click="this.handleInput('0')">0</CalcButton>
        <CalcButton class="operator" @click="this.handleInput('.')" :disabled="this.isOperatorDisabled('.')">.</CalcButton>
        <CalcButton class="equals" @click="this.calculateResult()">=</CalcButton>
      </div>
    </div>
    <CalcLog/>
  </div>
</template>

<script>
import { useCalculatorStore } from '../stores/logStore';
import CalcButton from "./CalcButton.vue";
import CalcLog from "./CalcLog.vue";

export default {
  name: 'Calculator',
  components: {
    CalcButton,
    CalcLog,
  },

  data() {
    return {
      displayValue: '0',
      previousAnswer: '',
      errMsgs: ['Error', 'Undefined', ':)'],
      operators: ['+', '-', '/', '*'],
      commaHang: false,
      lastInput: null,
      disabledOperator: false,
      isCompleted: true,
    }
  },
  methods: {
    handleInput(input) {
      console.log("Last input: " + this.lastInput);
      if(this.hangingZero() && input === '0') return;
      if(input === '.' && this.operators.indexOf(this.lastInput) >= 0) return;
      if(input === '.' && this.hasHangingComma()) return;

      // Replace
       if ((this.errMsgs.indexOf(this.displayValue) >= 0 || this.displayValue === '0') && this.operators.indexOf(input) >= 0) {

        console.log("Second");
        this.isCompleted = false;
        this.displayValue = '0' + input;
     
      // Append input
      } else if (this.isCompleted || this.errMsgs.indexOf(this.displayValue) >= 0) {

        console.log("First");
        this.isCompleted = false;
        this.displayValue = input;

      // Operate with 0
      }
       else if ((this.operators.indexOf(input) >= 0 && this.operators.indexOf(this.lastInput) >= 0)) {
          this.del();
          this.displayValue += input;
    
      } else {
        this.isCompleted = false;
          this.displayValue += input;
          
        
      }
      this.lastInput = input;
      
    },

    hangingZero(){
      let hang = (this.displayValue === '0' || (this.displayValue.trim().length > 1 && ((this.displayValue.slice(-1, this.displayValue.length) === '0') && this.operators.indexOf(this.displayValue.slice(-2,-1)) > 0)));
      return hang;
    },

    hasHangingComma() {
      const parts = this.displayValue.split(/[\+\-\*\/]/); // Split by operators
      return parts[parts.length - 1].includes('.'); // Check the last number part
    },
    calculateResult() {
      try {
        this.isCompleted = true;
        this.commaHang = false;
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
        this.store.logger(this.displayValue + " = " + ret);
        this.displayValue = ret;
        this.setPrevAns(ret)
      } catch {
        this.store.logger(this.displayValue + " = " + "Error");
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
      if(this.previousAnswer !== '') this.handleInput(this.previousAnswer);
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
      this.store.logger("CLEAR");
      this.hangingComma = false;
      this.isCompleted = true;
      this.displayValue = '0';
    },

    isOperatorDisabled(operator)  {
      this.disabledOperator = operator === this.lastInput;
      return operator === this.lastInput;
    },

    surprise() {
      if (this.displayValue === '6969') {
        window.open('https://www.youtube.com/watch?v=nat2-OTTXyU', "_blank");
        this.displayValue = ':)';
      }
    },
  },
  setup() {
    const store = useCalculatorStore();

    return { 
      store,
    };
  },
};
</script>

  
<style scoped>
  .calculator-container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 100%;
    height: 100%;
    max-width: 50%;
    margin: 10px;
    justify-content: flex-start;
    align-items: center;
    padding: 30px; /* Space for expanded log */
    overflow-y: auto;

  }

  .calculator {
    aspect-ratio: 260/300;
    max-width: 400px;

    min-width: 60%;
    background-color: #2d2d2d;
    padding: 1rem;
    border-radius: 10px;
    position: relative;
  }

  .calculator .display {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: pre-wrap;
    background-color: #3c3c3c;
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 0.25rem;
    height: 3rem;
    width: 100%;
  }

  .calculator .keys {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
  }

  header {
    line-height: 1.5;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  
  /* @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
  
    .logo {
      margin: 0 2rem 0 0;
    }
  
    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  } */
</style>
  