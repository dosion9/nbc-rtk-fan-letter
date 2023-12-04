import React, { useState } from "react";
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";
import Button from "components/ui/Button";
import SelectBox from "components/ui/SelectBox";
import Form from "components/ui/Form";
import member from "data/member";
import { validateLetter } from "utils/validation";
import styled from "styled-components";
import theme from "style/Theme";
import { useDispatch, useSelector } from "react-redux";
import { __createLetter } from "redux/modules/letterSlice";
import { updateModalContent } from "redux/modules/modalSlice";

const Strow = styled.div`
  display: flex;
  gap: ${theme.spacing.base};

  &.right {
    justify-content: end;
  }
`;

const memberNameList = member.map((n) => n.name);

function HomeForm() {
  const dispatch = useDispatch();
  const { nickname, userId, avatar } = useSelector((state) => state.authSlice.user);
  const [content, setContent] = useState("");
  const [writedTo, setWritedTo] = useState(memberNameList[0]);
  const onChange = (e, setState) => setState(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const validation = validateLetter(nickname, content);
    if (validation === true) {
      dispatch(__createLetter({ nickname, content, avatar, writedTo, userId }));
      setContent("");
      setWritedTo(memberNameList[0]);
    } else {
      dispatch(
        updateModalContent({
          content: validation,
          type: "warning"
        })
      );
    }
  };

  return (
    <>
      <Form color="blue" onSubmit={onSubmit}>
        <Strow>
          <Input
            value={nickname}
            maxLength={10}
            labelText={"닉네임"}
            className="col"
            color="blue"
            readOnly={true}
          ></Input>
          <SelectBox
            value={writedTo}
            listData={memberNameList}
            onChange={(e) => onChange(e, setWritedTo)}
            labelText={"맴버"}
            className="col"
            color="blue"
          ></SelectBox>
        </Strow>
        <Strow>
          <Textarea
            placeholder={"최대 300자까지 작성할 수 있습니다."}
            value={content}
            onChange={(e) => onChange(e, setContent)}
            maxLength={300}
            labelText={"내용"}
            color="blue"
          ></Textarea>
        </Strow>
        <Strow className="right">
          <Button color={"blue"}>등록하기</Button>
        </Strow>
      </Form>
    </>
  );
}

export default HomeForm;
