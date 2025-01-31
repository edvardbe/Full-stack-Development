import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    log: [],
  }),
  
  actions: {
    logger(message) {
      this.log.push(message);
    },
    clearLog() {
      this.log = [];
    },
  },
});
