import React, { useMemo } from "react";
import styled from "styled-components";
import theme from "style/Theme";
import Label from "components/ui/Label";
import { v4 as uuidv4 } from "uuid";

const StWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm};
  text-align: center;
  border: ${(props) => theme.border[props.color] || theme.border.black};
  border-radius: ${theme.border.borderRadius};
  outline: none;
  transition: 0.15s;
`;

const StOption = styled.option`
  padding: ${theme.spacing.sm};
`;

function SelectBox({ onChange, listData, value, labelText, color }) {
  const id = useMemo(() => uuidv4(), []);
  return (
    <StWrap>
      {labelText ? <Label htmlFor={id}>{labelText}</Label> : null}
      <StSelect onChange={onChange} id={id} value={value} color={color}>
        {listData.map((n, i) => {
          return (
            <StOption key={`${id} - ${i}`} value={n}>
              {n}
            </StOption>
          );
        })}
      </StSelect>
    </StWrap>
  );
}

export default SelectBox;
