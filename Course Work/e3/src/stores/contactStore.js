import { defineStore } from 'pinia';
import { getDefaultFormatCodeSettings } from 'typescript';

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
        isDisabled(){
            console.log("Email: " + this.email + " Name: " + this.firstName + " " + this.lastName + ", Designation: " + this.designation);
            return this.userRating === 0 ||
                !this.email.trim() ||
                !this.firstName.trim() ||
                !this.lastName.trim() ||
                !this.designation.trim();
        },
    },
});
