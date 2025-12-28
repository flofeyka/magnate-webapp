import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { detectPlatform } from "../utils/detectPlatform";

const platform = detectPlatform();

let isInit = false;

if (bridge) {
  bridge.send("VKWebAppInit");
}

const initAuthOnce = async () => {
  try {
    if (platform === "vk" && bridge) {
      const launchParams = await bridge.send("VKWebAppGetLaunchParams");

      localStorage.setItem("vk-data", JSON.stringify(launchParams));
    } else if (platform === "telegram") {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        localStorage.setItem("telegram-init-data", tg.initData);
      }
    }
  } finally {
    isInit = true;
  }
};

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

baseApi.interceptors.request.use(async (config) => {
  if (!isInit) {
    await initAuthOnce();
  }
  if (
    config.method === "post" ||
    config.method === "put" ||
    config.method === "patch"
  ) {
    const vkDataString = localStorage.getItem("vk-data");
    config.data = {
      ...(config.data ?? {}),
      vk_data: vkDataString && JSON.parse(vkDataString),
      telegram_token: localStorage.getItem("telegram-init-data") || null,
    };
  }

  return config;
});
