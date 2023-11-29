import React from "react";
import styled from "styled-components";
import memberImg from "assets/img/member1.jpg";

const StHero = styled.section`
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.$bgImg});
  background-position: center;
  background-size: cover;
`;

const StHeroContent = styled.div`
  width: 80%;
  height: 70%;
`;

function Hero({ children }) {
  return (
    // 주석 : memberImg 변경할 것
    <StHero $bgImg={memberImg}>
      <StHeroContent>{children}</StHeroContent>
    </StHero>
  );
}

export default Hero;
