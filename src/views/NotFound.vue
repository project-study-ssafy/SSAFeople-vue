<template>
  <div class="col-span-1"></div>
  <div class="col-span-1 flex items-center justify-center min-h-[800px]">
    <div class="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm">
      <div class="text-6xl text-red-500 mb-4">🚫</div>
      <h1 class="text-4xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </h1>
      <p class="text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <router-link
        to="/"
        class="inline-block px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
      >
        ⬅️ Go back to Home
      </router-link>
    </div>
  </div>
  <div class="col-span-1"></div>
</template>

<script setup></script>

<style scoped></style>
