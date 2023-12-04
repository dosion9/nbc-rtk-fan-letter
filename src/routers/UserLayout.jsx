import Button from "components/ui/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathLoginCheck = location.pathname === "/auth/login";

  return (
    <StContainer>
      <StWrap>
        <h1>{pathLoginCheck ? "로그인" : "회원가입"}</h1>
        <Outlet />
        {pathLoginCheck ? (
          <Button color={"blue"} onClick={() => navigate("register")}>
            회원가입으로 이동
          </Button>
        ) : (
          <Button color={"blue"} onClick={() => navigate("login")}>
            로그인으로 이동
          </Button>
        )}
      </StWrap>
    </StContainer>
  );
}

const StContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StWrap = styled.div`
  min-width: 15rem;
  border: ${({ theme }) => theme.border.blue};
  border-radius: ${({ theme }) => theme.border.borderRadius};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
  text-align: center;

  & h1 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: bold;
  }
`;

export default UserLayout;
