import React from "react";
import theme from "style/Theme";
import styled from "styled-components";

const ImgWrap = styled.div`
  flex-shrink: 0;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: ${(props) => theme.border[props.color] || theme.border.black};
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

function Avatar({ avatar, color }) {
  return (
    <ImgWrap color={color}>
      <Img src={avatar} />
    </ImgWrap>
  );
}

export default Avatar;
