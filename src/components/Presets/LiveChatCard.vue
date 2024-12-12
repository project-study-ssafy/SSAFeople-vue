<template>
  <div class="border border-[#e0e0e0] p-[28px_20px] rounded-2xl">
    <div class="flex justify-between items-center mb-4">
      <AppHeader :type="4" :text="props.title" />
      <button
        class="px-3 py-1 rounded-full border border-[var(--ssafy-blue)] font-[600] text-[var(--ssafy-blue)] text-sm transition hover:bg-[#3396f4] hover:text-white"
      >
        채팅 참여하기
      </button>
    </div>

    <div
      ref="chatContainer"
      class="max-h-[500px] overflow-y-auto bg-[#eee] p-5 rounded-2xl"
    >
      <div v-for="message in messages" :key="message.id" class="mb-3">
        <div class="flex justify-between mb-1">
          <span class="font-bold">{{ message.userName }}</span>
          <span class="text-[#666] text-sm">{{ message.time }}</span>
        </div>
        <div class="bg-white p-3.5 rounded-[10px]">
          {{ message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AppHeader } from "@/components";
import { ref, onMounted, onUnmounted, watchEffect, nextTick } from "vue";
import { initializeWebSocket } from "@/services/websocket";

const chatContainer = ref(null);

const props = defineProps({
  title: String,
});

console.log(props.title);

// 기존에 불러온 메세지 데이터 연결
const messages = ref([
  {
    id: Date.now(),
    userName: "테스트 유저",
    content: "테스트 메시지 ",
    time: new Date().toLocaleTimeString(),
  },
  {
    id: Date.now(),
    userName: "테스트 유저",
    content: "테스트 메시지 ",
    time: new Date().toLocaleTimeString(),
  },
  {
    id: Date.now(),
    userName: "테스트 유저",
    content: "테스트 메시지 ",
    time: new Date().toLocaleTimeString(),
  },
  {
    id: Date.now(),
    userName: "테스트 유저",
    content: "테스트 메시지 ",
    time: new Date().toLocaleTimeString(),
  },
]);
let ws = null;

onMounted(() => {
  connectWebSocket();
});

onUnmounted(() => {
  if (ws) ws.close();
});

function connectWebSocket() {
  ws = initializeWebSocket();

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    messages.value.push(message);
  };
}

// 메시지 변경을 감지하여 스크롤 조정
watchEffect(() => {
  // messages가 변경될 때마다 실행
  if (messages.value.length && chatContainer.value) {
    nextTick(() => {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    });
  }
});
</script>
