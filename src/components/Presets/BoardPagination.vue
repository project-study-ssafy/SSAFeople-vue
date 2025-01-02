<template>
  <div class="flex justify-center items-center gap-2 h-10">
    <AppButton
      v-if="currentPage > 1"
      @click="$emit('page-change', 1)"
      text="<<"
      class="pagination-button"
    />

    <AppButton
      v-for="page in visiblePages"
      :key="page"
      :buttonType="'ellipse-border'"
      @click="$emit('page-change', page)"
      :text="String(page)"
      class=""
      :class="['pagination-button', currentPage === page ? 'active' : '']"
    />

    <AppButton
      v-if="currentPage < totalPages"
      @click="$emit('page-change', totalPages)"
      text=">>"
      class="pagination-button"
    />
  </div>
</template>

<script setup>
import { AppButton } from "@/components";

defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  visiblePages: {
    type: Array,
    required: true,
  },
});

defineEmits(["page-change"]);
</script>
