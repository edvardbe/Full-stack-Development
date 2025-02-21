<template>
  <Calculator/>
  <RouterView/>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import Calculator from './components/Calculator.vue';

export default defineComponent({
  name: 'App',
  components: {
    Calculator,
  },
});
</script>