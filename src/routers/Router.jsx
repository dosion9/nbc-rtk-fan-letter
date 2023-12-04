import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/Home";
import Detail from "pages/Detail";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Profile from "pages/Profile";
import Layout from "./Layout";
import UserLayout from "./UserLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __tokenLogin } from "redux/modules/authSlice";

const Router = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authSlice.isLogin);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(__tokenLogin());
    }
  }, []);

  return (
    <Routes>
      {isLogin ? (
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      ) : (
        <>
          <Route path="auth" element={<UserLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<Navigate to="auth/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
