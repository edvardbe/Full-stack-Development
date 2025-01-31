import { defineStore } from 'pinia';
import axios from 'axios';

export const useContactStore = defineStore('calculator', {
    state: () => ({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        feedback: '',
        userRating: 0,
    }),
    
    actions: {
        updateRating(newRating) {
            // Handle the new rating as needed.
            this.store.userRating = newRating;
        },
    },
});
