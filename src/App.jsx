import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import Login from "./Pages/Login";
import AuthProtectedRoutes from "./Routes/AuthProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthProtectedRoutes />}>
        <Route path="/">
          <Route index element={<HomePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
};

export default App;
