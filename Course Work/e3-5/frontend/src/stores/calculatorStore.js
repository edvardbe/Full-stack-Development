import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore';


export const useCalculatorStore = defineStore('calculator', {
    
    state: () => ({
        displayValue: '0',
        previousAnswer: '',
        lastInput: null,
        isCompleted: true,
        log: [],
        db_log: [],

    }),

    actions: {
        async calculateResult() {
            try {
                let logEntry = this.displayValue + " = ";
                console.log("Calculating: " + this.displayValue);
                const authStore = useAuthStore();

                const response = await axios.post('http://localhost:8080/api/calculations', {
                    username: authStore.user.username,
                    expression: this.displayValue
                });
                this.displayValue = response.data.toString();

                logEntry += this.displayValue;

                this.previousAnswer = this.displayValue;

                this.logger(logEntry);

            } catch (error) {
                console.log("Failed to calculate: " + error);
                this.displayValue = 'Error';
            }
        },

        logger(message) {
            this.log.push(message);
        },

        async setLogDisplay(){
            this.db_log = [];

            const authStore = useAuthStore();
            const endpoint = 'http://localhost:8080/api/calculations/' + authStore.user.username;
            const response = await axios.get(endpoint)

            if(response.status == 200){
                response.data.forEach(element => {
                    let entry = element.expression + " = " + element.result + " : " + element.timestamp;
                    console.log(entry);
                    this.db_log.push(entry);
                });
            }
        },

        clearLog() {
            this.log = [];
        },
    }
});

