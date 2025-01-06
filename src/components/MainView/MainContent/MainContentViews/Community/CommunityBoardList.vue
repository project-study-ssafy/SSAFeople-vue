<template>
  <div>
    <BoardList
      :board-id="currentBoardId"
      :current-board="currentBoard"
      :posts="posts"
      :loading="loading"
      :error="error"
      :total-posts="totalPosts"
      :posts-per-page="postsPerPage"
      :current-page="currentPage"
      @post-click="navigateToPost"
    />

    <!-- 페이지네이션 컴포넌트 분리 -->
    <BoardPagination
      v-if="posts.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      :visible-pages="visiblePages"
      @page-change="handlePageChange"
      class="mt-6"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { BoardList, BoardPagination } from "@/components";
import { getPostsByBoardId, getBoards } from "@/apis";

const router = useRouter();
const route = useRoute();

const posts = ref([]);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const postsPerPage = ref(15); // 기본값 상향 조정
const totalPosts = ref(0);

const totalPages = computed(() =>
  Math.ceil(totalPosts.value / postsPerPage.value)
);

// 게시판 정보 매핑
const communityBoards = ref([
  // { id: 0, title: "전체글", type: "all" },
  // { id: 1, title: "자유게시판", type: "free" },
  // { id: 2, title: "가입인사", type: "greeting" },
  // { id: 3, title: "익명게시판", type: "anonymous" },
]);

// 현재 게시판 ID 계산
const currentBoardId = computed(() => Number(route.params.boardId) || 1);

// 현재 게시판 정보 계산
const currentBoard = computed(() => {
  if (communityBoards.value.length === 0) return null;
  return (
    communityBoards.value.find(
      (board) => board.boardId === currentBoardId.value
    ) || communityBoards.value[0]
  );
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pageSize = 5;
  const half = Math.floor(pageSize / 2);

  let start = Math.max(1, current - half);
  let end = Math.min(total, start + pageSize - 1);

  if (end === total) start = Math.max(1, end - pageSize + 1);
  if (start === 1) end = Math.min(total, pageSize);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const fetchPosts = async (BoardId, page = currentPage.value) => {
  loading.value = true;
  try {
    const response = await getPostsByBoardId(BoardId, postsPerPage.value, page);

    // 기존
    console.log("fetchPosts response", response);
    posts.value = response.data.content;
    // totalPosts.value = response.data.totalElements;

    totalPosts.value = response.data.totalElements;
  } catch (error) {
    error.value = "게시글을 불러오는데 실패했습니다.";
  } finally {
    loading.value = false;
  }
};

const handlePageChange = async (page) => {
  if (page === currentPage.value) return;

  try {
    await fetchPosts(currentBoardId.value, page);
    currentPage.value = page;
    router.push({ query: { ...route.query, page } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("페이지 변경 실패:", error);
  }
};

const navigateToPost = (postId) => {
  if (!postId) return;
  router.push({
    name: "BoardDetail",
    params: {
      boardId: currentBoardId.value.toString(),
      postId: postId.toString(),
    },
  });
};

watch(
  () => route.params.boardId,
  async (newBoardId) => {
    if (newBoardId !== undefined) {
      currentPage.value = 1;
      await fetchPosts(newBoardId, 1);
    }
  }
);

// 초기 데이터 값 세팅
onMounted(async () => {
  try {
    // 먼저 게시판 목록을 가져옴
    const response = await getBoards();
    communityBoards.value = Array.isArray(response) ? response : [];
    console.log("게시판 목록 로드됨:", communityBoards.value);

    // 게시판 목록이 로드된 후 게시글 로드
    if (communityBoards.value.length > 0) {
      await fetchPosts(currentBoardId.value, currentPage.value);
    }
  } catch (error) {
    console.error("초기 데이터 로드 실패:", error);
  }
});
</script>
