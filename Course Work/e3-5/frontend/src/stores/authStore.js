import { defineStore } from "pinia";
import { useCalculatorStore } from "./calculatorStore";
import { useFeedbackStore } from "./feedbackStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: null,
    token: null,
  }),
  actions: {
    setUser(tokenResponse) {
      this.token = tokenResponse.token;
      this.username = this.extractUsername(tokenResponse);
    },
    logout() {
      this.username = null;
      this.token = null;
      const calcStore = useCalculatorStore();
      calcStore.$reset(); 

      const feedbackStore = useFeedbackStore();
      feedbackStore.$reset(); 
    },
    extractUsername(authenticationResponse) {
      try {
        // Ensure cookieResponse exists and has a valid structure
        if (!authenticationResponse || !authenticationResponse.token) {
          console.error("Invalid cookie response:", authenticationResponse);
          return null;
        }

        const token = authenticationResponse.token; // Get JWT token

        console.log("Token: " + token);
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload

        return payload.sub || payload.username || null; // Extract username (check which field your backend uses)


      } catch (error) {
        console.error("Failed to extract username:", error);
        return null;
      }
    },
  },
});
