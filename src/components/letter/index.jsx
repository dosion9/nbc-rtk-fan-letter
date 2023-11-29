import React from "react";
import Avatar from "components/letter/Avatar";
import styled from "styled-components";
import theme from "style/Theme";
import { Link } from "react-router-dom";
import { expressLetterDate } from "utils/changeDate";

const StLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const StLetter = styled.div`
  width: 100%;
  align-items: center;
  border: ${(props) => theme.border[props.color] || theme.border.black};
  border-radius: ${theme.border.borderRadius};
  display: flex;
  background-color: ${theme.color.white};
  padding: ${theme.spacing.base};
  cursor: pointer;
  transition: ${theme.transition.base};
  &:hover {
    ${theme.animationEffect.hover}
  }
`;

const StBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: ${theme.spacing.base};
  gap: ${theme.spacing.base};
  overflow: hidden;
`;

const StLetterTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .userName {
    font-size: ${theme.fontSize.lg};
    font-weight: bold;
  }
  .date {
    color: ${theme.color.black};
    opacity: 0.5;
    font-size: ${theme.fontSize.base};
    line-height: ${theme.fontSize.lg};
  }
`;

const StLetterContent = styled.div`
  .content {
    font-size: ${theme.fontSize.base};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: ${theme.spacing.sm} 0;
  }
`;

function Letter({ letterData, color }) {
  const { nickname, avatar, content, createdAt, id } = letterData;
  return (
    <StLink to={`/detail/${id}`}>
      <StLetter color={color}>
        <Avatar avatar={avatar} color={color}></Avatar>
        <StBody>
          <StLetterTitle>
            <p className="userName">{nickname || "undefined"}</p>
            <span className="date">{expressLetterDate(createdAt) || "undefined"}</span>
          </StLetterTitle>
          <StLetterContent>
            <p className="content">{content || "undefined"}</p>
          </StLetterContent>
        </StBody>
      </StLetter>
    </StLink>
  );
}

export default Letter;
