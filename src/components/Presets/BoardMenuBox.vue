<template>
  <div class="board-side-menu p-4 bg-white shadow-sm">
    <div class="mb-6">
      <nav class="space-y-4">
        <router-link
          to="/ssammunity"
          :class="[
            'block py-2 hover:text-[#3396F4] text-[18px] font-[600] border-solid border-b-2 border-gray-200 transition',
            { 'text-[#3396F4] font-[600]': isExactRoute && !isSubRouteActive },
          ]"
        >
          전체글 보기
        </router-link>

        <div class="board-section">
          <h4
            :class="[
              'mb-2 text-[18px] font-[600]',
              { 'text-[#3396F4]': isSubRouteActive },
            ]"
          >
            싸뮤니티 게시판
          </h4>
          <div class="space-y-1">
            <router-link
              v-for="board in communityBoards"
              :key="board.id"
              :to="board.path"
              class="block py-1 hover:text-[#3396F4] text-[16px] transition"
              :class="{
                'text-[#3396F4] font-[600]': isCurrentRoute(board.path),
              }"
            >
              {{ board.name }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isExactRoute = computed(() => {
  return route.path === "/ssammunity";
});

const isSubRouteActive = computed(() => {
  return communityBoards.some((board) => route.path.startsWith(board.path));
});

const isCurrentRoute = (path) => {
  return route.path.startsWith(path);
};

const communityBoards = [
  { id: 1, name: "자유 게시판", path: "/ssammunity/free" },
  { id: 2, name: "가입 인사", path: "/ssammunity/greeting" },
  { id: 3, name: "익명 게시판", path: "/ssammunity/anonymous" },
];
</script>

<style scoped>
/* 호버 효과만 CSS로 정의 */
.router-link-hover {
  color: #3396f4;
}
</style>
