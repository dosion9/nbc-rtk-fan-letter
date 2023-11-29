import React from "react";
import Button from "components/ui/Button";
import Container from "components/layout/Container";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StWrap = styled.div`
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xl};
  justify-content: center;
  align-items: center;

  & h1 {
    font-size: ${(props) => props.theme.fontSize.xl};
  }
`;

function NotFound() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Container>
        <StWrap>
          <h1>잘못된 경로입니다.</h1>

          <Button color={"blue"} onClick={onClick} size={"lg"}>
            홈으로 이동
          </Button>
        </StWrap>
      </Container>
    </div>
  );
}

export default NotFound;
