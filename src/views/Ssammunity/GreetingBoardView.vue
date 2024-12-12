<!-- AllPostsView.vue -->
<template>
  <div>
    <BoardList
      :board-title="'가입 인사'"
      :posts="posts"
      :posts-per-page="15"
      @page-change="handlePageChange"
      @post-click="navigateToPost"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { BoardList } from "@/components";

const router = useRouter();
const boardStore = useBoardStore();

// store에서 posts 가져오기
const posts = computed(() => boardStore.posts);

// 컴포넌트 마운트 시 게시글 데이터 로드
onMounted(async () => {
  try {
    await boardStore.fetchPostsByBoardId(3); // boardId 없이 호출하면 전체 게시글 조회
  } catch (error) {
    console.error("게시글 로딩 실패:", error);
  }
});

const handlePageChange = (page) => {
  // 페이지 변경 처리
  console.log("Page changed:", page);
};

const navigateToPost = (postId) => {
  router.push({
    name: "BoardDetail",
    params: { postId: postId },
  });
};
</script>
