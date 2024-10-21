<template>
  <div
    class="grid grid-cols-[minmax(200px,_1fr)_minmax(1148px,_1280px)_minmax(200px,_1fr)] bg-orange-300"
  >
    <div class="col-span-1"></div>
    <nav class="col-span-1 w-full h-20 bg-slate-700 text-white">
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

<style scoped></style>
