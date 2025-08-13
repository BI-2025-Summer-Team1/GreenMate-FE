import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import CommunityWritePage from "./pages/CommunityWritePage";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.COMMUNITY_WRITE} element={<CommunityWritePage />} />
      </Routes>
    </Router>

  );
}

export default App;
