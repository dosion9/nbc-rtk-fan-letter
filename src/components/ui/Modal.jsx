import React, { useRef } from "react";
import styled from "styled-components";
import theme from "style/Theme";
import Button from "./Button";
import { closeModal } from "redux/modules/modal";
import { useDispatch, useSelector } from "react-redux";

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

const modalType = {
  warning: { text: "주의", color: "pink" },
  default: { text: "알림", color: "blue" }
};

function Modal() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => {
    return state.modalState;
  });
  const dimmer = useRef();
  const onClose = (e) => {
    if (e.target.onclick) {
      dispatch(closeModal());
    }
    e.preventDefault();
  };

  const onSummit = () => {
    modalState.onSummit && modalState?.onSummit();
  };
  return (
    <>
      {modalState && modalState?.active ? (
        <StDimmer onClick={(e) => onClose(e)} ref={dimmer}>
          <StModalWrap color={modalType[modalState.type].color || "green"}>
            <div className="header">{modalType[modalState.type].text}</div>
            <div className="body">{modalState.content}</div>
            <div className="footer">
              {modalState?.onSummit && (
                <Button outline={"true"} color={"blue"} onClick={onSummit}>
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

export default Modal;
