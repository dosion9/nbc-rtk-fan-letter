import React from "react";
import { Link } from "react-router-dom";
import theme from "style/Theme";
import styled from "styled-components";
import Button from "components/ui/Button";
import { FiLogOut } from "react-icons/fi";
import { logout } from "redux/modules/authSlice";
import { useDispatch } from "react-redux";
function Header() {
  const dispatch = useDispatch();

  return (
    <StHeader>
      <StNav>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="nav__item profile">
            <Link to={`/profile`}>My Profile</Link>
          </li>
        </ul>

        <StButton
          color={"pink"}
          onClick={() => {
            dispatch(logout());
          }}
        >
          <FiLogOut />
          LogOut
        </StButton>
      </StNav>
    </StHeader>
  );
}

const StHeader = styled.header`
  width: 100%;
  height: 5rem;
  background-color: ${theme.color.blue};
  color: ${theme.color.white};
  display: flex;
  align-items: center;
`;

const StNav = styled.nav`
  width: 90%;
  max-width: 960px;
  margin: auto;
  display: flex;
  align-items: center;
  & > .nav__list {
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.base};
    font-weight: bold;

    & > .nav__item {
      position: relative;
      font-size: ${({ theme }) => theme.fontSize.lg};
      transition: ${({ theme }) => theme.transition.base};

      &.profile {
        margin-left: auto;
        margin-right: ${({ theme }) => theme.spacing.base};
        border: ${({ theme }) => theme.border.baseDark};
        border-radius: ${({ theme }) => theme.border.borderRadius};
        padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.base};
        background-color: ${({ theme }) => theme.color.white};
        color: ${({ theme }) => theme.color.baseDark};
        font-size: ${({ theme }) => theme.fontSize.base};
        &:hover {
          background-color: ${({ theme }) => theme.color.baseDark};
          color: ${({ theme }) => theme.color.white};
        }
      }

      &::after {
        content: "";
        position: absolute;
        bottom: -0.3em;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${({ theme }) => theme.color.baseDark};
        border-radius: 50%;
        opacity: 0;
      }

      &:hover::after {
        opacity: 1;
      }

      &.profile:hover:after {
        opacity: 0;
      }
    }
  }
`;

const StButton = styled(Button)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  border-radius: ${({ theme }) => theme.border.borderRadius};
`;

export default Header;
