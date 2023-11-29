import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound";
import Login from "pages/User/Login";
import Register from "pages/User/Register";
import Layout from "./Layout";
import UserLayout from "./UserLayout";
import { useEffect } from "react";

const Router = ({ login }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessiblePath = ["/user/register", "/user/login"];
    if (!login && !accessiblePath.includes(location.pathname)) {
      navigate("/user/register");
    }
  }, [location]);

  useEffect(() => {
    const check = location.pathname === "/user/register" && login;
    if (check) {
      navigate(-1);
    }
  }, [location]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="profile/:userid" element={<>프로필</>} />
      </Route>

      <Route path="user" element={<UserLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
