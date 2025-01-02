<template>
  <div class="board-side-menu p-4 bg-white shadow-sm">
    <div class="mb-6">
      <nav class="space-y-4">
        <!-- <router-link
          :to="{ name: 'BoardList', params: { boardId: 0 } }"
          :class="[
            'block py-2 hover:text-[#3396F4] text-[18px] font-[600] border-solid border-b-2 border-gray-200 transition',
            { 'text-[#3396F4] font-[600]': isCurrentBoard(0) },
          ]"
        >
          전체글 보기
        </router-link> -->

        <div class="chat-section mb-10">
          <h4
            :class="['mb-2 text-[18px] font-[600]']"
            class="border-solid border-b-[1px] border-gray-300 pb-3 mb-3 flex items-center"
          >
            채팅방<em
              class="px-2 py-[3px] bg-[var(--ssafy-berry)] text-white font-[600] rounded-[4px] text-[0.6rem] ml-1"
              >LIVE</em
            >
          </h4>
          <div class="flex flex-col gap-3">
            <router-link
              v-for="chat in communityChats"
              :key="chat.chatId"
              :to="{ name: 'Chat', params: { id: chat.id } }"
              class="hover:text-[#3396F4] text-[16px] transition border-solid border-[1px] rounded-[10px] hover:border-[var(--ssafy-blue)]"
              :class="{
                'text-[#3396F4] font-[600]': isCurrentBoard(chat.chatId),
              }"
            >
              <div class="bg-[#f4f4f4] py-3 px-4 rounded-[10px]">
                {{ chat.chatName }}
              </div>
            </router-link>
          </div>
        </div>
        <div class="board-section">
          <h4
            :class="[
              'mb-2 text-[18px] font-[600]',
              { 'text-[#3396F4]': isSubRouteActive },
            ]"
            class="border-solid border-b-[1px] border-gray-300 pb-3 mb-3"
          >
            싸뮤니티 게시판
          </h4>
          <div class="space-y-1">
            <router-link
              v-for="board in communityBoards"
              :key="board.boardId"
              :to="{ name: 'BoardList', params: { boardId: board.boardId } }"
              class="block py-1 hover:text-[#3396F4] text-[16px] transition"
              :class="{
                'text-[#3396F4] font-[600]': isCurrentBoard(board.boardId),
              }"
            >
              {{ board.boardName }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBoards } from "@/apis";
const route = useRoute();
const communityBoards = ref([
  // { id: 1, name: "자유 게시판", title: "자유게시판" },
  // { id: 2, name: "가입 인사", title: "가입인사" },
  // { id: 3, name: "익명 게시판", title: "익명게시판" },
]);

const communityChats = ref([
  { id: 1, chatName: "익명 채팅방 🥸" },
  { id: 2, chatName: "실시간 채팅방👄" },
]);

const currentBoardId = computed(() => Number(route.params.boardId) || 1);

const isSubRouteActive = computed(() => {
  return currentBoardId.value !== 0;
});

const isCurrentBoard = (boardId) => {
  return currentBoardId.value === boardId;
};

// 게시판 리스트 조회
onMounted(async () => {
  try {
    const response = await getBoards();
    // boards.value = response;
    console.log("getBoards response", response);
    communityBoards.value = Array.isArray(response) ? response : [];
    console.log("communityBoards.value", communityBoards.value);
  } catch (error) {
    console.error("게시판 리스트 조회 실패:", error);
  }
});
</script>

<style scoped>
.router-link-hover {
  color: #3396f4;
}
</style>
