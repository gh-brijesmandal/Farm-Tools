import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import HarvestLossCalculator from "./pages/HarvestLossCalculator";
import NotFoundPage from "./pages/404Error";
import PlantCalibration from "./pages/PlantCalibration";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/harvest-loss-calculator"
          element={<HarvestLossCalculator />}
        />
        <Route path="/plant-calibration-tool" element={<PlantCalibration />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
