import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: null,
    token: sessionStorage.getItem("token") || null, // Hent token ved oppstart
  }),
  actions: {
    setUser(tokenResponse) {
      this.token = tokenResponse.token;
      sessionStorage.setItem("token", tokenResponse.token); // Lagre token i sessionStorage
      this.username = this.extractUsername(tokenResponse.token);
    },
    logout() {
      sessionStorage.removeItem("token"); // Fjern token ved utlogging
      this.$reset();
    },
    extractUsername(token) {
      try {
        if (!token) return null;
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        return payload.sub || payload.username || null;
      } catch (error) {
        console.error("Failed to extract username:", error);
        return null;
      }
    },
    initializeAuth() {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        this.token = storedToken;
        this.username = this.extractUsername(storedToken);
      }
    },
  },
});
