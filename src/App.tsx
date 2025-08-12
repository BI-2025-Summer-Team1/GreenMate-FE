import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Login from "./pages/Login";
import "./App.css";
import Signup from "./pages/Signup";
import CommunityWritePage from "./pages/CommunityWritePage";
import ActivityWritePage from "./pages/ActivityWritePage";
  

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.COMMUNITY_WRITE} element={<CommunityWritePage />} />
        <Route path={ROUTES.ACTIVITY_WRITE} element={<ActivityWritePage />} />
      </Routes>
    </Router>
main
  );
}

export default App;
