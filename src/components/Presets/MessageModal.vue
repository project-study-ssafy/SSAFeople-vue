<template>
  <div v-if="props.isVisible" class="modal" @click.stop>
    <div class="modal-content">
      <span class="close-btn" @click.stop="handleClose">&times;</span>
      <h2>메세지 알림창</h2>

      <div class="tab-menu">
        <button
          @click="selectTab('sent')"
          :class="{ active: activeTab === 'sent' }"
        >
          내가 보낸 메시지
        </button>
        <button
          @click="selectTab('recent')"
          :class="{ active: activeTab === 'recent' }"
        >
          최근 메시지
        </button>
      </div>

      <div v-if="activeTab === 'sent'" class="tab-content">
        <ul>
          <li v-for="(message, index) in sentMessages" :key="index">
            {{ message }}
          </li>
        </ul>
      </div>
      <div v-if="activeTab === 'recent'" class="tab-content">
        <ul>
          <li v-for="(message, index) in recentMessages" :key="index">
            {{ message }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isVisible", "close"]);

const activeTab = ref("sent");
const sentMessages = ref([
  "Sent message 1",
  "Sent message 2",
  "Sent message 3",
]);
const recentMessages = ref([
  "Recent message 1",
  "Recent message 2",
  "Recent message 3",
]);

const handleClose = () => {
  emit("update:isVisible", false);
  emit("close");
};

const selectTab = (tab) => {
  activeTab.value = tab;
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 42px;
  left: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 16px;
  width: 300px;
  color: #232323;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  top: 0;
}
.modal-content::before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #fff;
  position: absolute;
  top: -16px;
  left: 16px;
}
.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
.tab-menu {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.tab-menu button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: #e0e0e0;
  border-radius: 3px;
}
.tab-menu button.active {
  background-color: #3396f4;
  color: white;
}
.tab-content {
  max-height: 200px;
  overflow-y: auto;
}
</style>
