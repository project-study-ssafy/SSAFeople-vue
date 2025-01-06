// apis/board.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const boardUrl = axios.create({
  baseURL: import.meta.env.VITE_MAIN_API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 인터셉터 추가
boardUrl.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers["access-token"] = token;
      console.log("요청 헤더:", config.headers); // 헤더 확인용 로그
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

// ================
// 게시판/게시글 관련
// ================
// 게시판 목록 조회
// api/v1/boards
export const getBoards = async () => {
  try {
    const response = await boardUrl.get(`/boards`);
    console.log("게시판 리스트 조회 성공");
    console.log("response.data.data : ", response.data.data);

    return response.data.data;
  } catch (error) {
    return handleApiError(error, "게시글 말고 게시판 리스트 조회");
  }
};

// 게시글 목록 전체 조회
// api/v1/boards/{boardId}/posts/allposts
export const getPostsAll = async (boardId) => {
  try {
    const response = await boardUrl.get(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/allposts`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 목록 전체 조회");
  }
};

// 특정 게시판 게시글 목록 조회
// api/v1/boards/{boardId}/posts?page=1&size=15
export const getPostsByBoardId = async (boardId, postsPerPage, currentPage) => {
  try {
    console.log(postsPerPage);
    const response = await boardUrl.get(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts?page=${currentPage}&size=${postsPerPage}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 목록 조회");
  }
};

// 게시글 상세 조회
// api/v1/boards/{boardId}/posts/{postId}
export const getPostDetail = async (boardId, postId) => {
  try {
    const response = await boardUrl.get(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}`
    );
    console.log("getPostDetail response.data : ", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 상세 조회");
  }
};

// 게시글 작성
// api/v1/boards/{boardId}/posts
export const createPost = async (boardId, postFormData) => {
  try {
    const response = await boardUrl.post(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts`,
      postFormData,
      {
        headers: {
          // "Content-Type": "undefined ",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("게시글 등록 성공 response.data : ");
    console.log(response);
    console.log("boardId", boardId);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("서버 응답:", error.response.data);
    }
    return handleApiError(error, "게시글 등록");
  }
};

// 게시글 수정
// api/v1/boards/{boardId}/posts/{postId}
export const updatePost = async (boardId, postId, postFormData) => {
  // FormData 내용 확인 방법 1: entries() 사용
  console.log("=== FormData 내용 확인 ===");
  for (const pair of postFormData.entries()) {
    console.log(`${pair[0]}: `, pair[1]);

    // File 객체인 경우 추가 정보 출력
    if (pair[1] instanceof File) {
      console.log(`File name: ${pair[1].name}`);
      console.log(`File size: ${pair[1].size}`);
      console.log(`File type: ${pair[1].type}`);
    }
  }

  // FormData 내용 확인 방법 2: getAll() 사용
  console.log("이미지 파일 목록:", postFormData.getAll("images"));
  try {
    const response = await boardUrl.patch(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}`,
      postFormData,
      {
        headers: {
          // "Content-Type": "undefined ",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "게시글 수정");
  }
};

// 게시글 삭제
// api/v1/boards/{boardId}/posts/{postId}
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
// 좋아요 추천
// ================
// api/v1/boards/{boardId}/posts/{postId}/like
export const togglePostLike = async (boardId, postId, isCurrentlyLiked) => {
  try {
    // 현재 좋아요 상태에 따라 다른 엔드포인트 사용
    console.log("isCurrentlyLiked : ", isCurrentlyLiked);
    const endpoint = isCurrentlyLiked ? "unlike" : "like";

    const response = await boardUrl.post(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}/${endpoint}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "좋아요 추천 수 toggle");
  }
};

// ================
// 댓글 관련
// ================

// 댓글 목록 조회
// api/v1/boards/{boardId}/posts/{postId}/comments
export const getComments = async (boardId, postId) => {
  try {
    const response = await boardUrl.get(
      `/boards/${boardId}/posts/${postId}/comments` // VITE_BOARDS 환경변수 제거
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
      `/boards/${boardId}/posts/${postId}/comments`, // VITE_BOARDS 환경변수 사용하지 않음
      { content }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "댓글 작성");
  }
};

// 댓글 삭제
// api/v1/boards/${boardId}/posts/${postId}/comments/{commentId}
export const deleteComment = async (boardId, postId, commentId) => {
  try {
    const response = await boardUrl.delete(
      `${import.meta.env.VITE_BOARDS}${boardId}/posts/${postId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "댓글 삭제");
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
