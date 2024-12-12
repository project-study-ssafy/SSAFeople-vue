// // stores.board.js

// import { defineStore } from "pinia";
// import axios from "axios";
// import { boardAPI } from "@/apis/board";

// export const useBoardStore = defineStore("board", {
//   // 설정
//   state: () => ({
//     posts: [
//       // {
//       //   postId: 1,
//       //   boardId: 1, // 자유게시판
//       //   boardName: "자유게시판",
//       //   title: "자바 스프링 질문이요",
//       //   author: "김싸피",
//       //   content:
//       //     "스프링 공부 시작했는데 너무 어려워요 ㅠㅠ 다들 어떻게 공부하시나요?",
//       //   createdAt: "2024-03-07 10:31",
//       //   viewCnt: 45,
//       //   likes: 5,
//       //   scrap: 2,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 2,
//       //   boardId: 2, // 익명게시판
//       //   boardName: "익명게시판",
//       //   title: "프로젝트 팀원 구해요",
//       //   author: "익명",
//       //   content: "리액트 프로젝트 같이하실 분 구합니다. DM 주세요!",
//       //   createdAt: "2024-03-07 11:20",
//       //   viewCnt: 123,
//       //   likes: 12,
//       //   scrap: 3,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 3,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "알고리즘 스터디원 모집",
//       //   author: "이싸피",
//       //   content: "매주 토요일 알고리즘 스터디하실 분 구합니다.",
//       //   createdAt: "2024-03-07 13:15",
//       //   viewCnt: 89,
//       //   likes: 8,
//       //   scrap: 4,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 4,
//       //   boardId: 2,
//       //   boardName: "익명게시판",
//       //   title: "오늘 점심 뭐 먹을까요?",
//       //   author: "익명",
//       //   content: "점심 메뉴 추천 부탁드려요~",
//       //   createdAt: "2024-03-07 12:00",
//       //   viewCnt: 67,
//       //   likes: 3,
//       //   scrap: 0,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 5,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "리액트 강의 추천",
//       //   author: "박싸피",
//       //   content: "리액트 입문하기 좋은 강의 추천해주세요!",
//       //   createdAt: "2024-03-07 14:45",
//       //   viewCnt: 156,
//       //   likes: 15,
//       //   scrap: 8,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 6,
//       //   boardId: 2,
//       //   boardName: "익명게시판",
//       //   title: "프로젝트 기간 너무 힘드네요",
//       //   author: "익명",
//       //   content: "다들 힘내봐요 ㅠㅠ",
//       //   createdAt: "2024-03-07 15:30",
//       //   viewCnt: 234,
//       //   likes: 25,
//       //   scrap: 0,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 7,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "취업 준비 어떻게 하시나요?",
//       //   author: "최싸피",
//       //   content: "포트폴리오는 어떻게 준비하시나요?",
//       //   createdAt: "2024-03-07 16:20",
//       //   viewCnt: 198,
//       //   likes: 18,
//       //   scrap: 12,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 8,
//       //   boardId: 2,
//       //   boardName: "익명게시판",
//       //   title: "코딩테스트 합격했어요!",
//       //   author: "익명",
//       //   content: "드디어 코테 합격했네요 ㅠㅠ",
//       //   createdAt: "2024-03-07 17:10",
//       //   viewCnt: 145,
//       //   likes: 32,
//       //   scrap: 0,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 9,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "자바스크립트 스터디 모집",
//       //   author: "정싸피",
//       //   content: "매주 수요일 저녁 8시에 진행합니다.",
//       //   createdAt: "2024-03-07 18:00",
//       //   viewCnt: 167,
//       //   likes: 14,
//       //   scrap: 6,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 10,
//       //   boardId: 2,
//       //   boardName: "익명게시판",
//       //   title: "오늘 저녁 치킨 어때요?",
//       //   author: "익명",
//       //   content: "치킨 먹을 사람~?",
//       //   createdAt: "2024-03-07 18:45",
//       //   viewCnt: 88,
//       //   likes: 22,
//       //   scrap: 0,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 11,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "Docker 관련 질문",
//       //   author: "강싸피",
//       //   content: "도커 처음 시작하는데 추천하실 자료 있나요?",
//       //   createdAt: "2024-03-07 19:30",
//       //   viewCnt: 134,
//       //   likes: 7,
//       //   scrap: 5,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 12,
//       //   boardId: 2,
//       //   boardName: "익명게시판",
//       //   title: "팀플 너무 힘들어요",
//       //   author: "익명",
//       //   content: "팀플 언제 끝나나요 ㅠㅠ",
//       //   createdAt: "2024-03-07 20:15",
//       //   viewCnt: 256,
//       //   likes: 45,
//       //   scrap: 0,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 13,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "정처기 준비하시는 분?",
//       //   author: "윤싸피",
//       //   content: "정처기 같이 준비하실 분 계신가요?",
//       //   createdAt: "2024-03-07 21:00",
//       //   viewCnt: 178,
//       //   likes: 16,
//       //   scrap: 9,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 14,
//       //   boardId: 2,
//       //   boardName: "익명게시판",
//       //   title: "주말에 뭐하세요?",
//       //   author: "익명",
//       //   content: "다들 주말에 뭐하시나요~?",
//       //   createdAt: "2024-03-07 21:45",
//       //   viewCnt: 144,
//       //   likes: 28,
//       //   scrap: 0,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 15,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "Spring Security 질문",
//       //   author: "한싸피",
//       //   content: "Spring Security 설정 관련해서 도움 필요합니다.",
//       //   createdAt: "2024-03-07 22:30",
//       //   viewCnt: 167,
//       //   likes: 13,
//       //   scrap: 7,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 16,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "Spring Security 질문",
//       //   author: "한싸피",
//       //   content: "Spring Security 설정 관련해서 도움 필요합니다.",
//       //   createdAt: "2024-03-07 22:30",
//       //   viewCnt: 167,
//       //   likes: 13,
//       //   scrap: 7,
//       //   commentCnt: 8,
//       //   isNotification: false,
//       // },
//       // {
//       //   postId: 17,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "Spring Security 질문",
//       //   author: "한싸피",
//       //   content: "Spring Security 설정 관련해서 도움 필요합니다.",
//       //   createdAt: "2024-03-07 22:30",
//       //   viewCnt: 167,
//       //   likes: 13,
//       //   scrap: 7,
//       //   commentCnt: 8,
//       //   isNotification: true,
//       // },
//       // {
//       //   postId: 18,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "Spring Security 질문",
//       //   author: "한싸피",
//       //   content: "Spring Security 설정 관련해서 도움 필요합니다.",
//       //   createdAt: "2024-03-07 22:30",
//       //   viewCnt: 167,
//       //   likes: 13,
//       //   scrap: 7,
//       //   commentCnt: 8,
//       //   isNotification: true,
//       // },
//       // {
//       //   postId: 19,
//       //   boardId: 1,
//       //   boardName: "자유게시판",
//       //   title: "Spring Security 질문",
//       //   author: "한싸피",
//       //   content: "Spring Security 설정 관련해서 도움 필요합니다.",
//       //   createdAt: "2024-03-07 22:30",
//       //   viewCnt: 167,
//       //   likes: 13,
//       //   scrap: 7,
//       //   commentCnt: 8,
//       //   isNotification: true,
//       // },
//     ], // 조회된 전체 게시글 목록
//     post: {
//       // postId: 1,
//       // boardId: 1,
//       // boardName: "자유 게시판",
//       // title: "시험 기간 공부",
//       // author: "김싸피",
//       // content:
//       //   "20일날 시험인데 다들 공부 시작하나요?! 다들 지금부터 시작하나요? 20일날 시험인데 다들 공부 시작하나요?! 다들 지금부터 시작하나요?20일날 시험인데 다들 공부 시작하나요?! 다들 지금부터 시작하나요?20일날 시험인데 다들 공부 시작하나요?! 다들 지금부터 시작하나요?20일날 시험인데 다들 공부 시작하나요?! 다들 지금부터 시작하나요?",
//       // createdAt: "2024.12.07 00:31",
//       // viewCnt: 15,
//       // likes: 0,
//       // scrap: 0,
//     },
//     comments: [
//       // {
//       //   id: 1,
//       //   author: "댓글작성자1",
//       //   content: "저도 이제 시작해요",
//       //   createdAt: "2024.12.07 00:35",
//       //   showReplyInput: false,
//       //   replyText: "",
//       //   replies: [
//       //     {
//       //       id: 1,
//       //       author: "답글작성자1",
//       //       content: "화이팅하세요!",
//       //       createdAt: "2024.12.07 00:40",
//       //     },
//       //   ],
//       // },
//     ],
//     currentBoardId: null,
//     isLoading: false,
//     isServerMode: true, // 서버 연동 모드 플래그
//   }),

//   //
//   actions: {
//     // 전체글 or 특정 게시판의 게시물 전체 조회
//     async fetchPostsByBoardId(boardId = null) {
//       // boardId의 기본값을 null로 설정
//       this.isLoading = true;
//       this.currentBoardId = boardId;

//       try {
//         if (this.isServerMode) {
//           const response = await axios.get(boardAPI.getPostsByBoardId(boardId));
//           console.log(response.data.data);
//           this.posts = response.data.data;
//         } else {
//           // boardId가 null이면 필터링하지 않음
//           if (!boardId) {
//             return this.posts;
//           }
//           // boardId가 있으면 해당 게시판 글만 필터링
//           this.posts = this.posts.filter((post) => post.boardId === boardId);
//         }
//       } catch (error) {
//         console.error(`게시글 조회 실패:`, error);
//         throw error;
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     // 게시글 등록
//     async createPost(postData, boardId) {
//       try {
//         if (this.isServerMode) {
//           const response = await axios.post(boardAPI.createPost(boardId), {
//             ...postData,
//             boardId,
//           });
//           this.posts.push(response.data);
//         } else {
//           const newPost = {
//             id: this.posts.length + 1,
//             ...postData,
//             boardId,
//             createdAt: new Date().toLocaleString(),
//           };
//           this.posts.push(newPost);
//         }
//       } catch (error) {
//         console.error("게시글 등록 실패:", error);
//         throw error;
//       }
//     },

//     // 게시글 수정
//     async updatePost(postId, updateData) {
//       try {
//         if (this.isServerMode) {
//           const response = await axios.put(
//             boardAPI.updatePost(postId),
//             updateData
//           );
//           const index = this.posts.findIndex((post) => post.id === postId);
//           if (index !== -1) {
//             this.posts[index] = response.data;
//           }
//         } else {
//           const index = this.posts.findIndex((post) => post.id === postId);
//           if (index !== -1) {
//             this.posts[index] = {
//               ...this.posts[index],
//               ...updateData,
//               updatedAt: new Date().toLocaleString(),
//             };
//           }
//         }
//       } catch (error) {
//         console.error("게시글 수정 실패:", error);
//         throw error;
//       }
//     },

//     // 게시글 삭제
//     async deletePost(postId) {
//       try {
//         if (this.isServerMode) {
//           await axios.delete(boardAPI.deletePost(postId));
//           this.posts = this.posts.filter((post) => post.id !== postId);
//         } else {
//           this.posts = this.posts.filter((post) => post.id !== postId);
//         }
//       } catch (error) {
//         console.error("게시글 삭제 실패:", error);
//         throw error;
//       }
//     },

//     // id에 따른 board 게시글 상세 조회
//     async fetchPostDetail(postId) {
//       this.isLoading = true;
//       try {
//         if (this.isServerMode) {
//           const response = await axios.get(boardAPI.getPostDetail(postId));
//           this.post = response.data;
//         }
//         // 서버 모드가 아닐 경우 기본 데이터 사용
//       } catch (error) {
//         console.error("게시글 조회 실패:", error);
//         throw error;
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     // - 해당 게시글의 덧글 목록 조회
//     async fetchComments(postId) {
//       try {
//         if (this.isServerMode) {
//           const response = await axios.get(boardAPI.getComments(postId));
//           this.comments = response.data;
//         }
//       } catch (error) {
//         console.error("댓글 조회 실패:", error);
//         throw error;
//       }
//     },

//     // - 해당 게시글에 덧글 등록
//     async addComment(postId, content) {
//       try {
//         if (this.isServerMode) {
//           const response = await axios.post(boardAPI.addComment(), {
//             postId,
//             content,
//           });
//           this.comments.push(response.data);
//         } else {
//           // 임시 데이터 모드에서는 로컬에서 댓글 추가
//           this.comments.push({
//             id: this.comments.length + 1,
//             author: "현재사용자",
//             content,
//             createdAt: new Date().toLocaleString(),
//             showReplyInput: false,
//             replyText: "",
//             replies: [],
//           });
//         }
//       } catch (error) {
//         console.error("댓글 작성 실패:", error);
//         throw error;
//       }
//     },

//     // - 해당 덧글의 답글(대댓글) 등록
//     async addReply(commentId, content) {
//       try {
//         if (this.isServerMode) {
//           const response = await axios.post(boardAPI.addReply(commentId), {
//             content,
//           });
//           const comment = this.comments.find((c) => c.id === commentId);
//           if (comment) {
//             comment.replies.push(response.data);
//           }
//         } else {
//           // 임시 데이터 모드에서는 로컬에서 답글 추가
//           const comment = this.comments.find((c) => c.id === commentId);
//           if (comment) {
//             comment.replies.push({
//               id: comment.replies.length + 1,
//               author: "현재사용자",
//               content,
//               createdAt: new Date().toLocaleString(),
//             });
//           }
//         }
//       } catch (error) {
//         console.error("답글 작성 실패:", error);
//         throw error;
//       }
//     },

//     // 서버 모드 전환
//     toggleServerMode() {
//       this.isServerMode = !this.isServerMode;
//     },
//   },

//   // getters : 음료 제조 시, 여러 재료들을 계량하듯 계산된 값을 제공함
//   getters: {
//     // 게시판 별 게시글 필터링
//     currentBoardPosts: (state) => {
//       if (!state.currentBoardId) return state.posts;
//       return state.posts.filter(
//         (post) => post.boardId === state.currentBoardId
//       );
//     },

//     // 공지사항 게시글
//     noticePosts: (state) => {
//       return state.posts.filter((post) => post.isNotification);
//     },

//     // 일반 게시글 (공지사항 제외)
//     regularPosts: (state) => {
//       return state.posts.filter((post) => !post.isNotification);
//     },
//   },
// });
