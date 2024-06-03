import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Bundle from "./pages/Bundle";
const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Bundle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
