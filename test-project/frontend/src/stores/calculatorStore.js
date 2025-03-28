import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore';

export const useCalculatorStore = defineStore('calculator', {
    state: () => ({
        displayValue: '0',
        previousAnswer: '',
        lastInput: null,
        isCompleted: true,
        log: [],   // Used for displaying calculations
        db_log: [], // Stores database logs
    }),

    actions: {
        async calculateResult() {
            console.log("Calculating: " + this.displayValue);
            const authStore = useAuthStore();
            const requestData = {
                username: authStore.username,
                expression: this.displayValue,
            };

            const token = sessionStorage.getItem("token");
            console.log("Token in POST: " + token);

            try {
                const response = await axios.post('http://localhost:8080/api/calculations', requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.displayValue = response.data.toString();
                this.previousAnswer = this.displayValue;
                await this.fetchLog(); // Fetch updated logs after calculation
            } catch (error) {
                console.error("Failed to calculate:", error);
                this.displayValue = 'Error';
            }
        },

        async fetchLog() {
            try {
                const authStore = useAuthStore();
                const token = sessionStorage.getItem("token");
                const endpoint = `http://localhost:8080/api/calculations/${authStore.username}`;

                console.log("Token in GET: " + token);

                const response = await axios.get(endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    
                    this.db_log = response.data.map(element => [
                        element.id, element.expression, element.result, element.timestamp
                    ]);

                    // Update display log
                    this.log = [...this.db_log]; // Display latest calculations
                }
            } catch (error) {
                console.error("Failed to get calculations:", error);
            }
        },

        clearLog() {
            this.log = [];
        },

        async clearDBLog() {
            try {
                const authStore = useAuthStore();
                const token = sessionStorage.getItem("token");
                const endpoint = `http://localhost:8080/api/calculations/user/${authStore.username}`;

                const response = await axios.delete(endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    console.log("Deleted last 10 calculations from DB");
                } else {
                    console.log("Failed deleting last 10 calculations");
                }

                this.db_log = [];
                this.log = []; // Clear display as well
            } catch (error) {
                console.error("Error clearing DB log:", error);
            }
        },

        async deleteCalculation(id) {
            if (!id) {
                console.error("Error: ID is undefined");
                return;
            }

            try {
                const authStore = useAuthStore();
                const token = sessionStorage.getItem("token");
                const endpoint = `http://localhost:8080/api/calculations/${id}`;

                const response = await axios.delete(endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    console.log(`Deleted calculation with ID: ${id}`);

                    // Remove from db_log and log
                    this.db_log = this.db_log.filter(entry => entry[0] !== id);
                    this.log = this.log.filter(entry => entry[0] !== id);
                }
            } catch (error) {
                console.error("Error deleting calculation:", error);
            }
        }
    }
});
