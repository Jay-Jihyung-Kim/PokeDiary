import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
