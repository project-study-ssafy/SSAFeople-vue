<template>
  <component :is="tag">{{ text }}</component>
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
</script>

<style scoped></style>
