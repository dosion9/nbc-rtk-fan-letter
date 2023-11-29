import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "components/letter/Avatar";
import Button from "components/ui/Button";
import Textarea from "components/ui/Textarea";
import Container from "components/layout/Container";
import { changeDate } from "utils/changeDate";
import { validateText } from "utils/validation";
import styled from "styled-components";
import theme from "style/Theme";
import { useDispatch, useSelector } from "react-redux";
import { selectLetter, deleteLetter, updateLetter } from "redux/modules/letters";
import { updateModal, openModal } from "redux/modules/modal";
const StUserImg = styled.div`
  float: right;
`;

const StRow = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  margin-bottom: ${theme.spacing.base};
  display: flex;

  & b {
    font-weight: bold;
    min-width: 8rem;
    display: inline-block;
  }
`;

const StBtnGroup = styled.div`
  width: 100%;
  display: flex;
  gap: ${theme.spacing.base};
  justify-content: center;
`;

function Detail() {
  const dispatch = useDispatch();
  const { selectedLetters } = useSelector((state) => {
    return state.letterData;
  });
  const param = useParams();
  const navigate = useNavigate();
  const [letter, setLetter] = useState({});
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);

  const letterDate = changeDate(letter.createdAt);
  const activeEditMode = () => setEditMode(true);
  const inactiveEditMode = () => {
    setContent(letter.content);
    setEditMode(false);
  };
  const changeContent = (e) => setContent(e.target.value);

  const onChageLetter = () => {
    const checkChange = letter.content !== content;
    const checkValidation = validateText(content, 300);
    if (checkChange && checkValidation === true) {
      dispatch(updateLetter({ ...letter, content }));
      navigate("/");
    } else if (checkValidation !== true) {
      dispatch(updateModal({ content: checkValidation }));
    } else {
      dispatch(updateModal({ content: "변경된 내용이 없습니다." }));
      dispatch(openModal());
    }
  };

  const changeModalStateDelete = () => {
    dispatch(
      updateModal({
        type: "warning",
        content: "정말로 삭제하시겠습니까?",
        onSummit: () => {
          dispatch(deleteLetter(param.id));
          navigate("/");
        }
      })
    );
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(selectLetter(param?.id));
  }, [param.id]);

  useEffect(() => {
    const letter = selectedLetters[0];
    if (letter !== undefined) {
      setLetter(letter);
      setContent(letter.content);
    } else {
      navigate("*");
    }
  }, [selectedLetters]);
  return (
    <Container title={"팬레터 수정"}>
      <StUserImg>
        <Avatar color="blue" avatar={letter.avatar}></Avatar>
      </StUserImg>
      <StRow>
        <b>작성자</b>
        {letter.nickname}
      </StRow>

      <StRow>
        <b>작성 시간</b>
        {`${letterDate.year}.${letterDate.month}.${letterDate.date} ${letterDate.hour}:${letterDate.min}`}
      </StRow>
      <StRow>
        <b>To</b>
        {letter.writedTo}
      </StRow>
      <StRow>
        <b>내용</b>
        <Textarea
          value={content}
          onChange={changeContent}
          readOnly={!editMode}
          color={editMode ? "blue" : "white"}
        ></Textarea>
      </StRow>

      {editMode ? (
        <StBtnGroup>
          {/* content 수정 할 때 */}
          <Button color="green" onClick={onChageLetter}>
            수정 완료
          </Button>
          <Button color="pink" onClick={inactiveEditMode}>
            수정 취소
          </Button>
        </StBtnGroup>
      ) : (
        <StBtnGroup>
          {/* content 수정 안할때 */}
          <Button color="blue" onClick={activeEditMode}>
            수정
          </Button>
          <Button color="pink" onClick={changeModalStateDelete}>
            삭제
          </Button>
        </StBtnGroup>
      )}
    </Container>
  );
}

export default Detail;
