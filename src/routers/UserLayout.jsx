import { Outlet, Link } from "react-router-dom";

function UserLayout() {
  return (
    <div>
      <h1>로그인 || 회원가입 레이아웃</h1>

      <Outlet />
      <Link to={"login"}>로그인</Link>
      <Link to={"register"}>회원가입</Link>
    </div>
  );
}

export default UserLayout;
