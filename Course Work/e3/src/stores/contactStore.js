import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore('calculator', {
    props: () => ({
        name: '',
        email: '',
        designation: '',
        feedback: [],
        rating: 0,
    }),
    
    actions: {
        submit(){

        },
    },
});
