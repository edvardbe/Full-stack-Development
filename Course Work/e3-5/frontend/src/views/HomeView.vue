<template>
  <div class="container">
    <Calculator/>
    <button class="link feedback" @click="feedback">Submit Feedback</button>

    <button class="link logout" v-if="authStore.user" @click="logout">Log out</button>
    
  </div>
</template>


<script lang="js">
import { defineComponent } from 'vue';
import Calculator from '../components/Calculator.vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';



export default defineComponent({
  name: 'App',
  components: {
    Calculator,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
      authStore.logout();
      router.push('/login'); // Send brukeren til login-siden etter logout
    };
    const feedback = () => {
      router.push('/feedback'); // Send brukeren til login-siden etter logout
    };

    return {
      authStore,
      feedback,
      logout,
    }
  }
});
</script>

<style global>
.container{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
}


.link {
  font-size: 18px;
  background-color: #3c3c3c;
  border: 1px solid black;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
  color: white;
  border-radius: 5px;
  padding: 5px;
  margin: 20px;
}

.feedback {
  margin: 200px 0 0 0;
}

.logout {
  align-self: flex-start;
}
.link:hover{
  background-color: #555;
}
</style>
