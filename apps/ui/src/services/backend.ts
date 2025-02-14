import { BACKEND_URL } from "astro:env/client";
import axios from "axios";

const baseURL = BACKEND_URL;

if (!baseURL) throw new Error("BACKEND_URL is not set");

export const BackendService = axios.create({
  baseURL,
});
