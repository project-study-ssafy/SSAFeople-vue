<template>
  <div class="">
    <div
      @click.stop="openModal"
      class="cursor-pointer bg-white rounded-full relative"
    >
      <img :src="bellIcon" alt="알림 아이콘" class="opacity-90" />
      <span
        v-if="unreadMessages > 0"
        class="absolute top-[-2px] right-[-2px] bg-[#f14a67] text-white rounded-full w-[7px] h-[7px] text-[7px] leading-[15px] text-center"
      >
      </span>
    </div>
    <Transition
      enter-active-class="transition-all duration-300 ease-in-out"
      enter-from-class="opacity-0 scale-75 -translate-x-0 translate-y-12"
      enter-to-class="opacity-100 scale-100 translate-x-0 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in-out"
      leave-from-class="opacity-100 scale-100 translate-x-0 translate-y-12"
      leave-to-class="opacity-0 scale-75 translate-x-0 translate-y-0"
    >
      <BoardAlertModal
        v-if="isModalVisible"
        :isVisible="isModalVisible"
        @update:isVisible="updateModalVisibility"
        @close="closeModal"
        class="relative"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import bellIcon from "@/assets/bell_icon.svg";
import BoardAlertModal from "@/components/Presets/BoardAlertModal.vue";

const unreadMessages = ref(0);
const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const updateModalVisibility = (newValue) => {
  isModalVisible.value = newValue;
};

let messageInterval;

onMounted(() => {
  messageInterval = setInterval(() => {
    unreadMessages.value += 1;
  }, 1000);
});

onUnmounted(() => {
  if (messageInterval) {
    clearInterval(messageInterval);
  }
});
</script>
