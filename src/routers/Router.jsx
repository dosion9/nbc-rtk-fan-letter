import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound";
import Login from "pages/User/Login";
import Register from "pages/User/Register";
import Layout from "./Layout";
import UserLayout from "./UserLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __tokenLogin } from "redux/modules/authSlice";

const Router = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessiblePath = ["/user/register", "/user/login"];
  const isLogin = useSelector((state) => state.authSlice.isLogin);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(__tokenLogin());
    }
  }, []);

  useEffect(() => {
    if (!isLogin && !accessiblePath.includes(location.pathname)) {
      return navigate("/user/login");
    }
    // // // 로그인 때 로그인, 회원가입 페이지로 이동막음
    if (isLogin && accessiblePath.includes(location.pathname)) {
      return navigate("/");
    }
  }, [isLogin, location.pathname]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="profile" element={<>프로필</>} />
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
