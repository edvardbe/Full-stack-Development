import { defineStore } from 'pinia';
import axios from 'axios';


export const useFeedbackStore = defineStore('feedbackForm', {
    state: () => ({
        fname: '',
        lname: '',
        email: '',
        designation: '',
        feedback: '',
        userRating: 0,
    }),
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
            const response = await axios.post('http://localhost:3000/api/feedback', formData).then(result => {
                console.log('Form submitted successfully');
                router.push('/success'); 
            }).catch(error => {
                console.error('There was an error submitting the form!');
            })
        }
    }
});