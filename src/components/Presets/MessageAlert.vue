<template>
  <div class="notification-icon">
    <div @click.stop="openModal">
      <img :src="msgIcon" alt="메세지 아이콘" />
      <span v-if="unreadMessages > 0" class="notification-badge">
        {{ unreadMessages }}
      </span>
    </div>
    <Transition name="modal">
      <MessageModal
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
import msgIcon from "@/assets/msg_icon.svg";
import MessageModal from "@/components/Presets/MessageModal.vue";
// import vmodal from "vue-js-modal";

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

// 메시지 카운트 증가 인터벌
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

<style scoped>
.notification-icon {
  position: relative;
  cursor: pointer;
}
.notification-icon img {
  opacity: 0.9;
}
.notification-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  background-color: #f14a67;
  color: white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 7px;
  line-height: 15px;
  text-align: center;
}
/* 모달 애니메이션 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.8) translate(-50px, -50px);
}

.modal-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.modal-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.8) translate(-50px, -50px);
}
</style>
