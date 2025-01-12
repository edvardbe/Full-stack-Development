<template>
  <main>
    <div class="calculator">
      <div class="display">{{ displayValue }}</div>
      <div class="keys">
        <button class="operator" @click="clearDisplay()">C</button><button class="operator" @click="ans()">ANS</button><button class="operator">DEL</button><button class="operator" @click="handleInput('+')">+</button>
        <button @click="handleInput('1')">1</button><button @click="handleInput('2')">2</button><button @click="handleInput('3')">3</button><button class="operator" @click="handleInput('-')">-</button>
        <button @click="handleInput('4')">4</button><button @click="handleInput('5')">5</button><button @click="handleInput('6')">6</button><button class="operator" @click="handleInput('*')">*</button>
        <button @click="handleInput('7')">7</button><button @click="handleInput('8')">8</button><button @click="handleInput('9')">9</button><button class="operator" @click="handleInput('/')">/</button>
        <button class="operator" @click="suprise()"></button><button @click="handleInput('0')">0</button><button class="operator" @click="handleInput('.')">.</button><button class="equals" @click="calculateResult()">=</button>
      </div>
    </div>
    <div class="log-container">
      <button class="collapsible" :class="{collapsed: isCollapsed, revealed: !isCollapsed}" @click="toggleCollapse">{{ isCollapsed ? 'Show Log' : 'Hide Log' }}</button>
      <div class="content" v-show="!isCollapsed">
        <pre id="log" class=log></pre>
        <button @click="clearLog()"><span>&#128465;</span>Clear log</button>q
        
      </div>
    </div>
  </main>
</template>

<script>
import { handleInput, calculateResult, clearDisplay, suprise, setPrevAns, clearLog} from './logic/calculatorLogic.js';

export default {
  data() {
    return {
      displayValue: '0',
      prevAns: '0',
      isCollapsed: true, // Initial state
    };
  },
  methods: {
    handleInput(value) {
      this.displayValue = handleInput(this.displayValue, value);
    },
    calculateResult() {
      this.displayValue = calculateResult(this.displayValue);
      this.prevAns = setPrevAns(this.prevAns, this.displayValue);
    },
    ans(){
      this.displayValue = handleInput(this.displayValue, this.prevAns);
    },
    clearDisplay() {
      this.displayValue = clearDisplay();
    },
    suprise(){
      this.displayValue = suprise(this.displayValue)
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed; // Toggle the state
    },
    clearLog(){
      clearLog();
    }
  }
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
