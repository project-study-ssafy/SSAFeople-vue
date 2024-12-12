<template>
  <div class="space-y-2">
    <AppHeader :type="2" text="README.md 수정" />
    <hr />
    <div class="grid grid-cols-2 gap-x-5 min-h-[400px]">
      <textarea
        @input="updateMarkdownText"
        :placeholder="
          markdownText ? markdownText : '여기에 마크다운을 입력하세요'
        "
        class="col-span-1 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-800 placeholder-gray-400"
      ></textarea>
      <div
        v-html="renderedMarkdown"
        class="col-span-1 markdown-output prose w-full"
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
import { ref, computed } from "vue";
import { modifyReadme } from "@/apis";
import markdownit from "markdown-it";
import Swal from "sweetalert2";

const props = defineProps({
  userInfo: {},
});
console.log(props.userInfo.readme);

const markdownText = ref(
  props.userInfo.readme ? `${props.userInfo.readme}` : "",
);
const updateMarkdownText = (event) => {
  markdownText.value = event.target.value;
};

const md = markdownit({
  html: true,
  xhtmlOut: true,
});

const renderedMarkdown = computed(() => {
  return md.render(markdownText.value);
});

const modify = async (data) => {
  try {
    console.log(data);
    const response = await modifyReadme({ readme: md.render(data) });
    console.log(response);
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
