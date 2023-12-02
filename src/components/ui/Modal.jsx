import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "style/Theme";
import Button from "./Button";
import { updateModalContent, closeModal, openModal } from "redux/modules/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError } from "redux/modules/authSlice";

const modalType = {
  warning: { text: "주의", color: "pink" },
  default: { text: "알림", color: "blue" }
};

function Modal() {
  const dispatch = useDispatch();

  const modalSliceState = useSelector((state) => state.modalSlice);
  const authSliceError = useSelector((state) => state.authSlice.error);

  //
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
    if (modalSliceState.isOpen) {
      dispatch(openModal());
    }
  }, [modalSliceState.isOpen]);

  const onClose = (e) => {
    e.preventDefault();

    if (e.target.onclick) {
      dispatch(closeModal());
    }
  };

  return (
    <>
      {modalSliceState.isOpen ? (
        <StDimmer onClick={(e) => onClose(e)}>
          <StModalWrap color={modalType[modalSliceState.content.type].color || "green"}>
            <div className="header">{modalType[modalSliceState.content.type].text}</div>
            <div className="body">{modalSliceState.content.content}</div>
            <div className="footer">
              {modalSliceState.onSummit && (
                <Button outline={"true"} color={"blue"} onClick={modalSliceState.onSummit}>
                  확인
                </Button>
              )}

              <Button outline={"true"} color={"pink"} onClick={(e) => onClose(e)}>
                취소
              </Button>
            </div>
          </StModalWrap>
        </StDimmer>
      ) : null}
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
