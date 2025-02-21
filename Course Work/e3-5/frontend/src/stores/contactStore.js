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
    actions: {
        async submit() {
            try {
                const response = await axios.post('http://localhost:8080/api/feedback', {
                    fname: this.fname,
                    lname: this.lname,
                    email: this.email,
                    designation: this.designation,
                    feedback: this.feedback,
                    userRating: this.userRating,
                });

            } catch (error) {
                
            }
        }
    }
});