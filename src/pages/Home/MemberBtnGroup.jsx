import React from "react";
import Button from "components/ui/Button";
import member from "data/member";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import theme from "style/Theme";

const StWrap = styled.div`
  display: flex;
  gap: ${theme.spacing.base};
  justify-content: space-around;
  margin-bottom: ${theme.spacing.base};
`;

function MemberBtnGroup({ selectMember, onClick }) {
  return (
    <StWrap>
      {member.map((n) => {
        return (
          <Button
            color={n.color}
            outline={"true"}
            size={"lg"}
            active={n.name === selectMember}
            onClick={() => {
              onClick(n.name);
            }}
            key={uuidv4()}
          >
            {n.name}
          </Button>
        );
      })}
    </StWrap>
  );
}

export default MemberBtnGroup;
