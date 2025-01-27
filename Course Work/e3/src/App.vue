<template>
  <Calculator/>
  <nav>
      <RouterLink to="/"></RouterLink>
  </nav>
  <RouterView/>
</template>

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