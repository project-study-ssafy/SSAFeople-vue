<template>
  <component :is="tag" :class="tagClass">{{ text }}</component>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  type: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

// 태그 결정
const tag = computed(() => {
  if (props.type === 1) return "h1";
  if (props.type === 2) return "h2";
  if (props.type === 3) return "h3";
  if (props.type === 4) return "h4";
  if (props.type === 5) return "h5";
  return "h6";
});

const tagClass = computed(() => {
  if (props.type === 1) return "text-4xl font-bold";
  if (props.type === 2) return "text-3xl font-bold";
  if (props.type === 3) return "text-2xl font-semibold";
  if (props.type === 4) return "text-xl font-normal";
  if (props.type === 5) return "text-lg font-normal";
  return "text-base font-normal";
});
</script>

<style scoped></style>
