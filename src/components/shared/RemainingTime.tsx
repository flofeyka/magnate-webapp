import { Chip } from "@heroui/react";
import React from "react";
import { formatTime } from "../../utils/formatTime";

interface IProps {
  remaining: number | null;
}

const RemainingTime: React.FC<IProps> = ({ remaining }) => {
  if (!remaining) return null;

  return (
    <div>
      <Chip variant="shadow" color="danger">
        Оставшееся время: {formatTime(remaining)}
      </Chip>
    </div>
  );
};

export default RemainingTime;
