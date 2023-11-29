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
import { useDispatch } from "react-redux";
import { createLetter } from "redux/modules/letters";
import { updateModal, openModal } from "redux/modules/modal";

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
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [writedTo, setWritedTo] = useState(memberNameList[0]);
  const onChange = (e, setState) => setState(e.target.value);
  const handleCreateLetter = (e) => {
    const validation = validateLetter(nickname, content);
    if (validation === true) {
      dispatch(createLetter({ nickname, content, writedTo }));
      setNickname("");
      setContent("");
      setWritedTo(memberNameList[0]);
    } else {
      dispatch(
        updateModal({
          content: validation,
          type: "warning"
        })
      );
      dispatch(openModal());
    }
    e.preventDefault();
  };

  return (
    <>
      <Form color="blue" onSubmit={(e) => handleCreateLetter(e)}>
        <Strow>
          <Input
            value={nickname}
            placeholder={"최대 10글자까지 작성할 수 있습니다."}
            maxLength={10}
            onChange={(e) => onChange(e, setNickname)}
            labelText={"닉네임"}
            className="col"
            color="blue"
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
