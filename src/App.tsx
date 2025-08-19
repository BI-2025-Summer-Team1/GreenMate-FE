import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import CommunityWritePage from "./pages/CommunityWritePage";
import ActivityWritePage from "./pages/ActivityWritePage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.COMMUNITY_WRITE} element={<CommunityWritePage />} />
      <Route path={ROUTES.ACTIVITY_WRITE} element={<ActivityWritePage />} />
    </Routes>
  );
}

export default App;
