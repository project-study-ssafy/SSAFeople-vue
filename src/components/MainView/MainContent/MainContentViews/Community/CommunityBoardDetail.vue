<!-- views/BoardDetailView.vue -->
<template>
  <div class="post-detail p-6 bg-white rounded-lg">
    <!-- 헤더 정보 -->
    <div class="border-y py-4 mb-6">
      <div class="flex items-center text-sm text-gray-500 mb-2">
        <span
          class="text-[var(--ssafy-blue)] bg-[#f5f5f5] px-2 py-1 rounded-2 mb-1"
          >{{ currentBoard?.boardName }}</span
        >
      </div>
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <span class="font-medium text-gray-600">{{ post.nickName }}</span>
          <span class="mx-2 text-gray-500">|</span>
          <span class="text-gray-500">{{ formatDate(post.createdAt) }}</span>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-500">조회 {{ post.viewCount }}</span>
          <span class="mx-1 text-[#ccc]">|</span>
          <span class="flex items-center space-x-1 text-sm text-gray-500">
            <span>댓글수 {{ comments.length }}</span>
          </span>
          <span class="mx-1 text-[#ccc]">|</span>
          <span class="flex items-center space-x-1 text-sm text-gray-500">
            <span>추천 {{ post.likeCount }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 본문 내용 -->
    <div class="post-content mb-8">
      <!-- 이미지 슬라이드 -->
      <div v-if="post.images?.length">
        <!-- 메인 스와이퍼 -->
        <div
          class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden"
        >
          <swiper
            :modules="[Navigation, Thumbs]"
            :slides-per-view="1"
            :space-between="10"
            :thumbs="{ swiper: thumbsSwiper }"
            class="mainSwiper mb-4 h-full"
            :pagination="{ clickable: true }"
          >
            <swiper-slide
              v-for="image in post.images"
              :key="image.fileId"
              class="flex items-center justify-center"
            >
              <img
                :src="image.fileUrl"
                :alt="image.fileName"
                class="w-full object-contain"
              />
            </swiper-slide>
          </swiper>
        </div>

        <!-- 썸네일 스와이퍼 -->
        <div class="mt-4">
          <swiper
            @swiper="setThumbsSwiper"
            :modules="[Navigation, Thumbs]"
            navigation
            :slides-per-view="5"
            :space-between="10"
            :watch-slides-progress="true"
            class="thumbSwiper"
          >
            <swiper-slide
              v-for="image in post.images"
              :key="image.fileId"
              class="cursor-pointer rounded-[20px] overflow-hidden"
            >
              <img
                :src="image.fileUrl"
                :alt="image.fileName"
                class="w-full h-full object-cover transition duration-200 border-solid border-[1px] border-gray-0 hover:scale-[1.1] hover:border-gray-500"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- 본문 텍스트 -->
      {{ post.content }}
    </div>

    <!-- 스크랩, 추천 -->
    <div class="flex justify-center gap-3 mt-16 mb-8">
      <!-- <button
        class="flex items-center space-x-1 border-solid border-gray-200 border-[1px] px-3 py-2 rounded-[10px]"
      >
        <i class="bi bi-bookmark"></i>
        <span>스크랩 {{ post.scrap }}</span>
      </button> -->
      <button
        @click="toggleLike"
        class="flex items-center space-x-1 border-solid border-gray-200 border-[1px] px-6 py-3 rounded-[10px] transition-colors duration-300 hover:border-[var(--ssafy-blue)]"
      >
        <i class="bi bi-hand-thumbs-up"></i>
        <span>추천 {{ post.likeCount }}</span>
      </button>
    </div>

    <!-- 게시글 메뉴 -->
    <div
      class="flex justify-between space-x-2 mb-6 border-t-[1px] border-gray-100 py-6"
    >
      <div class="flex gap-3">
        <RouterLink
          :to="`/board/${boardId}/write`"
          class="px-5 py-2 bg-[var(--ssafy-blue)] text-white font-[600] rounded-lg hover:bg-[var(--ssafy-blue-strong)] transition-colors"
        >
          글쓰기
        </RouterLink>

        <button
          v-if="isAuthor"
          @click="handleEdit"
          class="px-5 py-2 border-solid border-[1px] border-gray-200 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          수정
        </button>

        <button
          v-if="isAuthor"
          @click="handleDelete"
          class="px-5 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          삭제
        </button>
      </div>

      <RouterLink
        :to="`/board/board/${boardId}`"
        class="px-5 py-2 border-solid border-[1px] border-gray-200 text-gray-700 rounded hover:bg-gray-200 transition-colors"
      >
        목록
      </RouterLink>
    </div>

    <!-- 덧글 섹션 -->
    <div class="comments-section border-solidpy-6 pt-6">
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
            class="px-6 py-2 bg-[var(--ssafy-blue)] text-white font-[600] rounded-lg hover:bg-[var(--ssafy-blue-strong)] transition-colors"
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
            <span class="font-medium">{{ comment.nickName }}</span>
            <div class="flex gap-4 items-center">
              <span class="text-sm text-gray-500">{{
                formatDate(comment.createdAt)
              }}</span>

              <div
                class="comment-btns relative"
                v-if="userStore.userData.id === comment.userId"
              >
                <button
                  @click="toggleCommentMenu(comment.id)"
                  class="p-1 hover:bg-gray-100 rounded-full"
                >
                  <i
                    class="bi bi-three-dots-vertical text-xs text-gray-500"
                  ></i>
                </button>
                <!-- 토글 메뉴 -->
                <div
                  v-show="activeCommentId === comment.id"
                  :class="{ CommentBtnsToggleEvent: block }"
                  class="w-[100px] absolute right-7 top-0 mt-0 bg-white border rounded-lg z-10"
                >
                  <button
                    @click="delComment(comment.id)"
                    class="w-full text-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 text-left"
                  >
                    댓글 삭제
                  </button>
                </div>
              </div>
            </div>
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
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/auth"; // 사용자 정보
import {
  getPostDetail,
  getComments,
  createComment,
  createReply,
  deletePost,
  deleteComment,
  getBoards,
  togglePostLike,
} from "@/apis/board";
// 스와이퍼 관련
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const post = ref({});
const comments = ref([]);
const newComment = ref("");
const isLoading = ref(false);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore(); // 사용자 store 인스턴스 생성
// script 부분에 상태 추가
const activeCommentId = ref(null); // 현재 열린 메뉴의 댓글 ID 저장
const currentBoard = ref(null); // 현게시판 정보 저장
const isLiked = ref(false);

// ===========================
// 현사용자 == 게시글작성자 확인
// ===========================
const isAuthor = computed(() => {
  // userStore의 사용자 ID와 게시글 작성자 ID 비교
  return userStore.userData.id === post.value.userId;
});

const boardId = ref(route.params.boardId || 1); // boardId를 ref로 정의

// ==========================
// 게시글 관련
// ==========================

// 게시글 상세 정보 조회
const fetchPostDetail = async () => {
  console.log("fetchPostDetail");
  try {
    isLoading.value = true;
    // const boardId = route.params.boardId; // 또는 route.params.boardId 등 적절한 값
    console.log("route.params.postId : ", route.params.postId);
    console.log("route.params.boardId : ", route.params.boardId);
    const response = await getPostDetail(
      route.params.boardId,
      route.params.postId
    );
    post.value = response.data;

    //임시 더미 이미지 데이터
    post.value.images = [
      // {
      //   fileId: 1,
      //   fileName: "image1.jpg",
      //   fileUrl: "https://picsum.photos/800/600?random=1",
      // },
      // {
      //   fileId: 2,
      //   fileName: "image2.jpg",
      //   fileUrl: "https://picsum.photos/800/600?random=2",
      // },
      // {
      //   fileId: 3,
      //   fileName: "image3.jpg",
      //   fileUrl: "https://picsum.photos/800/600?random=3",
      // },
      // {
      //   fileId: 4,
      //   fileName: "image4.jpg",
      //   fileUrl: "https://picsum.photos/800/600?random=4",
      // },
      // {
      //   fileId: 5,
      //   fileName: "image5.jpg",
      //   fileUrl: "https://picsum.photos/800/600?random=5",
      // },
      // {
      //   fileId: 6,
      //   fileName: "image6.jpg",
      //   fileUrl: "https://picsum.photos/800/600?random=6",
      // },
      // {
      //   fileId: 7,
      //   fileName: "image7.jpg",
      //   fileUrl: "https://picsum.photos/800/600?random=7",
      // },
    ];

    console.log("post : ", post.value);
  } catch (error) {
    console.error("게시글 조회 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

// 게시글 수정
const handleEdit = () => {
  router.push({
    name: "PostEdit",
    boardId: route.params.boardId,
    postId: route.params.postId,
  });
};

// 게시글 삭제
const handleDelete = async () => {
  try {
    await deletePost(route.params.boardId, route.params.postId);
    console.log("게시글 삭제 성공");
    router.push(`/board/${route.params.boardId}`);
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
  }
};

const toggleLike = async () => {
  // let previousLikeCount;
  let previousIsLiked;

  try {
    // 현재 상태 저장
    // previousLikeCount = post.value.likeCount;
    previousIsLiked = isLiked.value;

    // UI 즉시 업데이트
    post.value.likeCount += isLiked.value ? -1 : 1;
    isLiked.value = !isLiked.value;
    console.log("Update isLiked : ", isLiked.value);

    // 현재 좋아요 상태를 API에 전달
    const response = await togglePostLike(
      boardId.value,
      route.params.postId,
      previousIsLiked // 이전 상태를 전달하여 어떤 동작을 할지 결정
    );

    // 서버 응답으로 상태 동기화
    if (response.success) {
      post.value.likeCount = response.data.likeCount;
      isLiked.value = response.data.isLiked;
    }
  } catch (error) {
    // 에러 시 이전 상태로 복구
    // post.value.likeCount = previousLikeCount;
    // isLiked.value = previousIsLiked;
    console.error("좋아요 처리 실패:", error);
    console.log("Revoke isLiked : ", isLiked.value);
  }
};

// ===============
// 댓글 관련
// ===============

// 댓글 목록 조회
const fetchComments = async () => {
  try {
    const response = await getComments(boardId.value, route.params.postId);
    comments.value = response.data.content;

    console.log("댓글 데이터:", response.data.content); // 데이터 구조 확인용
  } catch (error) {
    console.error("댓글 조회 실패:", error);
  }
};

// 댓글 추가
const addComment = async () => {
  if (!newComment.value.trim()) return;
  try {
    await createComment(boardId.value, route.params.postId, newComment.value);
    newComment.value = "";
    await fetchComments();
  } catch (error) {
    console.error("댓글 등록 실패:", error);
  }
};

// 댓글 삭제
const delComment = async (commentId) => {
  try {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    const response = await deleteComment(
      boardId.value,
      route.params.postId,
      commentId
    );

    if (response.success) {
      await fetchComments(); // 댓글 목록 새로고침
      console.log("댓글 삭제 성공");
      post.value.commentCount -= 1;
    }
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
  }
};

// 토글 메뉴 핸들러 함수 추가
const toggleCommentMenu = (commentId) => {
  activeCommentId.value =
    activeCommentId.value === commentId ? null : commentId;
};

// 답글 추가
const addReply = async (comment) => {
  if (!comment.replyText.trim()) return;
  try {
    await createReply(
      boardId.value,
      route.params.postId,
      comment.id,
      comment.replyText
    );
    comment.replyText = "";
    comment.showReplyInput = false;
    await fetchComments();
  } catch (error) {
    console.error("답글 등록 실패:", error);
  }
};

// ===============
// 게시판 정보 조회
// ===============

// 현재 게시판 정보 조회 함수
const fetchBoardInfo = async () => {
  try {
    const response = await getBoards();
    const boards = Array.isArray(response) ? response : [];
    currentBoard.value = boards.find(
      (board) => board.boardId === Number(route.params.boardId)
    );
  } catch (error) {
    console.error("게시판 정보 조회 실패:", error);
  }
};

// ===============
// 초기 데이터 로드
// ===============
onMounted(async () => {
  console.log("boardDetailView onMounted");
  try {
    await Promise.all([fetchPostDetail(), fetchComments(), fetchBoardInfo()]);
  } catch (error) {
    console.error("데이터 로딩 실패:", error);
  }
});

// 날짜 표시 방식
const formatDate = (date) => {
  if (!date || !Array.isArray(date)) return "-";

  try {
    const [year, month, day, hour, minute] = date;
    const formattedDate = new Date(year, month - 1, day, hour, minute);

    // 날짜와 시간 모두 표시
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식 사용
    }).format(formattedDate);
  } catch (error) {
    console.error("날짜 형식 변환 오류:", error);
    return "-";
  }
};

// Swiper 관련 상태
const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

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
</script>

<style>
/* Swiper 커스텀 스타일 */
.mainSwiper {
  @apply w-full;
}

.mainSwiper :deep(.swiper-wrapper) {
  @apply items-center; /* 슬라이드 내 수직 중앙 정렬 */
}

.mainSwiper :deep(.swiper-slide) {
  @apply h-auto; /* 슬라이드 높이 자동 조정 */
  min-height: 300px; /* 최소 높이 설정 */
  max-height: 600px; /* 최대 높이 설정 */
}

.mainSwiper :deep(.swiper-button-next),
.mainSwiper :deep(.swiper-button-prev) {
  @apply text-gray-800 opacity-50 hover:opacity-100 transition-opacity;
}

.mainSwiper :deep(.swiper-button-next)::after,
.mainSwiper :deep(.swiper-button-prev)::after {
  @apply text-2xl;
}

.thumbSwiper {
  @apply w-full mt-4;
}

.thumbSwiper :deep(.swiper-slide) {
  @apply opacity-50 transition-opacity;
  height: 80px; /* 썸네일 높이 고정 */
}

.thumbSwiper :deep(.swiper-slide-thumb-active) {
  @apply opacity-100 ring-2 ring-blue-500 rounded;
}

/* 반응형 이미지 컨테이너 */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 비율 */
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
