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
                console.log("Calculating: " + this.displayValue);
                const authStore = useAuthStore();

                const response = await axios.post('http://localhost:8080/api/calculations', {
                    username: authStore.user.username,
                    expression: this.displayValue
                });
                this.displayValue = response.data.toString();

                this.previousAnswer = this.displayValue;

                this.fetchLog();
            } catch (error) {
                console.log("Failed to calculate: " + error);
                this.displayValue = 'Error';
            }
        },

        async fetchLog(){
            
            this.db_log = [];
            const authStore = useAuthStore();
            const endpoint = 'http://localhost:8080/api/calculations/' + authStore.user.username;
            const response = await axios.get(endpoint)

            if(response.status == 200){
                response.data.forEach(element => {
                    console.log(element);
                    let entry = [element.id, element.expression, element.result, element.timestamp];
                    console.log(entry);
                    this.db_log.push(entry);
                });
            }

            this.log = this.db_log;

        },

        clearLog() {
            this.log = [];
        },

        async clearDBLog() {
            this.db_log = [];
            const authStore = useAuthStore();
            const endpoint = 'http://localhost:8080/api/calculations/' + authStore.user.username;
            const response = await axios.delete(endpoint);

            if(response.status == 200){
                console.log("Deleted last 10");
            } else {
                console.log("Failed deleting last 10");
            }

        },

        async deleteCalculation(id) {
            if (!id) {
                console.error("Error: ID is undefined");
                return;
            }
            try {
                await axios.delete(`http://localhost:8080/api/calculations/${id}`, { withCredentials: true });
                console.log("Deleted calculation with ID:", id);
            } catch (error) {
                console.error("Error deleting calculation:", error);
            }
            this.log.forEach(element => {
                console.log(element);
                if(element[0] == id){
                    this.log.splice(this.log.indexOf(element), 1)
                }
            });
        }
        
    }
});

