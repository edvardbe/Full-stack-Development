<template>
    <div class="log">
        <button class="collapsible" :class="{collapsed: this.isCollapsed, revealed: !this.isCollapsed}" @click="this.toggleCollapsed()">{{ this.isCollapsed ? 'Show Log' : 'Hide Log' }}</button>
        <div class="content-container" v-show="!this.isCollapsed">
        <div id="log" class="content">
          <div v-for="entry in calcStore.log" :key="entry[0]" class="entry">
            <span>{{ entry[1] }} = {{ entry[2] }} :</span>
            <span class="timestamp"> {{ entry[3] }} </span>
            <button @click="calcStore.deleteCalculation(entry[0])" class="delete-btn"></button>
          </div>

        </div>
          <div style="display: flex">
            <button class="log-btn" @click="calcStore.clearLog()">&#128465 Clear log</button>
            <button class="log-btn" @click="calcStore.fetchLog()">&#8634 Fetch log</button>
          </div>
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
          this.calcStore.fetchLog();
        };
      },
    },
    setup() {
      const calcStore = useCalculatorStore();
      return { calcStore };
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


    .entry {
      display: flex;  
      align-items: center;  /* Keeps elements aligned on the same line */
      gap: 5px;  /* Adds some space between elements */
    }

    .timestamp {
      color: gray;
      font-style: italic;
    }

    .delete-btn {
      background: none;
      color: white;
      border: none;
      padding: 2px 5px;
      cursor: pointer;
      border-radius: 4px;
    }

    .delete-btn:after{
    content:'x';
    }
    .delete-btn:hover:after{
        color: red;
        content:'x';
    }

    .log-btn{
      width: 50%;
      height: 30px;
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
    align-items: center;
    justify-items: center;
    }
</style>