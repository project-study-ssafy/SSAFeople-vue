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

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
}
h2 {
  font-size: 1.75rem;
  font-weight: bold;
}
h3 {
  font-size: 1.5rem;
  font-weight: semi-bold;
}
h4 {
  font-size: 1.25rem;
  font-weight: normal;
}
h5 {
  font-size: 1rem;
  font-weight: normal;
}
h6 {
  font-size: 0.875rem;
  font-weight: normal;
}
</style>
