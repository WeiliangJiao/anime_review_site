import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export const getAnimes = () => axios.get("/animes");
// export const getAnime = (animeId) => axios.get(`/animes/${animeId}`);
export const getAnimeReviews = (animeId) => axios.get(`/reviews/${animeId}`);
export const addReview = (data) => axios.post("/reviews/add", data);
export const deleteReview = (reviewId) => axios.delete(`/reviews/${reviewId}`);
export const upvoteReview = (reviewId) =>
  axios.put(`/reviews/${reviewId}/upvote`);
export const downvoteReview = (reviewId) =>
  axios.put(`/reviews/${reviewId}/downvote`);
export const signUp = (data) => axios.post("/users/signup", data);
export const logIn = (data) => axios.post("/users/login", data);
// export const getUser = (userId) => axios.get(`/users/${userId}`);
export const askChatbot = (question) => axios.post("/chatbot", { question });
