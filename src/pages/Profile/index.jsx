import React, { useState } from "react";
import Container from "components/layout/Container";
import Avatar from "components/letter/Avatar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import { TbPhotoPlus } from "react-icons/tb";
import { useInputValue } from "hooks/useInput";
import { updateModalContent } from "redux/modules/modalSlice";
import { __updateProfile } from "redux/modules/authSlice";
import { __updateLetterProfile } from "redux/modules/letterSlice";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const [isEdit, setIsEdit] = useState(false);
  const [nickname, onChangeNickname] = useInputValue(user.nickname);
  const [avatar, setAvatar] = useState(user.avatar);

  const enableEdit = () => setIsEdit(true);
  const disableEdit = () => {
    onChangeNickname(null, user.nickname);
    setAvatar(user.avatar);
    setIsEdit(false);
  };

  const onChangeFile = (e) => {
    const selectImg = e.target.files[0];
    const maxSize = 1024 ** 2;
    const possibleImgType = ["image/jpeg", "image/png", "image/webp"];
    const check = {
      size: selectImg.size <= 5 * maxSize,
      type: possibleImgType.includes(selectImg.type)
    };
    // 이미지 타입 검사
    if (!check.type) {
      return dispatch(
        updateModalContent({ content: "이미지의 파일 형식을 확인해주세요. (가능한 파일 형식 : jpeg, png, webp)" })
      );
    }
    // 이미지 사이즈 검사
    if (!check.size) {
      return dispatch(updateModalContent({ content: "이미지의 크기는 5mb를 초과할 수 없습니다." }));
    }
    // 이미지 변경
    else {
      setAvatar(selectImg);
      return (e.target.files = null);
    }
  };

  //   avatar 프리뷰 url
  const showAvatar = () => {
    if (avatar instanceof File) {
      return URL.createObjectURL(avatar);
    } else {
      return avatar;
    }
  };

  // 프로필 변경사항 patch
  const onSubmitProfile = async () => {
    const checkAvatar = avatar instanceof File;
    const updateData = {
      nickname,
      ...(checkAvatar && { avatar })
    };

    const res = await dispatch(__updateProfile(updateData));
    if (res.type === "updateProfile/fulfilled") {
      updateData.userId = user.userId;
      res.payload?.avatar && (updateData.avatar = res.payload.avatar);
      await dispatch(__updateLetterProfile(updateData));
    }
    setIsEdit(false);
  };

  return (
    <Container title={"프로필 관리"}>
      <StRow>
        <StAvatar color="blue" avatar={showAvatar()}>
          {isEdit ? (
            <>
              <StAvatarOverlayLabel>
                <input type="file" accept="image/*" onChange={onChangeFile} />
                <TbPhotoPlus className="avatar__icon" />
                <p>수정하기</p>
              </StAvatarOverlayLabel>
            </>
          ) : null}
        </StAvatar>
      </StRow>

      {isEdit && (
        <StRow>
          <p className="notice">※ 10mb 이내의 jpeg, png, webp 이미지 파일</p>
        </StRow>
      )}
      <StRow className="user__id">{user.userId}</StRow>

      {isEdit ? (
        <>
          <StRow>
            <StInput value={nickname} onChange={onChangeNickname} />
          </StRow>
          <StRow>
            <Button color={"green"} disabled={nickname === user.nickname} onClick={onSubmitProfile}>
              수정완료
            </Button>
            <Button color={"pink"} onClick={disableEdit}>
              취소하기
            </Button>
          </StRow>
        </>
      ) : (
        <>
          <StRow>{user.nickname}</StRow>
          <StRow>
            <Button color={"blue"} onClick={enableEdit}>
              수정하기
            </Button>
          </StRow>
        </>
      )}
    </Container>
  );
}

const StRow = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.base};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.base};

  &.user__id {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: bold;
  }

  & > .notice {
    color: gray;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const StInput = styled(Input)`
  width: 16rem;
`;

const StAvatar = styled(Avatar)`
  width: 10rem;
  height: 10rem;
  position: relative;
`;

const StAvatarOverlayLabel = styled.label`
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 0;
  background-color: ${({ theme }) => theme.color.black};
  opacity: 0;
  visibility: hidden;
  transition: ${({ theme }) => theme.transition.base};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;
  outline: none;
  border: none;

  & > input {
    display: none;
  }

  & .avatar__icon {
    display: block;
    font-size: 5rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  ${StAvatar}:hover & {
    opacity: 0.9;
    visibility: visible;
  }
`;

export default Profile;
