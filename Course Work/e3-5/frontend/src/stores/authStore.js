import { defineStore } from "pinia";
import { useCalculatorStore } from "./calculatorStore";
import { useFeedbackStore } from "./feedbackStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");

      const calcStore = useCalculatorStore();
      calcStore.$reset(); 

      const feedbackStore = useFeedbackStore();
      feedbackStore.$reset(); 
    },
  },
});
