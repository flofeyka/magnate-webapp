import { Avatar, Button, Chip } from "@heroui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { PositionIcon } from "../../assets/PositionIcon";
import { AimIcon } from "../../assets/AimIcon";

const getTitleByStep = (step: number) => {
  switch (step) {
    case 1:
      return "Поставь объект на поле!";
    case 2:
      return "Сделай ход!";
    case 3:
      return "Ждем остальных игроков!";
    default:
      return "Ждем остальных игроков!";
  }
};

const getIconByStep = (step: number) => {
  switch (step) {
    case 1:
      return <PositionIcon />;
    case 2:
      return <AimIcon />;
    default:
      return <AimIcon />;
  }
};

interface Company {
  title: string;
  aims: { x: number; y: number }[];
  locations: { x: number; y: number }[];
}

interface Battle {
  targetCompany: Company;
  company: Company;
}

const mockedBattle = {
  targetCompany: {
    title: "LinkApp Technologies",
    aims: [
      { x: 3, y: 2 },
      { x: 5, y: 5 },
      { x: 3, y: 1 },
      { x: 8, y: 8 },
      { x: 3, y: 6 },
    ],
    locations: [
      { x: 3, y: 8 },
      { x: 4, y: 3 },
      { x: 8, y: 6 },
      { x: 6, y: 1 },
      { x: 5, y: 6 },
    ],
  },
  company: {
    title: "NeroTeam",
    aims: [
      { x: 5, y: 3 },
      { x: 6, y: 2 },
      { x: 2, y: 4 },
      { x: 1, y: 7 },
      { x: 5, y: 4 },
    ],
    locations: [
      { x: 4, y: 6 },
      { x: 4, y: 5 },
      { x: 6, y: 4 },
      { x: 7, y: 6 },
      { x: 3, y: 2 },
    ],
  },
};

const OccupationPage: React.FC = () => {
  const [step, setStep] = React.useState<number>(1);
  const [selectedPosition, setSelectedPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [battleData, setBattleData] = React.useState<Battle | null>(null);

  console.log(battleData);

  const onSelectPosition = React.useCallback(
    (x: number, y: number) => {
      if (step > 2) return;
      setSelectedPosition({ x, y });
    },
    [step]
  );

  const onApplyPosition = React.useCallback(() => {
    setStep((prev) => (prev < 3 ? prev + 1 : prev));

    setSelectedPosition(null);

    if (step > 2) {
      setInterval(() => {
        setBattleData(mockedBattle);
      }, 3);
    }
  }, [step]);

  const id = useParams().id;

  if (!id) return <div>Неправильная ссылка</div>;

  return (
    <div className="space-y-3 max-w-[400px] mx-auto">
      <header className="space-y-3">
        <div className="flex gap-3 text-2xl items-center text-[#F31260]">
          <Avatar radius="lg" color="danger" /> Company name
        </div>

        <div>
          <Chip color="danger">Оставшееся время: 2:32</Chip>
        </div>

        <div className="text-center text-2xl">{getTitleByStep(step)}</div>
      </header>

      <main className="space-y-1">
        {Array.from({ length: 9 }, (_, y) => (
          <div className="flex gap-1" key={y}>
            {Array.from({ length: 9 }, (_, x) => {
              return (
                <button
                  disabled={step > 2}
                  onClick={() => onSelectPosition(x, y)}
                  className="rounded-sm disabled:opacity-80 bg-[#D9D9D9] flex-1 aspect-square"
                  key={x}
                >
                  {selectedPosition &&
                    selectedPosition.x === x &&
                    selectedPosition.y === y &&
                    getIconByStep(step)}
                </button>
              );
            })}
          </div>
        ))}
        {step < 3 && (
          <Button className="w-full" onPress={onApplyPosition}>
            Применить ход
          </Button>
        )}
      </main>
    </div>
  );
};

export default OccupationPage;
