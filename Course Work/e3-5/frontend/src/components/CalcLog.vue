<template>
    <div class="log">
        <button class="collapsible" :class="{collapsed: this.isCollapsed, revealed: !this.isCollapsed}" @click="this.toggleCollapsed()">{{ this.isCollapsed ? 'Show Log' : 'Hide Log' }}</button>
        <div class="content-container" v-show="!this.isCollapsed">
        <div id="log" class="content">
            <pre v-for="entry in store.log" :key="entry.id">{{ entry }}</pre>
        </div>
        <button class="clear-log" @click="store.clearLog()">&#128465 Clear log</button>
        </div>
    </div>
</template>
  
<script>
  import { useCalculatorStore } from '../stores/calculatorStore';
  export default {
    data() {
      return {
        isCollapsed: true,
      }
    },
    methods: {
      toggleCollapsed(){
        this.isCollapsed = !this.isCollapsed;
        if(this.isCollapsed){
          console.log("Log closed")
        } else {
          console.log("Log opened")
        };
      },
    },
    setup() {
      const store = useCalculatorStore();
      return { store };
    },
  };
</script>
  
<style scoped>
    .log {
      min-width: 300px;
      position: relative;
      margin-top: 10px;
      bottom: 0;
    }
    /* .log button{
      width: 100%;
        height: 60px;
        font-size: 24px;
        background-color: #3c3c3c;
        border: 1px solid #ddd;
        border-color: black;
        cursor: pointer;
        outline: none;
        transition: background-color 0.3s;
        color: white;
        border-radius: 5px;
    } */

    .clear-log{
      width: 50%;
      height: 30%;
      font-size: 14px;
      background-color: #3c3c3c;
      border: 1px solid #ddd;
      border-color: black;
      cursor: pointer;
      outline: none;
      transition: background-color 0.3s;
      color: white;
      border-radius: 5px;
      padding: 5px;
    }

    .collapsible {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
    padding: 14px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 18px;
    }

    .collapsible.collapsed {
    border-radius: 10px;
    background-color: #2d2d2d;
    color: white;
    }

    .collapsible.revealed {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #4b4b4b;
    color: white;
    }

    .content-container {
    width: 100%;
    padding: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #2d2d2d;
    color: white;
    font-size: 10px;
    }

    .content {
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
    margin: 0 0 5px 0;
    padding: 10px;
    border: 1px solid #4b4b4b;
    background-color: #2d2d2d;
    color: white;
    text-align: center;
    font-size: 10px;
    }
</style>