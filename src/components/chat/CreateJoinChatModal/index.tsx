import { memo, useEffect, useState } from 'react';
import DialogComponent from '@/components/common/DialogComponent';
import { ModalType } from '@/app/chat/chatType';
import { Button, TextField } from '@mui/material';
import { styled } from 'styled-components';
import ProfileSelector from '../ProfileSelector';

interface CreateJoinChatModalProps {
  modalType: ModalType;
  entryRoom?: string;
  handleCloseCallback: () => void;
  handleSubmitCallBack: (data: { name: string; room: string; profileId: number }) => void;
}

const CreateJoinChatModal = memo(
  ({ modalType, entryRoom, handleCloseCallback, handleSubmitCallBack }: CreateJoinChatModalProps) => {
    const [name, setName] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [profileId, setProfileId] = useState<number>(1);

    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const emotions = ['미운', '고마운', '사랑하는', '증오하는', '끔찍한', '무서운'];
    const colors = ['빨강', '노랑', '주황', '파랑', '초록', '하양', '까망'];
    const words = ['날개', '번개', '해', '달', '팬티', '모자'];

    const generateRandomNickname = () => {
      const emotion = getRandomElement(emotions);
      const color = getRandomElement(colors);
      const word = getRandomElement(words);
      return `${emotion} 나의 ${color}${word}`;
    };

    const onClickJoinRoom = () => {
      setName(generateRandomNickname());
    };

    const onClickDefaultProfile = (id: number) => {
      setProfileId(id);
    };

    // 모달 타이틀과 버튼 텍스트
    const getTitle = () => {
      switch (modalType) {
        case ModalType.ROOM_CREATE:
          return '새로운 방 생성';
        case ModalType.ROOM_ENTRY:
          return '방 참여';
        default:
          return '';
      }
    };

    const getSubmitButtonText = () => {
      return modalType === ModalType.ROOM_CREATE ? '생성' : '입장';
    };

    const handleSubmit = () => {
      handleSubmitCallBack({
        name: name,
        room: room,
        profileId: profileId,
      });
    };

    const handleClose = () => {
      setName('');
      setRoom('');
      handleCloseCallback?.();
    };

    useEffect(() => {
      setRoom(entryRoom);
    }, [entryRoom]);

    return (
      <DialogComponent
        title={getTitle()}
        open={!!modalType}
        onClose={handleClose}
        buttons={[
          { label: '취소', onClick: handleClose },
          { label: getSubmitButtonText(), onClick: handleSubmit, disabled: !name || !room },
        ]}
      >
        <TextField
          margin="dense"
          name="room"
          label="채팅방 이름"
          type="text"
          fullWidth
          variant="outlined"
          value={room}
          disabled={modalType === ModalType.ROOM_ENTRY}
          onChange={(event) => setRoom(event.target.value)}
        />
        <UserNameField>
          <TextField
            margin="dense"
            name="name"
            label="이름"
            type="text"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button size="small" variant="text" onClick={onClickJoinRoom}>
            랜덤 생성
          </Button>
        </UserNameField>
        <ProfileSelector profileId={profileId} onChange={onClickDefaultProfile} />
      </DialogComponent>
    );
  },
);

export default CreateJoinChatModal;

const UserNameField = styled.div`
  display: flex;
  margin-bottom: 20px;
  && .MuiButtonBase-root {
    letter-spacing: -1px;
  }
`;
