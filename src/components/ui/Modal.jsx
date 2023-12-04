import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "style/Theme";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { confirmModal, updateModalContent, closeModal } from "redux/modules/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthAlert } from "redux/modules/authSlice";
import { __deleteLetter, clearLetterAlert } from "redux/modules/letterSlice";
const modalType = {
  warning: { text: "주의", color: "pink" },
  default: { text: "알림", color: "blue" }
};

function Modal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalSliceState = useSelector((state) => state.modalSlice);
  const authSliceAlert = useSelector((state) => state.authSlice.alert);
  const letterSliceAlert = useSelector((state) => state.letterSlice.alert);
  const { isOpen } = modalSliceState;
  const { func, param } = modalSliceState?.content?.onConfirm || {};

  useEffect(() => {
    const { isError, msg } = authSliceAlert;
    if (msg) {
      const content = {
        type: isError ? "warning" : "default",
        content: msg
      };
      dispatch(updateModalContent(content));
      dispatch(clearAuthAlert());
    }
  }, [authSliceAlert]);

  useEffect(() => {
    const { isError, msg } = letterSliceAlert;
    if (isError) {
      const content = {
        type: "warning",
        content: msg
      };
      dispatch(updateModalContent(content));
      dispatch(clearLetterAlert());
    }
  }, [letterSliceAlert]);

  // 모달 "확인" 기능
  // 누르면 func의 이름에 따라 동작을 실행
  useEffect(() => {
    if (modalSliceState.isConfirm) {
      switch (func) {
        case "__deleteLetter":
          dispatch(__deleteLetter(param));
          dispatch(closeModal());
          navigate("/");
          break;
        default:
          dispatch(closeModal());
          navigate("/");
          break;
      }
    }
  }, [modalSliceState.isConfirm]);

  // 모달 "닫기"
  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(closeModal());
  };

  // 모달 "확인"
  const onConfirm = () => {
    dispatch(confirmModal());
  };

  return (
    <>
      {isOpen && (
        <StDimmer onClick={onClose}>
          <StModalWrap color={modalType[modalSliceState.content.type].color || "green"}>
            <div className="header">{modalType[modalSliceState.content.type].text}</div>
            <div className="body">{modalSliceState.content.content}</div>
            <div className="footer">
              {func && (
                <Button outline={"true"} color={"blue"} onClick={onConfirm}>
                  확인
                </Button>
              )}

              <Button outline={"true"} color={"pink"} onClick={onClose}>
                취소
              </Button>
            </div>
          </StModalWrap>
        </StDimmer>
      )}
    </>
  );
}

const StDimmer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  top: 0;
  z-index: 10;
  background-color: #000000ce;
  cursor: pointer;
`;

const StModalWrap = styled.div`
  border: 10px double ${(props) => (props?.color ? theme.color[props.color] : theme.color.black)};
  background-color: ${theme.color.white};
  width: 60%;
  margin: auto;
  border-radius: ${theme.border.borderRadius};
  overflow: hidden;
  cursor: default;

  .header {
    font-weight: bold;
    background-color: ${(props) => (props?.color ? theme.color[props.color] : theme.color.white)};
    font-size: ${theme.fontSize.xl};
    padding: ${theme.spacing.base} ${theme.spacing.base};
    color: ${(props) => (props?.color === "white" ? theme.color[props.color] : theme.color.white)};
  }

  .body {
    padding: ${theme.spacing.base};
    display: flex;
    align-items: center;
  }

  .footer {
    text-align: end;
    padding: ${theme.spacing.sm};

    * {
      margin-left: ${theme.spacing.sm};
    }
  }
`;

export default Modal;
