import Button from "components/ui/Button";
import Form from "components/ui/Form";
import Input from "components/ui/Input";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { __login } from "redux/modules/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onChange = (e, setState) => {
    setState(e.target.value);
  };

  // 로그인 기능
  const onSummit = async (e) => {
    e.preventDefault();
    const loginData = { id, password: pw };
    dispatch(__login(loginData));
  };

  // button 활성화
  useEffect(() => {
    id && pw ? setDisabled(false) : setDisabled(true);
  }, [id, pw]);

  return (
    <Form onSubmit={onSummit}>
      <StInput
        type={"text"}
        placeholder={"아이디를 입력해주세요"}
        labelText={"아이디"}
        maxLength={10}
        value={id}
        onChange={(e) => onChange(e, setId)}
      />
      <StInput
        type={"password"}
        placeholder={"비밀번호를 입력해주세요"}
        labelText={"비밀번호"}
        maxLength={15}
        value={pw}
        onChange={(e) => onChange(e, setPw)}
      />
      <Button color={"green"} disabled={disabled}>
        로그인
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

export default Login;
