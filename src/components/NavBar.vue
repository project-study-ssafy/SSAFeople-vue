<template>
  <div class="grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-orange-300">
    <div class="col-span-1"></div>
    <nav
      class="col-span-1 w-full min-w-[1148px] max-w-[1280px] h-20 mx-auto bg-slate-700 text-white"
    >
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
    <div class="col-span-1"></div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar-item {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
}

.navbar-item:hover {
  text-decoration: underline;
}
</style>
