<template>
  <div
    class="absolute z-[1000]"
    ref="modalContent"
    v-click-outside="handleClose"
  >
    <div
      class="absolute bg-white p-8 rounded-2xl w-[340px] h-[400px] text-[#232323] right-[-10px] top-[24px] shadow-[0_0_20px_rgba(0,0,0,0.1)]"
    >
      <span
        class="absolute top-5 right-5 cursor-pointer"
        @click.stop="handleClose"
      >
        <i class="bi bi-x-lg"></i>
      </span>

      <h2 class="font-bold text-[18px] mb-3">
        알림 <i class="bi bi-bell"></i>
      </h2>

      <div
        class="before:content-[''] before:block before:w-0 before:h-0 before:border-l-[20px] before:border-l-transparent before:border-b-[20px] before:border-b-white before:absolute before:top-[-16px] before:right-5 before:z-[1] before:border-white"
      >
        <!-- 보낸 메세지 -->
        <div v-if="activeTab === 'sent'" class="max-h-[200px] overflow-y-auto">
          <ul>
            <li
              v-for="(message, index) in sentMessages"
              :key="index"
              class="flex justify-between py-2 px-1 items-start border-b border-gray-200"
            >
              <div class="flex flex-col">
                <span class="mb-1">{{ message.content }}</span>
                <span class="text-[#777] text-sm">{{ message.receiver }}</span>
              </div>
              <span class="text-[#777] text-sm">{{
                message.receivedTime
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:isVisible", "close"]);
const modalContent = ref("");

const activeTab = ref("sent");
const sentMessages = ref([
  {
    content: "Sent message 1",
    receiver: "김싸피",
    receivedTime: "2024-11-01",
  },
  // ... 나머지 메시지 데이터
]);
// const receivedMessages = ref([
//   {
//     content: "안녕하세요 1",
//     sender: "이싸피",
//     sentTime: "2024-11-01",
//   },
//   // ... 나머지 메시지 데이터
// ]);

const handleClose = () => {
  emit("update:isVisible", false);
  emit("close");
};

// const selectTab = (tab) => {
//   activeTab.value = tab;
// };
</script>
