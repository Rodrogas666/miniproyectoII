import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/comments",
});

export const postComent = async ({ datos }) => {
  const { data } = await axiosClient.post("/", datos);
  return data;
};

export const getComents = async () => {
  const { data } = await axiosClient.get("/");
  return data;
};

export const deleteComment = async ({ id }) => {
  const { data } = await axiosClient.delete(`/${id}`);
  return { data };
};

export const getCommentById = async ({ id }) => {
  const { data } = await axiosClient.get(`/${id}`);
  return data;
};

export const updateComment = async ({ id, datos }) => {
  const { data } = await axiosClient.put(`/${id}`, datos);
  return data;
};
