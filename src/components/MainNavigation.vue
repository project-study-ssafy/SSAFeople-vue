<template>
  <div class="grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] boxShadow-3xl">
    <div class="col-span-1"></div>
    <nav
      class="col-span-1 w-full h-20 text-black flex space-x-20 items-center px-10"
    >
      <div class="hamburger flex flex-col cursor-pointer">
        <div class="bg-black mb-1 h-1 w-6"></div>
        <div class="bg-black mb-1 h-1 w-8"></div>
        <div class="bg-black h-1 w-4"></div>
      </div>
      <div class="flex space-x-10 text-base">
        <RouterLink to="/info" class="navbar-item rounded font-bold"
          >싸피 Info</RouterLink
        >
        <RouterLink to="/board" class="navbar-item rounded font-bold"
          >싸뮤니티</RouterLink
        >
        <RouterLink to="/challenge" class="navbar-item rounded font-bold"
          >코딩 Challenge</RouterLink
        >
        <RouterLink to="/util" class="navbar-item rounded font-bold"
          >싸피 Util</RouterLink
        >
      </div>
    </nav>
    <div class="col-span-1"></div>
  </div>
</template>

<script></script>

<style scoped></style>
