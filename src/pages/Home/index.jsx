import React, { useState } from "react";
import Hero from "components/ui/Hero";
import MemberBtnGroup from "./MemberBtnGroup";
import LetterGroup from "./LetterGroup";
import HomeForm from "./HomeForm";
import Container from "components/layout/Container";
function Home() {
  const [selectMember, setSelectMember] = useState("하니");
  const changeSelectMember = (member) => {
    setSelectMember(member);
  };

  return (
    <>
      <Hero />
      <Container color={"blue"} title={"팬레터 작성"}>
        <HomeForm />
      </Container>
      <Container color={"blue"} title={"팬레터 목록"}>
        <MemberBtnGroup selectMember={selectMember} onClick={changeSelectMember} />
        <LetterGroup selectMember={selectMember} />
      </Container>
    </>
  );
}

export default Home;
