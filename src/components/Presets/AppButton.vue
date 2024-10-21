<template>
  <button
    v-if="type === 'square-border'"
    class="bg-white text-[#3396F4] border border-[#3396F4] p-1"
  >
    {{ text }}
  </button>
  <button
    v-else-if="type === 'ellipse-border'"
    class="bg-white text-[#3396F4] border border-[#3396F4] p-1 rounded-full"
  >
    {{ text }}
  </button>
  <button
    v-else-if="type === 'square-filled'"
    class="bg-[#3396F4] p-1 text-white"
  >
    {{ text }}
  </button>
  <button
    v-else-if="type === 'ellipse-filled'"
    class="bg-[#3396F4] p-1 text-white rounded-full"
  >
    {{ text }}
  </button>
</template>
<script setup>
defineProps({
  type: String,
  text: String,
});
</script>
<style scoped></style>
