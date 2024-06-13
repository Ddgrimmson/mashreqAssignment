import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import HomePage from "../components/HomePage";

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path="/home" Component={HomePage} />
      </Routes>
    </Router>
  );
};
