// AllPostsView.vue
<template>
  <div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="loading" class="loading-state">로딩 중...</div>

    <BoardList
      v-else
      :board-title="'전체글'"
      :posts="posts"
      :posts-per-page="postsPerPage"
      :current-page="currentPage"
      :total-posts="totalPosts"
      @page-change="handlePageChange"
      @post-click="navigateToPost"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { BoardList } from "@/components";
import { getPostsByBoardId } from "@/apis";

const router = useRouter();
const route = useRoute();

const posts = ref([]);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const postsPerPage = ref(15);
const totalPosts = ref(0);

// const fetchPosts = async (boardId = 1, page = 1) => {
//   loading.value = true;
//   error.value = null;

//   try {
//     // URL 파라미터에 페이지 정보 추가
//     const response = await getPostsByBoardId(boardId);
//     posts.value = response.data;
//     console.log("posts.value: ", posts.value);
//     totalPosts.value = response.total || 0;
//     console.log("게시글 로딩 성공");
//   } catch (err) {
//     error.value =
//       "게시글을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.";
//     console.error("게시글 로딩 실패:", err);
//   } finally {
//     loading.value = false;
//   }
// };

onMounted(() => {
  const boardId = route.params.boardId || 1;
  fetchPosts(boardId, currentPage.value);
});

const handlePageChange = async (page) => {
  currentPage.value = page;
  const boardId = route.params.boardId || 1;
  await fetchPosts(boardId, page);

  // URL 업데이트
  router.push({
    query: { ...route.query, page },
  });
};

const navigateToPost = (postId) => {
  if (!postId) return;
  console.log("postId : ", postId);
  router.push({
    name: "BoardDetail",
    params: { postId: postId.toString() },
  });
};
</script>

<style scoped>
.error-message {
  color: red;
  padding: 1rem;
  text-align: center;
  margin: 1rem 0;
}

.loading-state {
  text-align: center;
  padding: 2rem;
}
</style>
