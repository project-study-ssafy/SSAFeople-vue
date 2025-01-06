<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <AppHeader
          class="font-[600] text-[#222] mb-3"
          :type="2"
          :text="currentBoard?.boardName || '게시판'"
        />
        <p class="block ml-1">
          {{ currentBoard?.boardDescription || "게시판" }}
        </p>
      </div>
      <RouterLink
        :to="`/board/board/${boardId}/write`"
        class="px-5 py-2 bg-[var(--ssafy-blue)] text-white font-[600] rounded-lg hover:bg-[var(--ssafy-blue-strong)] transition-colors"
      >
        글쓰기
      </RouterLink>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-center py-8">
      <span class="text-gray-600">로딩 중...</span>
    </div>

    <!-- 에러 상태 -->
    <!-- <div v-else-if="error" class="text-center py-8">
      <span class="text-gray-500">{{ error }}</span>
    </div> -->

    <div v-if="posts.length >= 0" class="w-full">
      <div class="w-full border-solid border-t-[1px] border-gray-300">
        <!-- 공지사항 -->
        <!-- <div
          v-for="notice in notifications"
          :key="`notice-${notice.postId}`"
          class="flex items-center px-4 py-3 bg-[#f8f9fa] hover:bg-[#f1f3f5] cursor-pointer transition-colors border-b border-gray-300"
          @click="handlePostClick(notice.postId)"
        >
          <div class="flex items-center flex-grow">
            <span class="px-2 py-1 text-sm text-blue-600 font-bold mr-2"
              >공지</span
            >
            <span class="font-bold">{{ notice.title }}</span>
          </div>
          <div class="flex items-center gap-8">
            <span class="w-32 text-center">{{ notice.createdAt }}</span>
            <span class="w-24 text-center">{{ notice.author }}</span>
            <span class="w-16 text-center">{{
              formatNumber(notice.commentCnt)
            }}</span>
            <span class="w-16 text-center">{{
              formatNumber(notice.likes)
            }}</span>
            <span class="w-16 text-center">{{
              formatNumber(notice.scrap)
            }}</span>
            <span class="w-16 text-center">{{
              formatNumber(notice.viewCnt)
            }}</span>
          </div>
        </div> -->

        <!-- 일반 게시글 -->
        <div
          v-for="(post, index) in normalPosts"
          :key="`post-${post.id}`"
          class="flex items-center px-4 py-5 hover:bg-[#f7f7f7] cursor-pointer transition-colors border-b border-gray-300"
          @click="handlePostClick(post.id)"
        >
          <div class="post-info flex items-start justify-start flex-grow">
            <!--  이미지 썸네일 영역 -->
            <div
              v-if="post.imageUrls && post.imageUrls.length > 0"
              class="relative group mr-3"
            >
              <div class="w-[100px] h-[100px] rounded-xl overflow-hidden">
                <img
                  :src="post.imageUrls[0]"
                  alt="썸네일"
                  class="w-full h-full object-cover"
                />
                <div
                  v-if="post.imageUrls && post.imageUrls.length > 1"
                  class="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                >
                  <span
                    ><i class="bi bi-copy text-white"></i>
                    {{ post.imageUrls.length }}</span
                  >
                </div>
              </div>
            </div>
            <!--  게시글 정보 영역 -->
            <div class="flex flex-col jutify-between flex-grow">
              <div class="">
                <div>
                  <span class="w-24 text-center font-[600] text-gray-600">{{
                    post.nickName
                  }}</span>
                  <em class="mx-2">·</em>
                  <span class="w-32 text-center text-gray-400">{{
                    formatDate(post.createdAt)
                  }}</span>
                </div>
                <span class="block text-[18px] font-[600] text-gray-800">{{
                  post.title
                }}</span>
              </div>
              <!-- icons -->
              <div class="flex items-center gap-8 justify-end w-full">
                <!--  조회수, 덧글수, 좋아요,-->
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1">
                    <i class="bi bi-eye"></i>
                    <span>{{ post.viewCount ? post.viewCount : "0" }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <i class="bi bi-chat-dots"></i>
                    <span>{{ post.viewCount ? post.commentCount : "0" }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <i class="bi bi-hand-thumbs-up"></i>
                    <span>{{ post.viewCount ? post.likeCount : "0" }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 데이터 없음 상태 -->
    <div v-else class="text-center py-8">
      <span class="text-gray-500">게시글이 없습니다.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import { AppHeader } from "@/components";
const emit = defineEmits(["post-click"]);

const props = defineProps({
  boardId: {
    type: [Number, String],
    required: true,
  },
  currentBoard: {
    type: Object,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  postsPerPage: {
    type: Number,
    default: 3,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPosts: {
    type: Number,
    required: true,
  },
});

console.log("###currentBoard", props.currentBoard);
//=========================
// 페이지네이션
// ========================

// State
// const currentPage = computed(() => props.currentPage);

// 게시글 배열을 ref로 초기화
const notifications = ref([]);
const normalPosts = ref([]);

// props.boardId 변경 감지
watch(
  () => props.boardId,
  () => {
    // boardId가 변경되면 배열 초기화
    console.log("props.boardId 변경 감지 : ", props.boardId);
    notifications.value = [];
    normalPosts.value = [];

    // posts prop이 새로 전달되면 watch가 자동으로 처리
  }
);

// posts의 변경 감지
watch(
  () => props.posts,
  (newPosts) => {
    if (!newPosts) return;
    console.log(`게시판 ${props.boardId}의 새로운 posts 데이터 처리`);

    // 새로운 데이터로 배열 업데이트
    notifications.value = [...newPosts].filter((post) => post.isNotification);
    normalPosts.value = [...newPosts].filter((post) => !post.isNotification);

    console.log("게시글 데이터 업데이트:", {
      boardId: props.boardId,
      total: newPosts.length,
      notifications: notifications.value.length,
      normalPosts: normalPosts.value.length,
    });
  },
  { immediate: true, deep: true }
);

//========================
// 썸네일 이미지 처리
//========================
// 이미지 파일 필터링 함수
const isImageFile = (file) => {
  const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
  const extension = file.fileName.split(".").pop().toLowerCase();
  return imageTypes.includes(extension);
};

// 첫 번째 이미지 URL 가져오기
const getFirstImageUrl = (images) => {
  if (!images || images.length === 0) return "";
  const imageFile = images.find((file) => isImageFile(file));
  return imageFile ? imageFile.fileUrl : "";
};

// 이미지 파일 개수 계산
const getImageCount = (images) => {
  if (!images) return 0;
  return images.filter((file) => isImageFile(file)).length;
};

//=========================
// format
// ========================

// Methods
const formatDate = (date) => {
  if (!date || !Array.isArray(date)) return "-";

  try {
    const [year, month, day, hour, minute] = date;

    // 숫자 타입 검사
    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      !Number.isInteger(day) ||
      !Number.isInteger(hour) ||
      !Number.isInteger(minute)
    )
      return "-";

    const formattedDate = new Date(year, month - 1, day, hour, minute);

    if (isNaN(formattedDate.getTime())) return "-";

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

const formatNumber = (num) => {
  if (!num) return 0;
  return num > 999 ? `${(num / 1000).toFixed(1)}k` : num;
};

// const calculatePostNumber = (index) => {
//   // 남은 게시물 수 계산
//   const remainingPosts =
//     props.totalPosts - (props.currentPage - 1) * props.postsPerPage;
//   // 현재 페이지에서의 역순 번호
//   return remainingPosts - index;
// };

const handlePostClick = (postId) => {
  console.log("postId : ", postId);
  emit("post-click", postId);
};

// const scrollToTop = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };
</script>

<style scoped>
.post-content {
  @apply text-left;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

img {
  @apply rounded-sm;
}
</style>
