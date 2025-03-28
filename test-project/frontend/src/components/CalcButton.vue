<template>
    <button :disabled="disabled" class="calc-button" :class="buttonClass">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'CalcButton',
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
    .calc-button {
        width: 100%;
        height: 100%;
        padding: 10% 0 10% 0;
        font-size: 18px;
        background-color: #3c3c3c;
        border: 1px solid #ddd;
        border-color: black;
        cursor: pointer;
        transition: background-color 0.3s;
        color: white;
        border-radius: 5px;
    }

    .calc-button.operator {
        background-color: #4b4b4b;
    }

    .calc-button.equals {
        background-color: rgb(255, 112, 60);
    }

    .calc-button:hover {
        background-color: #e0e0e0;
    }

    .calc-button:active {
        background-color: #c0c0c0;
    }
</style>
  