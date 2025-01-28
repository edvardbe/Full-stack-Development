<template>
  <Calculator/>
<!--   <div class="router-container">
 -->    <nav>
      <!-- Link displaying the HomeView which contains a link to the contact form -->
        <RouterLink to="/"></RouterLink>
    </nav>
    <RouterView/>
<!--   </div>
 --></template>

<script lang="js">
import { RouterLink, RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import Calculator from './components/Calculator.vue';
import ContactForm from './views/ContactForm.vue';


export default defineComponent({
  name: 'App',
  components: {
    Calculator,
  },
});
</script>