<template>
  <div class="container">
    
  <nav>
      <RouterLink to="/contact-form" class="contact-link">Contact Form</RouterLink>
  </nav>
  <RouterView/>
  </div>
</template>

<style global>
.container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 200px 30px 30px 30px;
  width: 50%;
  height: 100%;
}
.contact-link {
  font-size: 18px;
  background-color: #3c3c3c;
  border: 1px solid black;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
.contact-link:hover{
  background-color: #555;
}
</style>
