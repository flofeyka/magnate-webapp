import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { detectPlatform } from "../utils/detectPlatform";

const platform = detectPlatform();

console.log(platform);

let authInitialized = false;
let authInitializing = false;

const initAuthOnce = async () => {
  if (authInitialized || authInitializing) return;

  authInitializing = true;

  console.log("init auth once");
  try {
    if (platform === "vk") {
      console.log("sending bridge");
      await bridge.send("VKWebAppInit");
      console.log("bridge sent");
      const { access_token } = await bridge.send("VKWebAppGetAuthToken", {
        app_id: Number(import.meta.env.VITE_PUBLIC_VK_APP_ID),
        scope: "",
      });

      console.log(access_token);

      localStorage.setItem("vk-access-token", access_token);
    }

    if (platform === "telegram") {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        localStorage.setItem("telegram-init-data", tg.initData);
      }
    }

    authInitialized = true;
  } finally {
    authInitializing = false;
  }
};

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

baseApi.interceptors.request.use(async (config) => {
  // ❗ КРИТИЧЕСКИЙ ПРЕДОХРАНИТЕЛЬ
  if (!authInitialized) {
    await initAuthOnce();
  }

  if (
    config.method === "post" ||
    config.method === "put" ||
    config.method === "patch"
  ) {
    config.data = {
      ...(config.data ?? {}),
      vk_token: localStorage.getItem("vk-access-token"),
      telegram_token: localStorage.getItem("telegram-init-data"),
    };
  }

  return config;
});
