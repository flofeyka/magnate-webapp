import { Avatar, Input, Spinner } from "@heroui/react";
import React from "react";
import { type Profile } from "../api/profileApi";

const mockedProfile = {
  id: 123123123123,
  fullName: "supalonely",
  cash: 123123123,
  euro: 123123123,
  reputation: 15,
  btc: 152,
  company: "LinkApp Technologies",
  createdAt: "2025-12-16T00:00:00.000Z",
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = React.useState<Profile | null>(null);

  React.useEffect(() => {
    // const fetchProfileData = async () => {
    //   const data = await fetchProfile();

    //   setProfile(data);
    // };

    // fetchProfileData();

    setProfile(mockedProfile);
  }, []);

  if (!profile) return <Spinner />;
  return (
    <div className="space-y-5 w-full block">
      <div className="flex flex-col items-center gap-1">
        <Avatar size="lg" radius="md" />
        <div className="text-xl">supalonely</div>
      </div>

      <div className="space-y-3 w-full">
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="ID аккаунта"
          value={String(profile.id)}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Имя"
          value={profile.fullName}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Наличные"
          value={(+profile.cash).toLocaleString("ru-RU") + " ₽"}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Евро"
          value={(+profile.euro).toLocaleString("ru-RU") + " €"}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Репутация"
          value={"+" + profile.reputation}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Bitcoin"
          value={profile.btc + " BTC"}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Компания"
          value={profile.company}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Дата регистрации"
          value={new Date(profile.createdAt).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
