import { defineStore } from 'pinia';

export const useLogStore = defineStore('log', {
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
  persist: true,
});
