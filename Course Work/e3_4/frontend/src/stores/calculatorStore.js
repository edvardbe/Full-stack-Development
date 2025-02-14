import { defineStore } from 'pinia';
import axios from 'axios';


export const useCalculatorStore = defineStore('calculator', {
    state: () => ({
        displayValue: '0',
        previousAnswer: '',
        lastInput: null,
        isCompleted: true,
        log: [],
    }),

    persist: true,

    actions: {
        async calculateResult() {
            try {
                let logEntry = this.displayValue + " = ";

                const response = await axios.post('http://localhost:8080/api/calculate', {
                    expression: this.displayValue
                });
                this.displayValue = response.data.result.toString();

                logEntry += this.displayValue;

                this.previousAnswer = this.displayValue;

                this.logger(logEntry);

            } catch (error) {
                this.displayValue = 'Error';
            }
        },

        logger(message) {
            this.log.push(message);
        },

        clearLog() {
            this.log = [];
        },
    }
});

