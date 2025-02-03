<template>
  <nav>
      <RouterLink to="/contact-form" class="contact-link">Contact Form</RouterLink>
  </nav>
  <RouterView/>
</template>

<style scoped>
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
