import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import CommunityWritePage from "./pages/CommunityWritePage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.COMMUNITY_WRITE} element={<CommunityWritePage />} />
    </Routes>
  );
}

export default App;
