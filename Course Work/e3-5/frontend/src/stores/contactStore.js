import { defineStore } from 'pinia';
import axios from 'axios';


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
    actions: {
        async submit() {
            const formData = {
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                designation: this.designation,
                feedback: this.feedback,
                userRating: this.userRating
            }
            const response = await axios.post('http://localhost:8080/api/feedback', formData)
        }
    }
});