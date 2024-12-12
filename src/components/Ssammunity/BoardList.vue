<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <AppHeader class="font-[600] text-[#222]" :type="2" :text="boardTitle" />
      <router-link
        to="/board/write"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        글쓰기
      </router-link>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-center py-8">
      <span class="text-gray-600">로딩 중...</span>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="text-center py-8">
      <span class="text-red-500">{{ error }}</span>
    </div>

    <!-- 데이터 테이블 -->
    <template v-else>
      <table v-if="posts.length > 0">
        <thead>
          <tr>
            <th class="w-16">No</th>
            <th>제목</th>
            <th class="w-24">작성일자</th>
            <th class="w-24">글쓴이</th>
            <th class="w-20">댓글</th>
            <th class="w-20">공감</th>
            <th class="w-20">스크랩</th>
            <th class="w-20">조회</th>
          </tr>
        </thead>
        <tbody>
          <!-- 공지사항 -->
          <tr
            v-for="notice in notifications"
            :key="`notice-${notice.postId}`"
            class="bg-[#f8f9fa] hover:bg-[#f1f3f5] cursor-pointer transition-colors"
            @click="handlePostClick(notice.postId)"
          >
            <td>
              <span class="px-2 py-1 text-sm text-blue-600 font-bold"
                >공지</span
              >
            </td>
            <td class="post-content font-bold">{{ notice.title }}</td>
            <td>{{ notice.createdAt }}</td>
            <td>{{ notice.author }}</td>
            <td>{{ formatNumber(notice.commentCnt) }}</td>
            <td>{{ formatNumber(notice.likes) }}</td>
            <td>{{ formatNumber(notice.scrap) }}</td>
            <td>{{ formatNumber(notice.viewCnt) }}</td>
          </tr>

          <!-- 일반 게시글 -->
          <tr
            v-for="(post, index) in paginatedPosts"
            :key="`post-${post.id}`"
            class="hover:bg-[#f7f7f7] cursor-pointer transition-colors"
            @click="handlePostClick(post.id)"
          >
            <td>{{ calculatePostNumber(index) }}</td>
            <td class="post-content">
              {{ post.title }}
              <span v-if="post.commentCnt > 0" class="text-blue-500 ml-2">
                [{{ post.commentCnt }}]
              </span>
            </td>
            <td>{{ formatDate(post.createdAt) }}</td>
            <td>{{ post.nickName }}</td>
            <td>{{ formatNumber(post.commentCnt) }}</td>
            <td>{{ formatNumber(post.likes) }}</td>
            <td>{{ formatNumber(post.scrap) }}</td>
            <td>{{ formatNumber(post.viewCnt) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- 데이터 없음 상태 -->
      <div v-else class="text-center py-8">
        <span class="text-gray-500">게시글이 없습니다.</span>
      </div>

      <!-- 페이지네이션 -->
      <div class="mt-6 flex justify-center items-center gap-2">
        <AppButton
          v-if="currentPage > 1"
          @click="handlePageChange(1)"
          button-type="page-button"
          text="<<"
          class="text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors"
        />

        <AppButton
          v-for="page in visiblePages"
          :key="page"
          @click="handlePageChange(page)"
          button-type="page-button"
          :text="String(page)"
          :class="[
            'px-4 py-2 rounded-full transition-colors',
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'text-blue-600 hover:bg-gray-100',
          ]"
        />

        <AppButton
          v-if="currentPage < totalPages"
          @click="handlePageChange(totalPages)"
          button-type="page-button"
          text=">>"
          class="text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import AppHeader from "@/components/Presets/AppHeader.vue";
import AppButton from "@/components/Presets/AppButton.vue";

// Props
const props = defineProps({
  boardTitle: {
    type: String,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
  postsPerPage: {
    type: Number,
    default: 15,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

// Emits
const emit = defineEmits(["page-change", "post-click"]);

// State
const currentPage = ref(1);

// Computed
const notifications = computed(() =>
  props.posts.filter((post) => post.isNotification)
);

const normalPosts = computed(() =>
  props.posts.filter((post) => !post.isNotification)
);

const totalPages = computed(() =>
  Math.ceil(normalPosts.value.length / props.postsPerPage)
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * props.postsPerPage;
  const end = start + props.postsPerPage;
  return normalPosts.value.slice(start, end);
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pageSize = 5;
  const half = Math.floor(pageSize / 2);

  let start = Math.max(1, current - half);
  let end = Math.min(total, start + pageSize - 1);

  if (end === total) {
    start = Math.max(1, end - pageSize + 1);
  }
  if (start === 1) {
    end = Math.min(total, pageSize);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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

const formatNumber = (num) => {
  if (!num) return 0;
  return num > 999 ? `${(num / 1000).toFixed(1)}k` : num;
};

const calculatePostNumber = (index) => {
  return (
    normalPosts.value.length -
    ((currentPage.value - 1) * props.postsPerPage + index)
  );
};

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("page-change", page);
    scrollToTop();
  }
};

const handlePostClick = (postId) => {
  console.log("postId : ", postId);
  emit("post-click", postId);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 게시글 데이터가 변경될 때 페이지 초기화
watch(
  () => props.posts,
  () => {
    currentPage.value = 1;
  }
);
</script>

<style scoped>
table {
  @apply w-full border-collapse;
}

th,
td {
  @apply px-4 py-3 text-center;
}

th {
  @apply text-sm border-y border-gray-200 bg-gray-50;
}

td {
  @apply border-b border-gray-100;
}

.post-content {
  @apply text-left;
}

tr {
  @apply transition-colors duration-200;
}
</style>
