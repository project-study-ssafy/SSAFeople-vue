<template>
  <div
    class="chat-box bg-white rounded-xl p-4 h-96 border border-gray-300 flex flex-col"
  >
    <!-- 채팅 메시지 영역 -->
    <div
      class="flex-1 overflow-y-auto mb-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
      ref="chatContainer"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="
          message.nickname === 'system'
            ? 'flex justify-center'
            : message.nickname === userStore.userData.email
              ? 'flex justify-end'
              : 'flex justify-start'
        "
      >
        <div
          :class="[
            message.nickname === 'system'
              ? 'bg-gray-200 text-center'
              : message.username === userStore.userData.username
                ? 'bg-blue-100'
                : 'bg-gray-100',
            'max-w-[70%] rounded-lg px-4 py-2',
          ]"
        >
          <div
            v-if="message.nickname !== 'system'"
            class="text-xs text-gray-500"
          >
            {{ message.nickname + " (" + message.nickname + ")" }}
          </div>
          <div class="text-sm break-all whitespace-pre-wrap overflow-hidden">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>

    <!-- 입력 영역 -->
    <div class="flex gap-2">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="메시지를 입력하세요"
        class="flex-1 p-2 border rounded-lg focus:outline-none focus:border-main-blue"
      />
      <AppButton
        @click="sendMessage"
        button-type="ellipse-filled"
        text="전송"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore, useAuthStore } from "@/stores/auth";
import { AppButton } from "@/components";
import { postChattingNickname } from "@/apis";
import { Client } from "@stomp/stompjs";
import Swal from "sweetalert2";

const messages = ref([]);
const newMessage = ref("");
const stompClient = ref(null);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const scrollToBottom = () => {
  const chatContainer = document.querySelector("#chat-container");
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};

const connectStomp = () => {
  if (!authStore.token) {
    messages.value.push({
      message: "채팅을 이용하기 위해서는 로그인이 필요합니다.",
      username: "System",
      nickname: "system",
      timestamp: new Date().toISOString(),
    });
    scrollToBottom();
    return;
  }

  stompClient.value = new Client({
    brokerURL: "wss://ssafeople.com/chat", // WebSocket URL
    connectHeaders: {
      accessToken: authStore.token, // 인증 토큰 추가
    },
    reconnectDelay: 3000, // 재연결 지연 시간
    debug: (msg) => console.log("STOMP Debug:", msg), // 디버그 출력
    onConnect: () => {
      messages.value.push({
        content: "채팅방에 연결되었습니다.",
        username: "System",
        nickname: "system",
        timestamp: new Date().toISOString(),
      });
      scrollToBottom();

      // 특정 채팅방 구독
      stompClient.value.subscribe(
        `/sub/chat/room/${route.params.id}`,
        (message) => {
          const data = JSON.parse(message.body);
          console.log(data);
          messages.value.push(data);
          scrollToBottom();
        },
      );
    },
    onStompError: (frame) => {
      console.error("STOMP 에러:", frame.headers["message"]);
      messages.value.push({
        content: "STOMP 에러가 발생했습니다.",
        username: "System",
        nickname: "system",
        timestamp: new Date().toISOString(),
      });
      scrollToBottom();
    },
    onWebSocketClose: () => {
      messages.value.push({
        content: "서버와의 연결이 종료되었습니다.",
        username: "System",
        nickname: "system",
        timestamp: new Date().toISOString(),
      });
      scrollToBottom();
    },
  });

  stompClient.value.activate(); // STOMP 클라이언트 활성화
};

const sendMessage = () => {
  if (!authStore.token) {
    messages.value.push({
      content: "메시지를 보내기 위해서는 로그인이 필요합니다.",
      username: "System",
      nickname: "system",
      timestamp: new Date().toISOString(),
    });
    newMessage.value = "";
    scrollToBottom();
    return;
  }

  if (newMessage.value.trim() && stompClient.value?.connected) {
    const messageData = {
      content: newMessage.value,
      // username: userStore.userData.username,
      // email: userStore.userData.email,
      // timestamp: new Date().toISOString(),
    };

    stompClient.value.publish({
      destination: `/pub/send/${route.params.id}`,
      body: JSON.stringify(messageData),
    });
    newMessage.value = "";
  }
};

onMounted(() => {
  if (route.params.id === "1" && !userStore.userData.chattingNickname) {
    Swal.fire({
      title: "익명 채팅 닉네임을 입력해주세요",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "저장",
      confirmButtonColor: "#3396F4",
      cancelButtonText: "나가기",
      showLoaderOnConfirm: true,
      preConfirm: async (nickname) => {
        try {
          const response = await postChattingNickname(nickname);
          if (!response.ok) {
            return Swal.showValidationMessage(`
                  ${JSON.stringify(await response.json())}
                `);
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`
                Request failed: ${error}
              `);
        }
      },
      allowOutsideClick: false,
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          // title: `반갑습니다! ${nickname}님.`,
          title: `반갑습니다! test님.`,
          showConfirmButton: false,
          timer: 1500,
        });
        connectStomp();
      } else if (result.dismiss === "cancel") {
        router.push("/");
      }
    });
  }
});

onUnmounted(() => {
  if (stompClient.value) {
    stompClient.value.deactivate(); // 연결 종료
  }
});
</script>
