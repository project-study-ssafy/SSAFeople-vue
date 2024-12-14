<template>
  <div class="space-y-2">
    <AppHeader :type="2" :text="userInfo.username + '/README.md'" />
    <hr />
    <div
      v-if="props.userInfo.readme"
      v-html="renderedMarkdown"
      class="col-span-1 markdown-output prose max-w-none"
    ></div>
    <div v-else class="col-span-1 markdown-output prose max-w-none">
      작성 된 README.md가 없습니다.
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { AppHeader } from "@/components";
import markdownit from "markdown-it";

const props = defineProps({
  userInfo: {},
});

const md = markdownit({
  html: true,
  xhtmlOut: true,
});

const renderedMarkdown = computed(() => {
  return md.render(props.userInfo.readme || "");
});
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
