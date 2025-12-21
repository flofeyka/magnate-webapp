import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { detectPlatform } from "../utils/detectPlatform";

const platform = detectPlatform();

const authData: { vk_token?: string; telegram_token?: string } = {};

let vkInitPromise: Promise<void> | null = null;

const initVk = async () => {
  if (!vkInitPromise) {
    vkInitPromise = (async () => {
      await bridge.send("VKWebAppInit");

      const { access_token } = await bridge.send("VKWebAppGetAuthToken", {
        app_id: Number(import.meta.env.VITE_PUBLIC_VK_APP_ID),
        scope: "",
      });

      authData.vk_token = access_token;
    })();
  }

  return vkInitPromise;
};

export const initAuth = async () => {
  if (platform === "vk") {
    await initVk();
  }

  if (platform === "telegram") {
    const tg = window.Telegram.WebApp;
    tg.ready();
    authData.telegram_token = tg.initData;
  }
};

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

baseApi.interceptors.request.use(async (config) => {
  const { vk_token, telegram_token } = authData;

  if (config.method === "post" || config.method === "put") {
    config.data = {
      ...config.data,
      vk_token,
      telegram_token,
    };
  }

  return config;
});
