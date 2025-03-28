<template>
    <div class="container">
      <!-- Top-left button -->
      <div class="header">
        <nav>
        <!-- Link displaying X which contains a link to the HomeView-->
        <RouterLink name="exit" to="/" class="exit">X</RouterLink>
      </nav>
      <RouterView/>
    </div>
    <h1>Feedback successfully submitted!</h1>
    <nav>
        <RouterLink name="feedback-view" to="/feedback" class="feedback-link">New Feedback Submission</RouterLink>
    </nav>
    <RouterView/>
    </div>
  </template>
  
  <style scoped>
  
  /* Contact form container */
  
  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 50%;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: #3c3c3c;
  
  
    /* overflow-y: scroll;
    overflow-x: hidden; */
    /* Center content vertically */
  }
  
  /* Position the "x" button in the top-left corner */
  .header {
    position: absolute;
    top: 1rem;
    left: 1rem;
    margin: 0;
  }

  
  .exit {
    text-decoration: none;
    background-color: transparent;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  
  .exit:hover {
    color: red;
  }
  
  </style>
  