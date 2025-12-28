export function detectPlatform() {
  if (typeof window === "undefined") return "unknown";

  if (
    window.location.search.includes("vk_platform") ||
    window.location.search.includes("vk_user_id")
  ) {
    return "vk";
  }

  if (window.Telegram?.WebApp) return "telegram";

  return "browser";
}
