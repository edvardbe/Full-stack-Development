<template>
  <div class="calculator-container">
    <div class="calculator">
      <div class="display">{{ calcStore.displayValue }}</div>
      <div class="keys">
        <CalcButton id="clear-btn" class="operator" @click="clear()">C</CalcButton>
        <CalcButton id="ans-btn" class="operator" @click="ans()">ANS</CalcButton>
        <CalcButton id="del-btn" class="operator" @click="del()">DEL</CalcButton>
        <CalcButton id="add-btn" class="operator" @click="handleInput('+')" :disabled="isOperatorDisabled('+')">+</CalcButton>
        <CalcButton id="num-1" @click="handleInput('1')">1</CalcButton>
        <CalcButton id="num-2" @click="handleInput('2')">2</CalcButton>
        <CalcButton id="num-3" @click="handleInput('3')">3</CalcButton>
        <CalcButton id="subtract-btn" class="operator" @click="handleInput('-')" :disabled="isOperatorDisabled('-')">-</CalcButton>
        <CalcButton id="num-4" @click="handleInput('4')">4</CalcButton>
        <CalcButton id="num-5" @click="handleInput('5')">5</CalcButton>
        <CalcButton id="num-6" @click="handleInput('6')">6</CalcButton>
        <CalcButton id="multiply-btn" class="operator" @click="handleInput('*')" :disabled="isOperatorDisabled('*')">*</CalcButton>
        <CalcButton id="num-7" @click="handleInput('7')">7</CalcButton>
        <CalcButton id="num-8" @click="handleInput('8')">8</CalcButton>
        <CalcButton id="num-9" @click="handleInput('9')">9</CalcButton>
        <CalcButton id="divide-btn" class="operator" @click="handleInput('/')" :disabled="isOperatorDisabled('/')">/</CalcButton>
        <CalcButton id="surprise-btn" class="operator" @click="surprise()"></CalcButton>
        <CalcButton id="num-0" @click="handleInput('0')">0</CalcButton>
        <CalcButton id="decimal-btn" class="operator" @click="handleInput('.')" :disabled="isOperatorDisabled('.')">.</CalcButton>
        <CalcButton id="equals-btn" class="equals" @click="calculateResult()" :disabled="hangingOperator()">=</CalcButton>

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
    const errMsgs = ['Error', 'Undefined', ':)'];
    const operators = ['+', '-', '/', '*'];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    

    

    const handleInput = (input) => {
      console.log("Last input: " + calcStore.lastInput);
      if (hangingZero(input) && !calcStore.isCompleted && numbers.indexOf(input) >= 0) return;
      if (input === '.' && operators.indexOf(calcStore.lastInput) >= 0) return;
      if (input === '.' && hasHangingComma()) return;

      // Replace
      if ((errMsgs.indexOf(calcStore.displayValue) >= 0 || calcStore.displayValue === '0') && operators.indexOf(input) >= 0) {
        console.log("Second");
        calcStore.isCompleted = false;
        calcStore.displayValue = '0' + input;
      } else if (calcStore.isCompleted || errMsgs.indexOf(calcStore.displayValue) >= 0) {
        console.log("First");
        calcStore.isCompleted = false;
        calcStore.displayValue = input;
      } else if (operators.indexOf(input) >= 0 && hangingOperator()) {
        del();
        calcStore.displayValue += input;
        calcStore.isCompleted = false;
      } else {
        calcStore.isCompleted = false;
        calcStore.displayValue += input;
      }
      calcStore.lastInput = input;
    };

    const hangingZero = (input) => {
      let hang = (calcStore.displayValue === '0' || (calcStore.displayValue.trim().length > 1 && ((calcStore.displayValue.slice(-1, calcStore.displayValue.length) === '0') && operators.indexOf(calcStore.displayValue.slice(-2, -1)) > 0)));
      return hang;
    };

    const hasHangingComma = () => {
      const parts = calcStore.displayValue.split(/[\+\-\*\/]/); // Split by operators
      return parts[parts.length - 1].includes('.'); // Check the last number part
    };

    const hangingOperator = () => {
      return operators.indexOf(calcStore.lastInput) >= 0;
    }

    const calculateResult = () => {
      calcStore.isCompleted = true;
      if (errMsgs.indexOf(calcStore.displayValue) >= 0) {
        calcStore.displayValue = '0';
      } else{
        calcStore.calculateResult();
      }
      /* try {
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
      } */
    };

    const setPrevAns = (newAns) => {
      if (errMsgs.indexOf(newAns) >= 0 || operators.indexOf(newAns) >= 0) {
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
      calcStore.logger('CLEAR');
      calcStore.isCompleted = true;
      calcStore.displayValue = '0';
    };

    const isOperatorDisabled = (operator) => {
      let disabled = operator === calcStore.lastInput;
      console.log("Operator: " + operator + ", disabled: " + disabled);
      return disabled;
    };

    const surprise = () => {
      if (calcStore.displayValue === '6969') {
        window.open('https://www.youtube.com/watch?v=nat2-OTTXyU', "_blank");
        calcStore.displayValue = ':)';
      }
    };

    return {
      calcStore,
      handleInput,
      clear,
      ans,
      del,
      isOperatorDisabled,
      surprise,
      calculateResult,
      hangingOperator,
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
  