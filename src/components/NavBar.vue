<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">로고</router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  /* max-width: 1280px; */
  margin: 0 auto;
  background-color: #333;
  color: white;
  border: 1px solid blue;
}

.navbar-item {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
}

.navbar-item:hover {
  text-decoration: underline;
}
</style>
