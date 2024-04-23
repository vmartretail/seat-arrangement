import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import Login from "./Pages/Login";
import AuthProtectedRoutes from "./Routes/AuthProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<Navigate to={"/login"} />} />
      </Route>
    </Routes>
  );
};

export default App;
