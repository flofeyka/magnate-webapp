import { Button } from "@heroui/react";
import type React from "react";

const GameNotFoundPage: React.FC = () => {
  return (
    <div className="top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-5 w-full max-w-[600px] fixed text-center gap-5 ">
      <h1 className="text-3xl font-semibold">
        Игра не была найдена! Попробуйте еще раз, либо обратитесь к{" "}
        <span className="font-bold">главе клана</span>.
      </h1>

      <Button color="danger" onPress={() => window.location.reload()}></Button>
    </div>
  );
};

export default GameNotFoundPage;
