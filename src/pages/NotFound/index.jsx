import React, { useEffect } from "react";
import Container from "components/layout/Container";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div>
      <Container>
        <StWrap>
          <h1>잘못된 경로입니다.</h1>
        </StWrap>
      </Container>
    </div>
  );
}

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

export default NotFound;
