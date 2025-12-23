import bridge from "@vkontakte/vk-bridge";
import { detectPlatform } from "../utils/detectPlatform";

const platform = detectPlatform();

let authInitPromise: Promise<void> | null = null;

export const initAuth = (): Promise<void> => {
  if (!authInitPromise) {
    authInitPromise = (async () => {
      if (platform === "vk") {
        await bridge.send("VKWebAppInit");

        const { access_token } = await bridge.send("VKWebAppGetAuthToken", {
          app_id: Number(import.meta.env.VITE_PUBLIC_VK_APP_ID),
          scope: "",
        });

        localStorage.setItem("vk-access-token", access_token);
      }

      if (platform === "telegram") {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        tg.ready();
        localStorage.setItem("telegram-init-data", tg.initData);
      }
    })();
  }

  return authInitPromise;
};
