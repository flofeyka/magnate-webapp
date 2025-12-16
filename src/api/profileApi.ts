import { baseApi } from "./api";

export interface Profile {
  id: number;
  fullName: string;
  cash: number;
  euro: number;
  reputation: number;
  btc: number;
  company: string;
  createdAt: string;
}

export const fetchProfile = async (): Promise<Profile> => {
  try {
    const { data } = await baseApi.get("/profile/get");

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Ошибка при получении профиля");
  }
};
