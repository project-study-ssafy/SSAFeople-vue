<template>
  <div class="post-form p-6">
    <!-- 게시판 선택 드롭다운 -->
    <div class="mb-4">
      <label class="block text-gray-700 mb-2">게시판</label>
      <select
        v-model="selectedBoard"
        class="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="자유">자유 게시판</option>
        <option value="의견">의견 게시판</option>
        <option value="심니다">심니다/팝니다</option>
      </select>
    </div>

    <!-- 제목 입력 -->
    <div class="mb-4">
      <label class="block text-gray-700 mb-2">제목</label>
      <input
        v-model="title"
        type="text"
        placeholder="제목을 입력하세요."
        class="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>

    <!-- 내용 입력 -->
    <div class="mb-4">
      <label class="block text-gray-700 mb-2">내용</label>
      <div
        class="border rounded-lg p-4 min-h-[300px] mb-4"
        @click="focusEditor"
      >
        <div v-if="!content" class="text-gray-400">에디터 적용</div>
        <div v-else v-html="content"></div>
      </div>
    </div>

    <!-- 파일 정보 -->
    <div class="mb-4 text-gray-600 text-sm">
      {{ uploadedSize }} Bytes / {{ maxSize }} MB
    </div>

    <!-- 등록 버튼 -->
    <div class="flex justify-end">
      <button
        @click="submitPost"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        등록하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedBoard = ref("자유");
const title = ref("");
const content = ref("");
const uploadedSize = ref(0);
const maxSize = ref(10.0);

const focusEditor = () => {
  // 에디터 포커스 로직
  console.log("에디터 포커스");
};

const submitPost = () => {
  // 게시글 등록 로직
  console.log("게시글 등록:", {
    board: selectedBoard.value,
    title: title.value,
    content: content.value,
  });
};
</script>
