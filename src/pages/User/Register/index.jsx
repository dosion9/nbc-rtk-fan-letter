import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Form from "components/ui/Form";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import { validateId, validatePw, validateNickname } from "utils/validation";
import { useDispatch } from "react-redux";
import { updateModal } from "redux/modules/modal";
import api from "../../../axios/api";
import { login } from "redux/modules/authSlice";
function Register() {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");
  const [disabled, setDisabled] = useState(true);

  const idMsg = useCallback((value) => {
    return validateId(value);
  }, []);

  const pwMsg = useCallback((value) => {
    return validatePw(value);
  }, []);

  const nicknameMsg = useCallback((value) => {
    return validateNickname(value);
  }, []);

  // 회원가입
  const onSummit = async (e) => {
    e.preventDefault();
    const loginData = {
      id,
      password: pw
    };
    const signUpData = {
      id,
      password: pw,
      nickname
    };
    try {
      const { message, success } = await api.post("/register", signUpData);
      if (success) {
        const resLogin = await api.post("/login", loginData);
        dispatch(updateModal({ active: true, content: message, onSummit: null }));
        dispatch(login(resLogin));
      }
    } catch (error) {
      dispatch(updateModal({ type: "warning", active: true, content: error.message, onSummit: null }));
    }
  };

  const onChange = (e, setState) => {
    setState(e.target.value);
  };

  useEffect(() => {
    const allValidation = !(idMsg(id).value && pwMsg(pw).value && nicknameMsg(nickname).value);
    setDisabled(allValidation);
  }, [id, pw, nickname]);

  return (
    <Form onSubmit={onSummit}>
      <StInput
        type={"text"}
        placeholder={"아이디 (4 ~ 10 글자)"}
        labelText={"아이디"}
        maxLength={10}
        value={id}
        onChange={(e) => onChange(e, setId)}
        validation={id && idMsg(id)}
      />
      <StInput
        type={"password"}
        placeholder={"비밀번호 (4 ~ 15 글자)"}
        labelText={"비밀번호"}
        maxLength={15}
        value={pw}
        onChange={(e) => onChange(e, setPw)}
        validation={pw && pwMsg(pw)}
      />

      <StInput
        type={"text"}
        placeholder={"닉네임 (1 ~ 10 글자)"}
        labelText={"닉네임"}
        maxLength={10}
        value={nickname}
        onChange={(e) => onChange(e, setNickname)}
        validation={nickname && nicknameMsg(nickname)}
      />
      <Button color={"green"} disabled={disabled}>
        회원가입
      </Button>
    </Form>
  );
}

const StInput = styled(Input)`
  flex-direction: column;
  align-items: start;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 15rem;
`;

export default Register;
