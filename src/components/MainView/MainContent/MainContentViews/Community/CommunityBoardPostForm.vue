<!-- views/PostFormView.vue -->
<template>
  <div class="p-6 bg-white rounded-lg">
    <h2 class="text-[#333] text-2xl font-bold mb-6">
      {{ isEditMode ? "게시글 수정" : "게시글 작성" }}
    </h2>

    <form @submit.prevent="handleSubmit">
      <!-- 게시판 선택 -->
      <div class="board-selector relative mb-4 w-[36%]">
        <div
          @click="toggleDropdown"
          class="p-3 border-b rounded cursor-pointer flex justify-between items-center"
        >
          <span>{{ selectedBoardName || "게시판을 선택해주세요" }}</span>
          <i :class="['bi', isOpen ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
        </div>

        <ul
          v-if="isOpen"
          class="absolute w-full bg-white border rounded z-10 max-h-[200px] overflow-y-auto shadow-md"
        >
          <li
            v-for="board in boards"
            :key="board.boardId"
            @click="selectBoard(board)"
            class="p-2 cursor-pointer hover:bg-gray-50 transition-all"
            :class="formData.boardId === board.boardId ? 'text-blue-500' : ''"
          >
            {{ board.boardName }}
          </li>
        </ul>
      </div>

      <!-- 제목 -->
      <div class="mb-4">
        <input
          v-model="formData.title"
          type="text"
          placeholder="제목을 입력해주세요"
          class="w-full bg-gray-50 p-4 border rounded-[16px] focus:outline-none focus:border-blue-500"
        />
      </div>

      <!-- 내용 입력 영역 -->
      <textarea
        v-model="formData.content"
        rows="15"
        placeholder="내용을 입력해주세요"
        class="w-full p-4 border rounded-[16px] mb-4 focus:outline-none focus:border-blue-500 resize-none"
      ></textarea>

      <!-- 첨부파일 영역 -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <div class="flex items-center">
            <span
              >{{ attachedImages.length }} / {{ maxFileCount }} 개 (개당 최대
              {{ maxFileSize }}MB)</span
            >
            <label
              for="file-upload"
              class="ml-2 px-2 py-1 border rounded hover:bg-gray-50 cursor-pointer"
            >
              사진첨부
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
            v-if="attachedImages.length"
            type="button"
            @click="clearFiles"
            class="text-gray-500 hover:text-gray-700"
          >
            전체삭제
          </button>
        </div>

        <!-- 첨부된 이미지 목록 -->
        <div class="mt-4 space-y-4">
          <ul
            v-if="attachedImages.length"
            class="flex flex-wrap gap-4 mt-4 p-4 border rounded-lg"
          >
            <li
              v-for="(image, index) in attachedImages"
              :key="index"
              class="relative"
            >
              <div class="w-20 h-20 overflow-hidden rounded-lg">
                <img
                  :src="getImagePreview(image)"
                  alt=""
                  class="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow"
              >
                <i class="bi bi-x"></i>
              </button>
            </li>
          </ul>
        </div>
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
import { getPostDetail, updatePost, createPost, getBoards } from "@/apis";

const route = useRoute();
const router = useRouter();

// 드롭다운 상태
const isOpen = ref(false);

// 수정 모드 확인
const isEditMode = computed(() => !!route.params.postId);

// 게시판 목록
const boards = ref([]);

// 폼 데이터
const formData = ref({
  boardId: "",
  title: "",
  content: "",
  images: [], // 이미지 배열 추가
});

// 선택된 게시판 이름
const selectedBoardName = computed(() => {
  const board = boards.value.find((b) => b.boardId === formData.value.boardId);
  return board?.boardName || "게시판을 선택해주세요";
});

// 드롭다운 토글
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// 게시판 선택
const selectBoard = (board) => {
  formData.value.boardId = board.boardId;
  isOpen.value = false;
};

// 게시판 리스트 조회
onMounted(async () => {
  try {
    const response = await getBoards(0);
    boards.value = Array.isArray(response) ? response : [];

    // URL의 boardId 파라미터가 있다면 해당 게시판 자동 선택
    if (route.params.boardId) {
      const boardId = Number(route.params.boardId);
      formData.value.boardId = boardId;
    }
    console.log("boards : ", boards);
  } catch (error) {
    console.error("게시판 리스트 조회 실패:", error);
  }
});

// 수정 모드일 경우 데이터 로드
onMounted(async () => {
  if (isEditMode.value) {
    try {
      const post = await getPostDetail(
        route.params.boardId,
        route.params.postId
      );
      formData.value = {
        boardId: Number(route.params.boardId),
        title: post.data.title,
        content: post.data.content,
      };

      // 기존 이미지 URL들을 File 객체로 변환
      if (post.data.imageUrls?.length) {
        const imageFiles = await Promise.all(
          post.data.imageUrls.map((url) => urlToFile(url))
        );
        // null을 필터링하고 attachedImages에 저장
        attachedImages.value = imageFiles.filter((file) => file !== null);

        console.log(
          "### onMounted attachedImages.value : ",
          attachedImages.value
        );
        // 파일 크기 계산
        // totalFileSize.value = attachedImages.value.reduce(
        //   (acc, file) => acc + file.size / (1024 * 1024),
        //   0
        // );
      }
    } catch (error) {
      console.error("게시글 로딩 실패:", error);
    }
  }
});

// =====================
// 이미지 처리 관련
// =====================
const urlToFile = async (url) => {
  try {
    // const blob = await response.blob();
    const response = await fetch(url, {
      method: "GET",
    });
    console.log("urlToFile response : ", response);

    const blob = await response.blob(url);
    const fileName = url.split("/").pop();
    console.log("#####blob : ", blob);
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error("URL to File 변환 실패:", error);
    return null;
  }
};

// 파일 관련 상태 추가
const attachedImages = ref([]);
const fileSize = ref(0); // 전체 파일 크기

const maxFileSize = 4.0;
const maxFileCount = 10;
const imageUrls = ref(new Map());

const getImagePreview = (file) => {
  if (!imageUrls.value.has(file)) {
    const url = URL.createObjectURL(file);
    imageUrls.value.set(file, url);
  }
  return imageUrls.value.get(file);
};

// 파일 변경 핸들러
const handleFileChange = (event) => {
  if (!event.target.files) return;

  // 이미지 파일 필터링
  const imageFiles = Array.from(event.target.files).filter((file) => {
    // MIME 타입으로 이미지 파일 체크
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    return validImageTypes.includes(file.type);
  });

  // 이미지 파일이 없는 경우 알림
  if (imageFiles.length === 0) {
    alert("이미지 파일만 첨부할 수 있습니다. (jpg, png, gif, webp)");
    return;
  }

  // 파일 크기 체크
  const oversizedFiles = imageFiles.filter(
    (file) => file.size > maxFileSize * 1024 * 1024
  );
  if (oversizedFiles.length > 0) {
    alert(`개별 이미지는 ${maxFileSize}MB를 초과할 수 없습니다.`);
    return;
  }

  // 전체 파일 개수 체크
  if (attachedImages.value.length + imageFiles.length > maxFileCount) {
    alert(`첨부 이미지는 최대 ${maxFileCount}개까지 가능합니다.`);
    return;
  }

  attachedImages.value = [...attachedImages.value, ...imageFiles];
  fileSize.value = calculateTotalSize(attachedImages.value);
};

const calculateTotalSize = (files) => {
  if (!files.length) return 0;
  return files.reduce((acc, file) => acc + (file?.size || 0), 0);
};

// 이미지 제거 시 URL 정리
const removeImage = (index) => {
  const file = attachedImages.value[index];
  if (imageUrls.value.has(file)) {
    URL.revokeObjectURL(imageUrls.value.get(file));
    imageUrls.value.delete(file);
  }
  attachedImages.value.splice(index, 1);
};

// 파일 크기 포맷팅
// const formatFileSize = (bytes) => {
//   if (bytes === 0) return "0 Bytes";
//   const sizes = ["Bytes", "KB", "MB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(1024));
//   return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
// };

// 폼 제출 시 파일도 함께 전송
const handleSubmit = async () => {
  // 폼 데이터 유효성 검증
  if (!formData.value.boardId) {
    alert("게시판을 선택해주세요.");
    return;
  }

  const postFormData = new FormData();
  postFormData.append("title", formData.value.title);
  postFormData.append("content", formData.value.content);

  // 이미지 파일 검증 및 추가
  for (const image of attachedImages.value) {
    if (image instanceof File) {
      postFormData.append("images", image);
    } else {
      console.error("Invalid file object:", image);
      alert("이미지 파일 처리 중 오류가 발생했습니다.");
      return;
    }
  }

  // FormData 내용 확인 (디버깅용)
  // for (const pair of postFormData.entries()) {
  //   console.log("###", `${pair[0]}: ${pair[1]}`);
  // }

  try {
    if (isEditMode.value) {
      await updatePost(
        formData.value.boardId,
        route.params.postId,
        postFormData
      );

      router.push(
        `/board/board/${formData.value.boardId}/${route.params.postId}`
      );
    } else {
      await createPost(formData.value.boardId, postFormData);
      router.push(`/board/board/${formData.value.boardId}`);
    }
  } catch (error) {
    console.error("게시글 처리 실패:", error);
    alert("게시글 저장 중 오류가 발생했습니다.");
  }
};

// const handleSubmit = async () => {
//   const postFormData = new FormData();
//   postFormData.append("title", formData.value.title);
//   postFormData.append("content", formData.value.content);

//   console.log("제출된 이미지 : ", attachedImages.value);
//   // 첨부된 이미지들을 FormData에 추가
//   attachedImages.value.forEach((image) => {
//     postFormData.append("images", image);
//   });

//   try {
//     if (isEditMode.value) {
//       await updatePost(
//         formData.value.boardId,
//         route.params.postId,
//         postFormData
//       );
//       router.push(
//         `/board/board/${formData.value.boardId}/${route.params.postId}`
//       );
//     } else {
//       const response = await createPost(formData.value.boardId, postFormData);

//       router.push(`/board/board/${formData.value.boardId}`);
//     }
//   } catch (error) {
//     console.error("게시글 처리 실패:", error);
//   }
// };

// 파일 전체 삭제
const clearFiles = () => {
  imageUrls.value.forEach((url) => URL.revokeObjectURL(url));
  imageUrls.value.clear();
  attachedImages.value = [];
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
// 컴포넌트 언마운트 시 URL 정리
onUnmounted(() => {
  imageUrls.value.forEach((url) => URL.revokeObjectURL(url));
  imageUrls.value.clear();
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

.board-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.board-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}
</style>
