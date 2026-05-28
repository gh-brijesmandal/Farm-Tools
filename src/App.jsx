import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import HarvestLossCalculator from "./pages/HarvestLossCalculator";
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
      </Routes>
    </>
  );
}

export default App;
