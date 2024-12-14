<template>
  <div>
    <AppHeader :type="1" text="테스트 게시판" />
    <table>
      <thead>
        <tr>
          <th>글쓴이</th>
          <th>내용</th>
          <th>작성일자</th>
          <th>댓글 수</th>
          <th>공감 수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.author }}</td>
          <td>{{ post.content }}</td>
          <td>{{ post.createdAt }}</td>
          <td>{{ post.comments }}</td>
          <td>{{ post.likes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AppHeader } from "../../..";
const posts = ref([
  {
    id: 1,
    author: "홍길동",
    content: "안녕하세요! 이 게시판은 Vue.js로 만들어졌습니다.",
    createdAt: "2024-10-01",
    comments: 2,
    likes: 10,
  },
  {
    id: 2,
    author: "이순신",
    content: "이 게시판이 마음에 들어요!",
    createdAt: "2024-10-02",
    comments: 1,
    likes: 5,
  },
  // 추가 게시글...
]);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
