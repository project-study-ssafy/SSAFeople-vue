<template>
  <button
    v-if="buttonType === 'square-border'"
    @click="handleClick"
    class="bg-white font-semibold text-[#3396F4] border border-[#3396F4] px-4 py-2 hover:bg-[#3396F4] hover:text-white transition-colors duration-300"
  >
    {{ text }}
  </button>
  <button
    v-else-if="buttonType === 'ellipse-border'"
    @click="handleClick"
    class="bg-white font-semibold text-[#3396F4] border border-[#3396F4] rounded-md px-4 py-2 hover:bg-[#3396F4] hover:text-white transition-colors duration-300"
  >
    {{ text }}
  </button>
  <button
    v-else-if="buttonType === 'square-filled'"
    @click="handleClick"
    class="bg-[#3396F4] font-semibold text-white px-4 py-2 hover:bg-white hover:text-[#3396F4] border border-[#3396F4] transition-colors duration-300"
  >
    {{ text }}
  </button>
  <button
    v-else-if="buttonType === 'ellipse-filled'"
    @click="handleClick"
    class="bg-[#3396F4] font-semibold text-white rounded-md px-4 py-2 hover:bg-white hover:text-[#3396F4] border border-[#3396F4] transition-colors duration-300"
  >
    {{ text }}
  </button>
</template>
<script setup>
const props = defineProps({
  buttonType: String,
  text: String,
  onClick: Function,
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};
</script>
<style scoped></style>
