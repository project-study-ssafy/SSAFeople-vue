<!-- views/PostFormView.vue -->
<template>
  <div class="p-6 bg-white rounded-lg">
    <h2 class="text-[#333] text-2xl font-bold mb-6">
      {{ isEditMode ? "게시글 수정" : "게시글 작성" }}
    </h2>

    <form @submit.prevent="handleSubmit">
      <!-- 게시판 선택 -->
      <div class="board-selector mb-4 relative">
        <div
          @click="toggleDropdown"
          class="p-3 border-b rounded cursor-pointer flex justify-between items-center w-[36%]"
        >
          <span class="">{{
            selectedBoardName || "게시판을 선택해주세요"
          }}</span>
          <i :class="['bi', isOpen ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
        </div>

        <ul v-if="isOpen" class="board-list mt-1 border rounded">
          <li
            v-for="board in boards"
            :key="board.id"
            @click="selectBoard(board)"
            :class="[
              'p-2 cursor-pointer hover:bg-gray-50 transition-all',
              formData.boardId === board.id ? 'text-blue-500' : '',
            ]"
          >
            {{ board.name }}
          </li>
        </ul>
      </div>

      <!-- 제목 -->
      <div class="mb-4">
        <input
          v-model="formData.title"
          type="text"
          placeholder="제목을 입력해주세요"
          class="w-full bg-[#f8f8f8] p-4 border rounded-[16px] focus:outline-none focus:border-blue-500"
        />
      </div>

      <!-- 에디터 툴바 -->
      <div class="">
        <!-- 내용 입력 영역 -->
        <textarea
          v-model="formData.content"
          rows="15"
          placeholder="내용을 입력해주세요"
          class="w-full p-4 border rounded-[16px] mb-4 focus:outline-none focus:border-blue-500 resize-none"
        ></textarea>
      </div>

      <!-- 첨부파일 영역 -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <div class="flex items-center">
            <span
              >{{ formatFileSize(fileSize) }} Bytes / {{ maxFileSize }} MB</span
            >
            <label
              for="file-upload"
              class="ml-2 px-2 py-1 border rounded hover:bg-gray-50 cursor-pointer"
            >
              파일첨부
            </label>
            <input
              id="file-upload"
              type="file"
              @change="handleFileChange"
              class="hidden"
              multiple
            />
          </div>
          <button
            v-if="attachedFiles.length"
            type="button"
            @click="clearFiles"
            class="text-gray-500 hover:text-gray-700"
          >
            전체삭제
          </button>
        </div>

        <!-- 첨부된 파일 목록 -->
        <ul
          v-if="attachedFiles.length"
          class="mt-2 space-y-1 border-solid border-[1px] border-gray-200 p-4 rounded"
        >
          <li
            v-for="(file, index) in attachedFiles"
            :key="index"
            class="flex items-center justify-between text-sm bg-[#f2f2f2] px-4 py-2 rounded"
          >
            <div class="flex items-center gap-2">
              <span>{{ file.name }}</span>
              <span class="text-gray-500"
                >({{ formatFileSize(file.size) }})</span
              >
            </div>
            <button
              type="button"
              @click="removeFile(index)"
              class="text-gray-500 hover:text-red-500"
            >
              <i class="bi bi-x"></i>
            </button>
          </li>
        </ul>
        <!-- <div v-if="attachedFiles.length" class="mt-1 text-sm text-gray-500">
          총 {{ attachedFiles.length }}개 파일 ({{ formatFileSize(fileSize) }})
        </div> -->
      </div>

      <!-- 버튼 그룹 -->
      <div class="flex justify-end gap-2">
        <button
          type="button"
          @click="goBack"
          class="px-4 py-2 border rounded hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ isEditMode ? "수정" : "등록" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useBoardStore } from "@/stores/board";
import { getPostDetail, updatePost, createPost } from "@/apis";

const route = useRoute();
const router = useRouter();
// const boardStore = useBoardStore();

// 드롭다운 상태
const isOpen = ref(false);

// 수정 모드 확인
const isEditMode = computed(() => !!route.params.postId);

// 게시판 목록
const boards = [
  { id: 0, name: "게시판을 선택해주세요." },
  { id: 1, name: "자유게시판" },
  { id: 2, name: "익명게시판" },
];

// 폼 데이터
const formData = ref({
  boardId: "",
  title: "",
  content: "",
});

// 선택된 게시판 이름
const selectedBoardName = computed(() => {
  const board = boards.find((b) => b.id === formData.value.boardId);
  return board?.name;
});

// 드롭다운 토글
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// 게시판 선택
const selectBoard = (board) => {
  formData.value.boardId = board.id;
  isOpen.value = false;
};

// 수정 모드일 경우 데이터 로드
onMounted(async () => {
  if (isEditMode.value) {
    try {
      const post = await getPostDetail(route.params.postId);
      formData.value = {
        boardId: post.boardId,
        title: post.title,
        content: post.content,
      };
    } catch (error) {
      console.error("게시글 로딩 실패:", error);
    }
  }
});

// ====================
// 파일 첨부
// ====================

// 파일 관련 상태 추가
const attachedFiles = ref([]);
const fileSize = ref(0);
const maxFileSize = 10.0; // MB
const maxFileCount = 5; // 최대 첨부 파일 수

// 파일 변경 핸들러
const handleFileChange = (event) => {
  const newFiles = Array.from(event.target.files);
  const totalFiles = [...attachedFiles.value, ...newFiles];

  // 파일 개수 체크
  if (totalFiles.length > maxFileCount) {
    alert(`첨부파일은 최대 ${maxFileCount}개까지 가능합니다.`);
    return;
  }

  // 전체 파일 크기 계산
  const totalSize = totalFiles.reduce((acc, file) => acc + file.size, 0);

  // 최대 용량 체크
  if (totalSize > maxFileSize * 1024 * 1024) {
    alert(`첨부파일 전체 용량은 ${maxFileSize}MB를 초과할 수 없습니다.`);
    return;
  }

  attachedFiles.value = totalFiles;
  fileSize.value = totalSize;
};

// 개별 파일 삭제
const removeFile = (index) => {
  attachedFiles.value = attachedFiles.value.filter((_, i) => i !== index);
  fileSize.value = attachedFiles.value.reduce(
    (acc, file) => acc + file.size,
    0
  );
};

// 파일 크기 포맷팅
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

// 폼 제출 시 파일도 함께 전송
const handleSubmit = async () => {
  if (
    !formData.value.boardId ||
    !formData.value.title ||
    !formData.value.content
  ) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.value.title);
    formDataToSend.append("content", formData.value.content);

    // 파일 추가
    attachedFiles.value.forEach((file) => {
      formDataToSend.append("files", file);
    });

    if (isEditMode.value) {
      await updatePost(
        formData.value.boardId,
        route.params.postId,
        formDataToSend
      );
    } else {
      await createPost(formData.value.boardId, formDataToSend);
    }
    router.push("/board");
  } catch (error) {
    console.error("게시글 처리 실패:", error);
    alert("게시글 처리에 실패했습니다. 다시 시도해주세요.");
  }
};

// 파일 초기화
const clearFiles = () => {
  attachedFiles.value = [];
  fileSize.value = 0;
};

const goBack = () => {
  router.back();
};

// 외부 클릭 시 드롭다운 닫기
const closeOnOutsideClick = (e) => {
  if (!e.target.closest(".board-selector")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeOnOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", closeOnOutsideClick);
});
</script>

<style scoped>
.board-list {
  position: absolute;
  width: 36%;
  background: white;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.board-list li {
  transition: padding 0.2s ease;
}

/* .board-list li:hover {
  padding-left: 1rem;
} */

.board-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.board-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}
</style>
