<template>
  <form class="contact-form">
    <!-- Top-left button -->
    <div class="header">
      <button class="exit" @click="$router.go(-1)">x</button>
    </div>

    <!-- Content of the contact form -->
    <div class="content">
      <div class="name-box">
        <div class="name">
        <label for="first-name">First name:</label>
        <input id="first-name" v-model="store.firstName" type="text" placeholder="Jane " autocomplete="given-name" required/> 
      </div>
      <div class="name">
      <label for="last-name">Last name:</label>
      <input id="last-name" v-model="store.lastName" type="text" placeholder="Doe" autocomplete="family-name" required/>
    </div>
  </div>

      
      <label for="email">E-mail:</label>
      <input id="email" v-model="store.email" placeholder="jane.doe@lorem.com" type="email" autocomplete="off" required/> 

      <div>Designation:</div>

      <div class="radio-group">
        <label>
          Student
          <input
            type="radio"
            name="designation"
            value="student"
            v-model="store.designation"
          />
        </label>
        <label>
          Teacher
          <input
            type="radio"
            name="designation"
            value="teacher"
            v-model="store.designation"
          />          
        </label>
        <label>
          Other
          <input
            type="radio"
            name="designation"
            value="other"
            v-model="store.designation"
          />       
        </label>
      </div>
      

      <p>Feedback:</p>
      <textarea id="feedback" v-model="store.feedback" placeholder="Write your feedback here..."></textarea>
      <div>
        <StarRating v-model="store.userRating" :max-stars="5" @ratingData="updateRating" />
        <p>Selected rating: {{ store.userRating }}</p>
      </div>
      <div class="footer">
        <input type="submit" :disabled="this.isDisabled"/>
      </div>
    </div>
    
  </form>
</template>

<script>
import StarRating from '@/components/StarRating.vue';
import { useContactStore } from '../stores/contactStore';

import { ref, computed } from 'vue';
  export default {
    name: 'ContactForm',
    setup() {
      const store = useContactStore();
      const isDisabled = computed(() => {
      return (
        !store.firstName || 
        !store.lastName ||
        !store.designation ||
        !store.email || 
        !store.userRating
      );
    });
      return { 
        store,
        isDisabled,
      };
    },
    components: {
      StarRating,
    },
    methods: {
      updateRating(newRating) {
        // Handle the new rating as needed.
        this.store.userRating = newRating;
      },
      
    },
    props: {
      // Optional prop to pass custom class for different button styles
      buttonClass: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };

  </script>

<style scoped>
/* Button styles */




/* Contact form container */
.contact-form {
  position: relative;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color:#3c3c3c;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center;
  justify-content: center; /* Center content vertically */
  padding: 1rem;
  gap: 10px;
}

/* Position the "x" button in the top-left corner */
.header {
  position: absolute; /* Makes the button independent of the flow */
  top: 1rem;
  left: 1rem;
  margin: 0;
}
.footer {
  bottom: 1rem;
  right: 1rem;
  margin: 0;
  position: absolute;
}

.exit {
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.exit:hover {
  color: red;
}


/* Contact form content styles */
.content {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  margin: 10px;
  gap: 10px;
}

.radio-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
}

.name-box{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 5px;
}
.name {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

input[type=text], select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

input[type=email], select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
input[type=submit] {
  font-size: 24px;
  background-color: #3c3c3c;
  border: 1px solid black;
  cursor: default;
  outline: none;
  transition: background-color 0.3s;
  color: white;
  border-radius: 5px;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover:not(:disabled){
  background-color: #555;
}

input[type=submit]:disabled{
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
