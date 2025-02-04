<template>
  <div class="calculator-container">
    <div class="calculator">
      <div class="display">{{ calcStore.displayValue }}</div>
      <div class="keys">
        <CalcButton class="operator" @click="clear()">C</CalcButton>
        <CalcButton class="operator" @click="ans()">ANS</CalcButton>
        <CalcButton class="operator" @click="del()">DEL</CalcButton>
        <CalcButton class="operator" @click="handleInput('+')" :disabled="isOperatorDisabled('+')">+</CalcButton>
        <CalcButton @click="handleInput('1')">1</CalcButton>
        <CalcButton @click="handleInput('2')">2</CalcButton>
        <CalcButton @click="handleInput('3')">3</CalcButton>
        <CalcButton class="operator" @click="handleInput('-')" :disabled="isOperatorDisabled('-')">-</CalcButton>
        <CalcButton @click="handleInput('4')">4</CalcButton>
        <CalcButton @click="handleInput('5')">5</CalcButton>
        <CalcButton @click="handleInput('6')">6</CalcButton>
        <CalcButton class="operator" @click="handleInput('*')" :disabled="isOperatorDisabled('*')">*</CalcButton>
        <CalcButton @click="handleInput('7')">7</CalcButton>
        <CalcButton @click="handleInput('8')">8</CalcButton>
        <CalcButton @click="handleInput('9')">9</CalcButton>
        <CalcButton class="operator" @click="handleInput('/')" :disabled="isOperatorDisabled('/')">/</CalcButton>
        <CalcButton class="operator" @click="surprise()"></CalcButton>
        <CalcButton @click="handleInput('0')">0</CalcButton>
        <CalcButton class="operator" @click="handleInput('.')" :disabled="isOperatorDisabled('.')">.</CalcButton>
        <CalcButton class="equals" @click="calculateResult()">=</CalcButton>
      </div>
    </div>
    <CalcLog/>
  </div>
</template>

<script>
import { useLogStore } from '../stores/logStore';
import { useCalculatorStore } from '../stores/calculatorStore';

import CalcButton from "./CalcButton.vue";
import CalcLog from "./CalcLog.vue";

export default {
  name: 'Calculator',
  components: {
    CalcButton,
    CalcLog,
  },
  setup() {
    const calcStore = useCalculatorStore();
    const logStore = useLogStore();
    

    const logg = (message) => {
      logStore.logger(message);
    };

    const handleInput = (input) => {
      console.log("Last input: " + calcStore.lastInput);
      if (hangingZero(input) && input === '0') return;
      if (input === '.' && calcStore.operators.indexOf(calcStore.lastInput) >= 0) return;
      if (input === '.' && hasHangingComma()) return;

      // Replace
      if ((calcStore.errMsgs.indexOf(calcStore.displayValue) >= 0 || calcStore.displayValue === '0') && calcStore.operators.indexOf(input) >= 0) {
        console.log("Second");
        calcStore.isCompleted = false;
        calcStore.displayValue = '0' + input;
      } else if (calcStore.isCompleted || calcStore.errMsgs.indexOf(calcStore.displayValue) >= 0) {
        console.log("First");
        calcStore.isCompleted = false;
        calcStore.displayValue = input;
      } else if (calcStore.operators.indexOf(input) >= 0 && calcStore.operators.indexOf(calcStore.lastInput) >= 0) {
        del();
        calcStore.displayValue += input;
      } else {
        calcStore.isCompleted = false;
        calcStore.displayValue += input;
      }
      calcStore.lastInput = input;
    };

    const hangingZero = (input) => {
      let hang = (calcStore.displayValue === '0' || (calcStore.displayValue.trim().length > 1 && ((calcStore.displayValue.slice(-1, calcStore.displayValue.length) === '0') && calcStore.operators.indexOf(calcStore.displayValue.slice(-2, -1)) > 0)));
      return hang;
    };

    const hasHangingComma = () => {
      const parts = calcStore.displayValue.split(/[\+\-\*\/]/); // Split by operators
      return parts[parts.length - 1].includes('.'); // Check the last number part
    };

    const calculateResult = () => {
      try {
        calcStore.isCompleted = true;
        calcStore.commaHang = false;
        if (calcStore.errMsgs.indexOf(calcStore.displayValue) >= 0) {
          calcStore.displayValue = '0';
          return;
        }
        const fracs = calcStore.displayValue.split('/');
        const nFracs = fracs.length;
        let ret = eval(calcStore.displayValue).toString();

        if (fracs.slice(1, nFracs).some(frac => eval(frac).toString() === '0')) {
          ret = 'Undefined';
        }
        logg(calcStore.displayValue + " = " + ret);
        calcStore.displayValue = ret;
        setPrevAns(ret);
      } catch {
        logg(calcStore.displayValue + " = " + "Error");
        calcStore.displayValue = 'Error';
      }
    };

    const setPrevAns = (newAns) => {
      if (calcStore.errMsgs.indexOf(newAns) >= 0 || calcStore.operators.indexOf(newAns) >= 0) {
        return;
      }
      calcStore.previousAnswer = newAns;
    };

    const ans = () => {
      if (calcStore.previousAnswer !== '') handleInput(calcStore.previousAnswer);
    };

    const del = () => {
      if (calcStore.displayValue.length > 1) {
        calcStore.displayValue = calcStore.displayValue.substring(0, calcStore.displayValue.length - 1);
      } else {
        calcStore.displayValue = '0';
        calcStore.isCompleted = true;
      }
    };

    const clear = () => {
      logg('CLEAR');
      calcStore.commaHang = false;
      calcStore.isCompleted = true;
      calcStore.displayValue = '0';
    };

    const isOperatorDisabled = (operator) => {
      calcStore.disabledOperator = operator === calcStore.lastInput;
      return operator === calcStore.lastInput;
    };

    const surprise = () => {
      if (calcStore.displayValue === '6969') {
        window.open('https://www.youtube.com/watch?v=nat2-OTTXyU', "_blank");
        calcStore.displayValue = ':)';
      }
    };

    return {
      calcStore,
      logg,
      handleInput,
      clear,
      ans,
      del,
      isOperatorDisabled,
      surprise,
      calculateResult,
    };
  },
};
</script>

  
<style scoped>
  .calculator-container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    min-width: 50%;
    max-width: 50%;
    height: 100%;
    margin: 10px;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 30px; /* Space for expanded log */
    overflow-y: auto;

  }

  .calculator {
    min-width: 300px;
    max-height: 350px;
    aspect-ratio: 260/300;
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
  