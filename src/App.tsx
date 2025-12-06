import React from "react";
import Button from "./components/ui/Button";

const App: React.FC = () => {
  const handleClick = React.useCallback(() => {
    alert('Hi!');
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="space-y-3 flex flex-col items-center">
        <div className="text-4xl">Basic webapp magnate</div>

        <div>
          <Button onClick={handleClick}>Click me!</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
