<template>
  <button v-if="type === 'a'" class="btn-a">{{ text }}</button>
  <button v-else-if="type === 'b'" class="btn-b">{{ text }}</button>
  <button v-else class="btn-default">{{ text }}</button>
</template>
<script setup>
defineProps({
  type: String,
  text: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.btn-a {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-b {
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-default {
  background-color: grey;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
