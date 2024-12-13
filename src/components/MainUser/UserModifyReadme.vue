<template>
  <div class="space-y-2">
    <AppHeader :type="2" text="README.md 수정" />
    <hr />
    <div class="grid grid-cols-2 gap-x-5 h-[500px]">
      <textarea
        v-model="markdownText"
        @input="updateMarkdownText"
        @scroll="syncScroll('textarea')"
        placeholder="여기에 마크다운을 입력하세요"
        class="col-span-1 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-800 placeholder-gray-400 h-full overflow-scroll"
        ref="textareaRef"
      ></textarea>
      <div
        v-html="renderedMarkdown"
        @scroll="syncScroll('markdown')"
        class="col-span-1 markdown-output prose w-full h-full overflow-scroll"
        ref="markdownRef"
      ></div>
    </div>
    <hr />
    <AppButton
      @click="modify(markdownText)"
      button-type="ellipse-border"
      text="저장"
    />
  </div>
</template>

<script setup>
import { AppButton, AppHeader } from "@/components";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { modifyReadme } from "@/apis";
import markdownit from "markdown-it";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  userInfo: {},
});
const emit = defineEmits(["updateReadme"]);

const md = markdownit({
  html: true,
  xhtmlOut: true,
});

const markdownText = ref("");
const renderedMarkdown = ref("");

onMounted(() => {
  markdownText.value = props.userInfo.readme || "";
  renderedMarkdown.value = md.render(props.userInfo.readme || "");
});

const updateMarkdownText = (event) => {
  markdownText.value = event.target.value;
  renderedMarkdown.value = md.render(markdownText.value);
};

// 스크롤 동기화 관련 변수
const textareaRef = ref(null);
const markdownRef = ref(null);
const isSyncing = ref(false); // 스크롤 이벤트 중복 방지 플래그

// 스크롤 동기화
const syncScroll = (source) => {
  if (isSyncing.value) return; // 중복 호출 방지
  isSyncing.value = true;

  const sourceElement =
    source === "textarea" ? textareaRef.value : markdownRef.value;
  const targetElement =
    source === "textarea" ? markdownRef.value : textareaRef.value;

  // 스크롤 비율 계산 및 적용
  const scrollRatio =
    sourceElement.scrollTop /
    (sourceElement.scrollHeight - sourceElement.clientHeight);

  targetElement.scrollTop =
    scrollRatio * (targetElement.scrollHeight - targetElement.clientHeight);

  // 동기화 완료 플래그 초기화
  setTimeout(() => (isSyncing.value = false), 10);
};

// README 수정
const modify = async (data) => {
  try {
    const response = await modifyReadme({ readme: data });
    // 부모 userinfo.readme 업데이트
    emit("updateReadme", data);
    console.log(response);
    router.push(`/user/${route.params.id}`);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "수정 실패",
      text:
        error.response?.data?.message ||
        "문제가 발생했습니다. 다시 시도해주세요.",
    });
    console.log(error);
  }
};
</script>

<style>
.markdown-output img {
  display: inline; /* 이미지를 인라인 요소로 설정 */
  vertical-align: middle; /* 텍스트와 수직 정렬 */
  margin: 0;
}
.markdown-output p {
  font-weight: 500;
  overflow-wrap: break-word;
  word-wrap: break-word;
}
.markdown-output hr {
  margin: 0;
}
</style>
