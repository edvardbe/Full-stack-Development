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
            console.log("Calculating: " + this.displayValue);
            const authStore = useAuthStore();
            const requestData = {
                username: authStore.username,
                expression: this.displayValue,
            }

            const token = authStore.token;
            console.log("Token in post: " + token)
            const response = axios.post('http://localhost:8080/api/calculations', requestData, { headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }}).then(response => {
                    
                this.displayValue = response.data.toString();
                this.previousAnswer = this.displayValue;
                this.fetchLog();
            })
            .catch(error => {
                console.log("Failed to calculate: " + error);
                this.displayValue = 'Error';
            });
                
            
        },

        async fetchLog(){
            try{
                this.db_log = [];
                const authStore = useAuthStore();
                const endpoint = 'http://localhost:8080/api/calculations/' + authStore.username;

                const token = authStore.token;

                console.log("Token in GET: " + token)

                const response = await axios.get(endpoint, { headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }});

                if(response.status == 200){
                    response.data.forEach(element => {
                        console.log(element);
                        let entry = [element.id, element.expression, element.result, element.timestamp];
                        console.log(entry);
                        this.db_log.push(entry);
                    });
                }

                this.log = this.db_log;
        } catch(error){
            console.error("Failed to get calculations: " + error);
        }

        },

        clearLog() {
            this.log = [];
        },

        async clearDBLog() {
            this.db_log = [];
            const authStore = useAuthStore();
            const endpoint = 'http://localhost:8080/api/calculations/' + authStore.username;
            const response = await axios.delete(endpoint, {withCredentials: true} );

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

