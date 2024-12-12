<!-- views/BoardDetailView.vue -->
<template>
  <div class="post-detail p-6 bg-white rounded-lg">
    <!-- 헤더 정보 -->
    <div class="border-y py-4 mb-6">
      <div class="flex items-center text-sm text-gray-500 mb-2">
        <span class="text-[var(--ssafy-blue)]">{{ post.boardName }}</span>
      </div>
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <span class="font-medium text-gray-600">{{ post.nickName }}</span>
          <span class="mx-2 text-gray-500">|</span>
          <span class="text-gray-500">{{ formatDate(post.createdAt) }}</span>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-500">조회 {{ post.viewCnt }}</span>
          <span class="mx-1 text-[#ccc]">|</span>
          <span class="flex items-center space-x-1 text-sm text-gray-500">
            <span>스크랩 {{ post.scrap }}</span>
          </span>
          <span class="mx-1 text-[#ccc]">|</span>
          <span class="flex items-center space-x-1 text-sm text-gray-500">
            <span>추천 {{ post.likes }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 본문 내용 -->
    <div class="post-content mb-8">
      {{ post.content }}
    </div>

    <!-- 스크랩, 추천 -->
    <div class="flex justify-center gap-3 mt-16 mb-8">
      <button
        class="flex items-center space-x-1 border-solid border-gray-200 border-[1px] px-3 py-2 rounded-[10px]"
      >
        <i class="bi bi-bookmark"></i>
        <span>스크랩 {{ post.scrap }}</span>
      </button>
      <button
        class="flex items-center space-x-1 border-solid border-gray-200 border-[1px] px-3 py-2 rounded-[10px]"
      >
        <i class="bi bi-hand-thumbs-up"></i>
        <span>추천 {{ post.likes }}</span>
      </button>
    </div>

    <!-- 게시글 메뉴 -->
    <div class="flex justify-end space-x-2 mb-6">
      <RouterLink
        :to="`/board/${boardId}/write`"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        글쓰기
      </RouterLink>

      <button
        v-if="isAuthor"
        @click="handleEdit"
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
      >
        수정
      </button>

      <button
        v-if="isAuthor"
        @click="handleDelete"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        삭제
      </button>

      <RouterLink
        :to="`/board/${boardId}`"
        class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
      >
        목록
      </RouterLink>
    </div>

    <!-- 덧글 섹션 -->
    <div
      class="comments-section border-solid border-t-[1px] border-gray-200 py-6"
    >
      <h3 class="text-lg font-bold mb-4">댓글 {{ comments.length }}</h3>

      <!-- 댓글 입력 -->
      <div class="mb-6">
        <textarea
          v-model="newComment"
          class="w-full p-3 border rounded-lg resize-none"
          rows="3"
          placeholder="댓글을 입력하세요"
        ></textarea>
        <div class="flex justify-end mt-2">
          <button
            @click="addComment"
            class="px-6 py-2 bg-[var(--ssafy-blue)] text-white rounded-lg hover:bg-[var(--ssafy-blue)]"
          >
            등록
          </button>
        </div>
      </div>

      <!-- 댓글 목록 -->
      <div class="space-y-4">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="comment-item border-b pb-4"
        >
          <!-- 댓글 내용 -->
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ comment.author }}</span>
            <span class="text-sm text-gray-500">{{ comment.createdAt }}</span>
          </div>
          <p class="mb-2">{{ comment.content }}</p>

          <!-- 답글 버튼 -->
          <div class="flex items-center space-x-4 text-sm">
            <button
              @click="comment.showReplyInput = !comment.showReplyInput"
              class="text-gray-500 hover:text-blue-500"
            >
              답글 달기
            </button>
          </div>

          <!-- 답글 입력 폼 -->
          <div v-if="comment.showReplyInput" class="mt-3 ml-8">
            <textarea
              v-model="comment.replyText"
              class="w-full p-2 border rounded-lg resize-none"
              rows="2"
              placeholder="답글을 입력하세요"
            ></textarea>
            <div class="flex justify-end mt-2">
              <button
                @click="addReply(comment)"
                class="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                답글 등록
              </button>
            </div>
          </div>

          <!-- 답글 목록 -->
          <div class="ml-8 mt-3 space-y-3">
            <div
              v-for="reply in comment.replies"
              :key="reply.id"
              class="border-l-2 pl-4"
            >
              <div class="flex justify-between mb-1">
                <span class="font-medium">{{ reply.author }}</span>
                <span class="text-sm text-gray-500">{{ reply.createdAt }}</span>
              </div>
              <p>{{ reply.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// import { getPostDetail } from "@/apis";
// import { storeToRefs } from "pinia";
// import { useBoardStore } from "@/stores/board";
import {
  getPostDetail,
  getComments,
  createComment,
  createReply,
} from "@/apis/board";

const post = ref({});
const comments = ref([]);
const newComment = ref("");
const isLoading = ref(false);
const route = useRoute();
// const boardStore = useBoardStore();
// const { post, comments, isLoading } = storeToRefs(boardStore);

// const props = defineProps({
//   id: {
//     type: String,
//     required: true,
//   },
// });

// 게시글 상세 정보 조회
const fetchPostDetail = async () => {
  try {
    isLoading.value = true;
    const boardId = 1; // 또는 route.params.boardId 등 적절한 값
    console.log("route.params.postId : ", route.params.postId);
    const response = await getPostDetail(boardId, route.params.postId);
    post.value = response.data;
    console.log("post.value : ", post.value.data);
  } catch (error) {
    console.error("게시글 조회 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

// ===============
// 댓글 관련
// ===============

// 댓글 목록 조회
const fetchComments = async () => {
  try {
    const response = await getComments(boardId, props.id);
    comments.value = response;
  } catch (error) {
    console.error("댓글 조회 실패:", error);
  }
};

// 댓글 추가
const addComment = async () => {
  if (!newComment.value.trim()) return;
  try {
    await createComment(boardId, props.id, newComment.value);
    newComment.value = "";
    await fetchComments();
  } catch (error) {
    console.error("댓글 등록 실패:", error);
  }
};

// 답글 추가
const addReply = async (comment) => {
  if (!comment.replyText.trim()) return;
  try {
    await createReply(boardId, props.id, comment.id, comment.replyText);
    comment.replyText = "";
    comment.showReplyInput = false;
    await fetchComments();
  } catch (error) {
    console.error("답글 등록 실패:", error);
  }
};

// 초기 데이터 로드
onMounted(async () => {
  try {
    await Promise.all([fetchPostDetail(), fetchComments()]);
  } catch (error) {
    console.error("데이터 로딩 실패:", error);
  }
});

// Methods
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// 예시 데이터
// const post = ref({
//   id: 1,
//   boardName: "의견 게시판",
//   title: "시험 기간 공부",
//   author: "작성자",
//   content:
//     "20일날 중간인데 다들 머릿속 전부터 공부 시작하나요?! 다들 지금부터면 시작하나요?",
//   createdAt: "2024.12.07 00:31",
//   viewCnt: 15,
//   likes: 0,
//   scrap: 0,
// });

// const comments = ref([
//   {
//     id: 1,
//     author: "댓글작성자1",
//     content: "저도 이제 시작해요",
//     createdAt: "2024.12.07 00:35",
//     showReplyInput: false,
//     replyText: "",
//     replies: [
//       {
//         id: 1,
//         author: "답글작성자1",
//         content: "화이팅하세요!",
//         createdAt: "2024.12.07 00:40",
//       },
//     ],
//   },
// ]);

// ======================
// 댓글 추가
// ======================

// const addComment = () => {
//   if (!newComment.value.trim()) return;

//   comments.value.push({
//     id: comments.value.length + 1,
//     author: "현재사용자",
//     content: newComment.value,
//     createdAt: new Date().toLocaleString(),
//     showReplyInput: false,
//     replyText: "",
//     replies: [],
//   });

//   newComment.value = "";
// };

// 서버 연결
// const addComment = async () => {
//   if (!newComment.value.trim()) return;

//   await boardStore.addComment(props.id, newComment.value);
//   newComment.value = '';
// };

// ======================
// 답글(대댓글) 추가
// ======================

// const addReply = (comment) => {
//   if (!comment.replyText.trim()) return;

//   comment.replies.push({
//     id: comment.replies.length + 1,
//     author: "현재사용자",
//     content: comment.replyText,
//     createdAt: new Date().toLocaleString(),
//   });

//   comment.replyText = "";
//   comment.showReplyInput = false;
// };

// 서버 연결
// const addReply = async (comment) => {
//   if (!comment.replyText.trim()) return;

//   await boardStore.addReply(comment.id, comment.replyText);
//   comment.replyText = '';
//   comment.showReplyInput = false;
// };

// onMounted(() => {
//   // API 호출 등 초기화 로직
//   console.log("게시글 ID:", route.params.id);
// });

// ====================
// 상세 조회 Data Mount
// ====================

// useRoute로 받아오는 대신 props 사용
// onMounted(async () => {
//   // API 호출 등에서 props.id 사용
//   console.log("게시글 ID:", props.id);
//   // const response = await fetchPostDetail(props.id);
//   // post.value = response.data;
// });

// 서버 연결
// onMounted(async () => {
//   try {
//     await Promise.all([
//       boardStore.fetchPostDetail(props.id),
//       boardStore.fetchComments(props.id),
//     ]);
//   } catch (error) {
//     console.error("데이터 로딩 실패:", error);
//   }
// });
</script>
