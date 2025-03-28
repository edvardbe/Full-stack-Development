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
        async submit(router) {
            const formData = {
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                designation: this.designation,
                feedback: this.feedback,
                userRating: this.userRating
            }

            const response = await axios.post('http://localhost:3000/feedback', formData).then(result => {
                console.log('Form submitted successfully');
                router.push("/success");
            }).catch(error => {
                console.error('There was an error submitting the form!', error);
            })

            return response;
        }
    }
});