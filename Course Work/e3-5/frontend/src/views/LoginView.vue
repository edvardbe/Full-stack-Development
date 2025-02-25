<template>
    <div class="login-container">
      <h2 v-if="isRegistering">Register</h2>
      <h2 v-else>Login</h2>
  
      <form @submit.prevent="handleSubmit">
        <input name="username" v-model="username" type="text" placeholder="Username" autocomplete="username" required />
        <input name="password" v-model="password" type="password" placeholder="Password" autocomplete="current-password" required />
        
        <button type="submit">{{ isRegistering ? "Register" : "Login" }}</button>
      </form>
  
      <p style="color: cornflowerblue; cursor: pointer;" @click="toggleMode">
        {{ isRegistering ? "Already have an account? Login here." : "No account? Register here." }}
      </p>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useAuthStore } from '@/stores/authStore';
  
  export default {

    data() {
      return {
        username: "",
        password: "",
        isRegistering: false,
        errorMessage: "",
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const endpoint = this.isRegistering ? "http://localhost:8080/api/users/register" : "http://localhost:8080/api/users/login";
          
          const response = await axios.post(endpoint, {
            username: this.username,
            password: this.password,
          }, { withCredentials: true }); // Viktig for CORS hvis cookies brukes
          const authStore = useAuthStore();
          if(response.status = 200){
            authStore.setUser(response.data); // Oppdater Zustand/Pinia store
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log("Push to '/', status: " + response.status);
            this.$router.push("/");
          }
        } catch (error) {
          console.log("Failed to handle submit" + error);
          this.errorMessage = "Invalid credentials or user already exists.";
        }
      },

      toggleMode() {
        this.isRegistering = !this.isRegistering;
        this.errorMessage = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: auto;
    text-align: center;
  }
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  .error {
    color: red;
  }
  </style>
  