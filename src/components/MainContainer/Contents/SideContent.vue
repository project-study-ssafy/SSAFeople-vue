<template>
  <div>
    <UserProfile class="sticky top-28 mb-5" />
    <BoardCard title="인기 게시판" :contexts="myContexts" class="col-span-1" />
  </div>
</template>
<script setup>
import { UserProfile, BoardCard } from "@/components";
const myContexts = [
  "자유게시판",
  "익명게시판",
  "팝니다/삽니다",
  "가입인사",
  "방내놔요",
];
</script>
<style scoped></style>
