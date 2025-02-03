import { defineStore } from 'pinia';

export const useContactStore = defineStore('contactForm', {
    state: () => ({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        feedback: '',
        userRating: 0,
    }),
    persist: true,
});