import { saveToken } from "@/utils/secureStore";
import * as SecureStore from "expo-secure-store";
import api from "./client";

export const authService = {
  register: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await api.post("/register", payload);

    if (res.data.data.token !== undefined) {
      await saveToken(res.data.data.token.access_token);
    }

    return res.data;
  },

  login: async (payload: { email: string; password: string }) => {
    const res = await api.post("/login", payload);

    if (res.data.data.token !== undefined) {
      await saveToken(res.data.data.token.access_token);
    }

    return res.data;
  },

  setPassword: async (payload: { access_code: string; password: string }) => {
    const res = await api.post("/set-rider-password", payload);
    return res.data;
  },

  googleSignup: async (payload: {
    name: string;
    email: string;
    picture: string;
  }) => {
    const res = await api.post("/google-signup", payload);

    if (res.data.data.token !== undefined) {
      await saveToken(res.data.data.token.access_token);
    }

    return res.data;
  },

  googleSignin: async (payload: { email: string }) => {
    const res = await api.post("/google-signin", payload);

    if (res.data.data.token !== undefined) {
      await saveToken(res.data.data.token.access_token);
    }

    return res.data;
  },

  completeProfile: async (payload) => {
    const res = await api.post("/user/complete-profile", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      transformRequest: (data, headers) => {
        return data; // prevent axios from messing with FormData
      },
    });
    return res.data;
  },

  sendOtp: async () => {
    const res = await api.get("/user/resend-otp");
    return res.data;
  },

  getCountries: async () => {
    const res = await api.get(`/get_countries`);
    return res.data;
  },

  getStates: async (id: string) => {
    const res = await api.get(`/get_states/${id}`);
    return res.data;
  },

  getCities: async (id: string) => {
    const res = await api.get(`/get_lga/${id}`);
    return res.data;
  },

  verifyOtp: async (payload: { otp: string }) => {
    const res = await api.post("/user/verify-otp", payload);
    return res.data;
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("access_token");
  },
};
