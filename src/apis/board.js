// apis/board.js
import axios from "axios";

const boardUrl = axios.create({
  baseURL: import.meta.env.VITE_MAIN_API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 에러 처리 헬퍼 함수
const handleApiError = (error, operation) => {
  if (error.response) {
    console.error(`${operation} 실패:`, {
      status: error.response.status,
      data: error.response.data,
    });
  } else if (error.request) {
    console.error(`${operation} 네트워크 오류:`, error.request);
  } else {
    console.error(`${operation} 오류:`, error.message);
  }
  throw error;
};

// API 함수들
export const getPostsByBoardId = async (boardId) => {
  try {
    const response = await boardUrl.get(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 목록 조회");
  }
};

export const getPostDetail = async (boardId, postId) => {
  try {
    const response = await boardUrl.get(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 상세 조회");
  }
};

export const createPost = async (boardId, postData) => {
  try {
    const response = await boardUrl.post(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts`,
      postData
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 등록");
  }
};

export const updatePost = async (boardId, postId, postData) => {
  try {
    const response = await boardUrl.put(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}`,
      postData
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 수정");
  }
};

export const deletePost = async (boardId, postId) => {
  try {
    const response = await boardUrl.delete(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 삭제");
  }
};

// ================
// 댓글 관련
// ================

// 댓글 목록 조회
export const getComments = async (boardId, postId) => {
  try {
    const response = await boardUrl.get(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "댓글 목록 조회");
  }
};

// 댓글 작성
export const createComment = async (boardId, postId, content) => {
  try {
    const response = await boardUrl.post(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}/comments`,
      { content }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "댓글 작성");
  }
};

// 답글 작성
export const createReply = async (boardId, postId, commentId, content) => {
  try {
    const response = await boardUrl.post(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}/comments/${commentId}/replies`,
      { content }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "답글 작성");
  }
};
