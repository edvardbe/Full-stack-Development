<template>
    <div class="star-rating">
      <div
        v-for="i in maxStars"
        :key="i"
        @click="setRating(i)"
        @mouseover="hoverRating(i)"
        @mouseleave="resetHover"
        :class="[
          'star', i <= modelValue ? 'filled' : '', isHovered && i <= hoverValue && i > modelValue ? 'hover-filled' : ''
          
        ]"
      >
        ★
      </div>
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue';
  
  export default {
    props: {
      modelValue: {
        type: Number, // v-model value
        default: 0,
      },

      value: {
        type: Number,
        default: 0,
      },
      maxStars: {
        type: Number,
        default: 5,
      },
    },
    setup(props, { emit }) {
      
      const isHovered = ref(false);
      const hoverValue = ref(0);

      const rating = computed({
        get: () => props.modelValue,
        set: (newRating) => emit('update:modelValue', newRating), // Sync with parent
      });
      const setRating = (newRating) => {
        rating.value = newRating;
      };
  
      const hoverRating = (value) => {
        isHovered.value = true;
        hoverValue.value = value;
      };
  
      const resetHover = () => {
        hoverValue.value = 0;
        isHovered.value = false;
      };
  
      return {
        rating,
        hoverValue,
        isHovered,
        hoverRating,
        resetHover,
        setRating,
      };
    },
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: inline-block;
  }
  
  .star {
    display: inline-block;
    font-size: 24px;
    cursor: pointer;
    margin: 2px;
    color: rgb(222, 222, 222);
  }
  
  .filled {
    color: rgb(0, 83, 179);
  }
  .hover-filled{
    color: #959595;
  }
  </style>