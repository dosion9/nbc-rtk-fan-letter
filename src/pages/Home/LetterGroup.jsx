import React, { useEffect } from "react";
import Letter from "components/letter";
import styled from "styled-components";
import theme from "style/Theme";
import member from "data/member";
import { useDispatch, useSelector } from "react-redux";
import { selectLetter, __getLetters } from "redux/modules/letters";

function LetterGroup({ selectMember }) {
  const dispatch = useDispatch();
  const { isLoading, snapshot, selectedLetters } = useSelector((state) => state.letterData);

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  useEffect(() => {
    dispatch(selectLetter(selectMember));
  }, [selectMember]);

  useEffect(() => {
    dispatch(selectLetter(selectMember));
  }, [snapshot]);

  return (
    <StWrap>
      {selectedLetters.map((n) => {
        const color = member.find((m) => m.name === n.writedTo).color;
        return <Letter letterData={n} color={color} key={n.id}></Letter>;
      })}
      {selectedLetters.length === 0 ? <StRow>😥 등록된 팬레터가 없습니다 😥</StRow> : null}
    </StWrap>
  );
}

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
`;

const StRow = styled.p`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`;

export default LetterGroup;
