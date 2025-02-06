import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore('calculator', {
state: () => ({
    displayValue: '0',
    previousAnswer: '',
    errMsgs: ['Error', 'Undefined', ':)'],
    operators: ['+', '-', '/', '*'],
    commaHang: false,
    lastInput: null,
    isCompleted: true,
    }),
    persist: true,
});
