import axios from "axios";

const baseInstance = axios.create({
  baseURL: "https://note-sigma-black.vercel.app/api/v1/",
});

export default baseInstance;