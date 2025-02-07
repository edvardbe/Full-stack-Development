import { defineStore } from 'pinia';

export const useContactStore = defineStore('contactForm', {
    state: () => ({
        fname: '',
        lname: '',
        email: '',
        designation: '',
        feedback: '',
        userRating: 0,
    }),
    persist: true,
});