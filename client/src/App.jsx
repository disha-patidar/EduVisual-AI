import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/explore" element={<Explore />} />

      <Route path="/lesson" element={<Lesson />} />
    </Routes>
  );
}

export default App;