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
import { selectLetter, __updateLetter } from "redux/modules/letterSlice";
import { updateModalContent } from "redux/modules/modalSlice";

function Detail() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const { selectedLetters } = useSelector((state) => state.letterSlice);
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
      dispatch(__updateLetter({ ...letter, content }));
      navigate("/");
    } else if (checkValidation !== true) {
      dispatch(updateModalContent({ content: checkValidation }));
    } else {
      dispatch(updateModalContent({ content: "변경된 내용이 없습니다." }));
    }
  };

  const changeModalStateDelete = () => {
    dispatch(
      updateModalContent({
        type: "warning",
        content: "정말로 삭제하시겠습니까?",
        onConfirm: {
          click: false,
          func: "__deleteLetter",
          param: letter
        }
      })
    );
  };

  useEffect(() => {
    dispatch(selectLetter(param?.id));
  }, []);

  useEffect(() => {
    if (selectedLetters.length > 0) {
      setLetter(selectedLetters[0]);
      setContent(selectedLetters[0].content);
    } else {
      navigate("/*");
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

      {user.userId === letter.userId ? (
        <StBtnGroup>
          {editMode ? (
            <>
              <Button color="green" onClick={onChageLetter}>
                수정 완료
              </Button>
              <Button color="pink" onClick={inactiveEditMode}>
                수정 취소
              </Button>
            </>
          ) : (
            <>
              <Button color="blue" onClick={activeEditMode}>
                수정
              </Button>
              <Button color="pink" onClick={changeModalStateDelete}>
                삭제
              </Button>
            </>
          )}
        </StBtnGroup>
      ) : null}
    </Container>
  );
}

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

export default Detail;
