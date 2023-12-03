import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "style/Theme";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { confirmModal, updateModalContent, closeModal, openModal } from "redux/modules/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError } from "redux/modules/authSlice";
import { __deleteLetter, clearLetterError } from "redux/modules/letterSlice";
const modalType = {
  warning: { text: "주의", color: "pink" },
  default: { text: "알림", color: "blue" }
};

function Modal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalSliceState = useSelector((state) => state.modalSlice);
  const authSliceError = useSelector((state) => state.authSlice.error);
  const letterSliceError = useSelector((state) => state.letterSlice.error);
  const { isOpen } = modalSliceState;
  const { func, param } = modalSliceState?.content?.onConfirm || {};

  useEffect(() => {
    const { isError, error } = authSliceError;
    if (isError) {
      const content = {
        type: "warning",
        content: error
      };
      dispatch(updateModalContent(content));
      dispatch(clearAuthError());
    }
  }, [authSliceError]);

  useEffect(() => {
    const { isError, error } = letterSliceError;
    if (isError) {
      const content = {
        type: "warning",
        content: error
      };
      dispatch(updateModalContent(content));
      dispatch(clearLetterError());
    }
  }, [letterSliceError]);

  // useEffect(() => {
  //   if (modalSliceState.isOpen) {
  //     dispatch(openModal());
  //   }
  // }, [modalSliceState.isOpen]);

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
