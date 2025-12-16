import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "./components/shared/SideBar";
import ProfilePage from "./pages/ProfilePage";
import GamesPage from "./pages/GamesPage";
import OccupationPage from "./pages/games/OccupationPage";

const App: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full">
        <div className="p-3 pb-20">
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/occupation/:id" element={<OccupationPage />} />
            <Route path="*" element={<Navigate to="/games" />} />
          </Routes>
        </div>
        <SideBar />
      </div>
    </div>
  );
};

export default App;
