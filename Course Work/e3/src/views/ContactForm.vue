<template>
  <form class="container" @submit.prevent="submitForm">
    <!-- Top-left button -->
    <div class="header">
      <nav>
      <!-- Link displaying the X which contains a link to the HomeView-->
        <RouterLink to="/" class="exit">X</RouterLink>
    </nav>
    <RouterView/>

    </div>

    <!-- Content of the contact form -->
    <div class="content">
      <div class="name-box">
        <div class="name">
          <label for="fname">First name:</label>
          <input name="fname" v-model="store.firstName" type="text" placeholder="Jane " autocomplete="given-name"
            required />
        </div>
        <div class="name">
          <label for="lname">Last name:</label>
          <input name="lname" v-model="store.lastName" type="text" placeholder="Doe" autocomplete="family-name"
            required />
        </div>
      </div>


      <label for="email">E-mail:</label>
      <input
        name="email"
        v-model="store.email"
        placeholder="jane.doe@lorem.com"
        type="email"
        autocomplete="off"
        required
      />
      <span v-if="!validateEmail(store.email)" class="error">Invalid email format</span>

      <p>Designation:</p>

      <div class="radio-group">
        <label>
          Student:
          <input type="radio" name="designation" value="Student" v-model="store.designation" />
        </label>
        <label>
          Teacher:
          <input type="radio" name="designation" value="Teacher" v-model="store.designation" />
        </label>
        <label>
          Other:
          <input type="radio" name="designation" value="Other" v-model="store.designation" />
        </label>
      </div>


      <p>Feedback:</p>
      <textarea name="feedback" v-model="store.feedback" placeholder="Write your feedback here..." required></textarea>
      <div>
        <StarRating v-model="store.userRating" :max-stars="5"/>
        <p>Selected rating: {{ store.userRating }}</p>
      </div>
      
    </div>
    <div class="footer">
        <input type="submit" :disabled="!validateForm()" />
      </div>

  </form>
</template>

<script>
import { useRouter } from 'vue-router';
import StarRating from '@/components/StarRating.vue';
import { useContactStore } from '../stores/contactStore';
import axios from 'axios';

import { ref, computed } from 'vue';

export default {
  name: 'ContactForm',

  setup() {
    const router = useRouter();
    const validateForm = () => {
      return !!(
        store.firstName &&
        store.lastName &&
        validateEmail(store.email) &&
        store.designation &&
        store.feedback &&
        store.userRating
      );
    };
    
    const submitForm = () => {
      if (!validateForm) {
        console.error('Form is invalid');
        return;
      }

      const formData = {
        "fname": store.firstName,
        "lname": store.lastName,
        "email": store.email,
        "designation": store.designation,
        "feedback": store.feedback,
        "rating": store.userRating
      }
      axios.post('http://localhost:3000/data', formData)
        .then(response => {
          console.log('Form submitted successfully', response);
          router.push('/success-view');
        })
        .catch(error => {
          console.error('There was an error submitting the form!', error);
        });
    };
    const store = useContactStore();

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    return {
      store,
      validateEmail,
      validateForm,
      submitForm,
    };
  },
  components: {
    StarRating,
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

/* Contact form container */

.container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 50%;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #3c3c3c;


  /* overflow-y: scroll;
  overflow-x: hidden; */
  /* Center content vertically */
}

/* Position the "x" button in the top-left corner */
.header {
  position: absolute;
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
  text-decoration: none;
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
  width: 100%;
  height: 80%;
  display: grid;
  border: 1px solid #4b4b4b;
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  margin: 10px;
  gap: 2%;
  overflow-y: auto;

}

.radio-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.name-box {
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

input[type=text],
select,
textarea {
  width: 100%;
  /* Full width */
  padding: 12px;
  /* Some padding */
  border: 1px solid #ccc;
  /* Gray border */
  border-radius: 4px;
  /* Rounded borders */
  box-sizing: border-box;
  /* Make sure that padding and width stays in place */
  margin-top: 6px;
  /* Add a top margin */
  margin-bottom: 16px;
  /* Bottom margin */
  resize: vertical
    /* Allow the user to vertically resize the textarea (not horizontally) */
}

input[type=email],
select,
textarea {
  width: 100%;
  /* Full width */
  padding: 12px;
  /* Some padding */
  border: 1px solid #ccc;
  /* Gray border */
  border-radius: 4px;
  /* Rounded borders */
  box-sizing: border-box;
  /* Make sure that padding and width stays in place */
  margin-top: 6px;
  /* Add a top margin */
  margin-bottom: 16px;
  /* Bottom margin */
  resize: vertical
    /* Allow the user to vertically resize the textarea (not horizontally) */
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
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover:not(:disabled) {
  background-color: #555;
}

input[type=submit]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
