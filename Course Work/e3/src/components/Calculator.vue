<template>
  <div class="app-container">
    <div class="calculator">
      <div class="display">{{ store.displayValue }}</div>
      <div class="keys">
        <CalcButton class="operator" @click="store.clear()">C</CalcButton>
        <CalcButton class="operator" @click="store.ans()">ANS</CalcButton>
        <CalcButton class="operator" @click="store.del()">DEL</CalcButton>
        <CalcButton class="operator" @click="store.handleInput('+')" :disabled="store.isOperatorDisabled('+')">+</CalcButton>
        <CalcButton @click="store.handleInput('1')">1</CalcButton>
        <CalcButton @click="store.handleInput('2')">2</CalcButton>
        <CalcButton @click="store.handleInput('3')">3</CalcButton>
        <CalcButton class="operator" @click="store.handleInput('-')" :disabled="store.isOperatorDisabled('-')">-</CalcButton>
        <CalcButton @click="store.handleInput('4')">4</CalcButton>
        <CalcButton @click="store.handleInput('5')">5</CalcButton>
        <CalcButton @click="store.handleInput('6')">6</CalcButton>
        <CalcButton class="operator" @click="store.handleInput('*')" :disabled="store.isOperatorDisabled('*')">*</CalcButton>
        <CalcButton @click="store.handleInput('7')">7</CalcButton>
        <CalcButton @click="store.handleInput('8')">8</CalcButton>
        <CalcButton @click="store.handleInput('9')">9</CalcButton>
        <CalcButton class="operator" @click="store.handleInput('/')" :disabled="store.isOperatorDisabled('/')">/</CalcButton>
        <CalcButton class="operator" @click="store.surprise()"></CalcButton>
        <CalcButton @click="store.handleInput('0')">0</CalcButton>
        <CalcButton class="operator" @click="store.handleInput('.')" :disabled="store.isOperatorDisabled('.')">.</CalcButton>
        <CalcButton class="equals" @click="store.calculateResult()">=</CalcButton>
      </div>
    </div>
    <CalcLog/>
  </div>
</template>

<script>
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
    const store = useCalculatorStore();

    return { 
      store,
    };
  },
};
</script>

  
<style scoped>
  header {
    line-height: 1.5;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  
  @media (min-width: 1024px) {
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
  }
</style>
  