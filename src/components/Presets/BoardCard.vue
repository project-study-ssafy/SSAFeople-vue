<template>
  <div class="bg-white rounded-xl p-5 border border-gray-300">
    <AppHeader :type="4" :text="props.title" class="mb-4" />
    <RouterLink
      to="/board"
      v-for="(context, index) in props.contexts"
      :key="index"
      class="block"
    >
      <span
        class="inline-block overflow-hidden whitespace-nowrap text-ellipsis max-w-[400px]"
        ><em class="inline-block w-2 font-[600] mr-2">{{ index + 1 }}</em>
        {{ context }}</span
      >
    </RouterLink>
  </div>
</template>
<script setup>
import { AppHeader } from "@/components";

const props = defineProps({
  title: String,
  contexts: Array,
});
</script>
<style></style>
