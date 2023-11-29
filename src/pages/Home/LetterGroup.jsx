import React, { useEffect } from "react";
import Letter from "components/letter";
import styled from "styled-components";
import theme from "style/Theme";
import member from "data/member";
import { useDispatch, useSelector } from "react-redux";
import { selectLetter } from "redux/modules/letters";
const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
`;

const StRow = styled.p`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`;

function LetterGroup({ selectMember }) {
  const dispatch = useDispatch();
  const { letters, selectedLetters } = useSelector((state) => {
    return state.letterData;
  });

  useEffect(() => {
    dispatch(selectLetter(selectMember));
  }, [dispatch, selectMember]);

  useEffect(() => {
    dispatch(selectLetter(selectMember));
  }, [dispatch, letters]);

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

export default LetterGroup;
