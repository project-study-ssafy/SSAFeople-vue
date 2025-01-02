<template>
  <!-- <div class="modal-overlay">
    <div
      v-if="props.isVisible"
      class="modal bg-black"
      v-click-outside="handleClose"
    ></div>
  </div> -->

  <!--  v-click-outside="handleClose" -->
  <div
    class="modal-content absolute z-[1000]"
    ref="modalContent"
    v-click-outside="handleClose"
  >
    <span class="close-btn" @click.stop="handleClose"
      ><i class="bi bi-x-lg"></i
    ></span>
    <h2 class="font-bold text-[18px]">
      메세지 알림 <i class="bi bi-bell"></i>
    </h2>

    <div class="tab-menu">
      <button
        @click="selectTab('sent')"
        :class="{ active: activeTab === 'sent' }"
      >
        보낸 메시지
      </button>
      <button
        @click="selectTab('recent')"
        :class="{ active: activeTab === 'recent' }"
      >
        받은 메세지
      </button>
    </div>

    <!-- 보낸 메세지 -->
    <div v-if="activeTab === 'sent'" class="tab-content">
      <ul>
        <li
          class="flex justify-between py-2 px-1 items-start border-b border-gray-200"
          v-for="(message, index) in sentMessages"
          :key="index"
        >
          <div class="flex flex-col">
            <span class="mb-1">{{ message.content }}</span>
            <span class="text-[#777] text-sm">{{ message.receiver }}</span>
          </div>
          <span class="text-[#777] text-sm">{{ message.receivedTime }}</span>
        </li>
      </ul>
    </div>
    <!-- 받은 메세지 -->
    <div v-if="activeTab === 'recent'" class="tab-content">
      <ul>
        <li
          class="flex justify-between py-2 px-1 items-start border-b border-gray-200"
          v-for="(message, index) in receivedMessages"
          :key="index"
        >
          <div class="flex flex-col">
            <span class="mb-1">{{ message.content }}</span>
            <span class="text-[#777] text-sm">{{ message.sender }}</span>
          </div>
          <span class="text-[#777] text-sm">{{ message.sentTime }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// const props = defineProps({
//   isVisible: {
//     type: Boolean,
//     required: true,
//   },
// });

const emit = defineEmits(["update:isVisible", "close"]);
const modalContent = ref("");

// Tab
const activeTab = ref("sent");
const sentMessages = ref([
  {
    content: "Sent message 1",
    receiver: "김싸피",
    receivedTime: "2024-11-01",
  },
  {
    content: "Sent message 1",
    receiver: "김싸피",
    receivedTime: "2024-11-01",
  },
  {
    content: "Sent message 1",
    receiver: "김싸피",
    receivedTime: "2024-11-01",
  },
  {
    content: "Sent message 1",
    receiver: "김싸피",
    receivedTime: "2024-11-01",
  },
  {
    content: "Sent message 1",
    receiver: "김싸피",
    receivedTime: "2024-11-01",
  },
]);
const receivedMessages = ref([
  {
    content: "안녕하세요 1",
    sender: "이싸피",
    sentTime: "2024-11-01",
  },
  {
    content: "gogo ! 1",
    sender: "이싸피",
    sentTime: "2024-11-01",
  },
  {
    content: "힘내자",
    sender: "이싸피",
    sentTime: "2024-11-01",
  },
  {
    content: "Sent message 1",
    sender: "이싸피",
    sentTime: "2024-11-01",
  },
  {
    content: "Sent message 1",
    sender: "이싸피",
    sentTime: "2024-11-01",
  },
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
  padding: 30px;
  border-radius: 16px;
  width: 340px;
  color: #232323;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: -2px;
  top: 42px;
  z-index: 1000;
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
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.tab-menu {
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
  margin-top: 20px;
  border-bottom: 1px solid #eee;
}
.tab-menu button {
  flex: 1;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
}
.tab-menu button.active {
  color: var(--ssafy-blue);
  border-bottom: 2px solid var(--ssafy-blue);
}
.tab-content {
  max-height: 200px;
  overflow-y: auto;
}
</style>
