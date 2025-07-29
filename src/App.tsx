
import { Routes, Route } from "react-router-dom";
import CommunityWritePage from "./pages/CommunityWritePage";
// import ActivityWritePage from "./pages/ActivityWritePage";

function App() {
  return (
    <Routes>
      <Route path="/community/write" element={<CommunityWritePage />} />
      <Route path="/" element={<h1>홈입니다</h1>} />
      {/* <Route path="/activity/write" element={<ActivityWritePage />} /> */}
    </Routes>
  );
}

export default App;
