<template>
  <div
    class="grid grid-cols-[minmax(200px,_1fr)_minmax(1148px,_1280px)_minmax(200px,_1fr)] bg-orange-300"
  >
    <div class="col-span-1"></div>
    <nav class="col-span-1 w-full h-20 bg-slate-700 text-white">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item">로고</RouterLink>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <RouterLink to="/">홈</RouterLink>
          <RouterLink to="/board">게시판</RouterLink>
        </div>
      </div>
    </nav>
    <div class="col-span-1"></div>
  </div>
</template>

<script></script>

<style scoped></style>
