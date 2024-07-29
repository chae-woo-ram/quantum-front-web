'use client';

import { useEffect, useState } from 'react';
import DialogComponent from '@/components/common/dialog';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Error from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import io from 'socket.io-client';
import { css, styled } from 'styled-components';
import { ModalType, RoomsState } from './chatType';

// Constants for socket endpoint
const ENDPOINT = 'http://localhost:5001';
const socket = io(ENDPOINT);

function Join() {
  const [rooms, setRooms] = useState<RoomsState>({});
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [profileId, setProfileId] = useState<number>(1);
  const [modalType, setModalType] = useState<ModalType>(undefined);

  const emotions = ['미운', '고마운', '사랑하는', '증오하는', '끔찍한', '무서운'];
  const colors = ['빨강', '노랑', '주황', '파랑', '초록', '하양', '까망'];
  const words = ['날개', '번개', '해', '달', '팬티', '모자'];

  useEffect(() => {
    // 서버에서 방 목록이 업데이트될 때 클라이언트의 방 목록을 최신 상태로 유지하기 위한 이벤트
    socket.on('roomListUpdate', fetchGetRoomsData);
    // 클라이언트가 서버에 현재 방 목록을 요청하여 방 목록을 가져오기 위한 이벤트
    socket.on('getRooms', fetchGetRoomsData);

    // 방 목록을 서버에서 가져오기
    fetchGetRoomsData();

    return () => {
      socket.off('roomListUpdate', fetchGetRoomsData);
      socket.off('getRooms', fetchGetRoomsData);
    };
  }, []);

  const fetchGetRoomsData = () => {
    // 서버에 방 목록 요청을 보내고 응답받은 방 목록으로 클라이언트 상태 업데이트
    setTimeout(() => {
      socket.emit('getRooms', (response: RoomsState) => setRooms(response));
    }, 1000);
  };

  const handleClose = () => {
    setName('');
    setRoom('');
    setModalType(undefined);
  };

  const handleSubmit = () => {
    if (modalType === ModalType.ROOM_CREATE) {
      socket.emit('createRoom', room, () => {});
    }

    window.location.href = `chat/${room}?name=${name}`;
  };

  const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

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

  return (
    <Container>
      <Button
        variant="contained"
        size="small"
        onClick={() => setModalType(ModalType.ROOM_CREATE)}
        startIcon={<AddCommentIcon />}
      >
        새로운 방 생성
      </Button>
      <IconButton onClick={fetchGetRoomsData} color="primary">
        <RefreshIcon />
      </IconButton>
      <Divider>
        <PageTitle>채팅</PageTitle>
      </Divider>
      {Object.keys(rooms).length === 0 ? (
        // 방 목록이 없을 때 표시할 메시지

        <NoRoomsMessage>
          <Error />
          현재 방이 없습니다. 방을 새로 생성해 주세요.
        </NoRoomsMessage>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 2,
          }}
        >
          {Object.keys(rooms).map((room) => (
            <Card key={room} variant="outlined">
              <CardContent>
                <RoomTitle sx={{ fontSize: 24 }} gutterBottom>
                  {decodeURIComponent(room)}
                  <span>({rooms[room]?.users.length}명)</span>
                </RoomTitle>
                <Typography variant="body2">방장: {rooms[room]?.users[0]?.name}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    setRoom(room);
                    setModalType(ModalType.ROOM_ENTRY);
                  }}
                >
                  참여하기
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
      <DialogComponent
        title="새로운 방 생성"
        open={!!modalType}
        onClose={handleClose}
        buttons={[
          { label: '취소', onClick: handleClose },
          { label: '입장', onClick: handleSubmit },
        ]}
      >
        <Grid container direction={'row'} gap={'10px'}>
          <AvatarWrapper onClick={() => onClickDefaultProfile(1)} $isActive={profileId === 1}>
            <Avatar src={'/images/profile1.png'} style={{ width: 150, height: 150, objectFit: 'cover' }} />
          </AvatarWrapper>
          <AvatarWrapper onClick={() => onClickDefaultProfile(2)} $isActive={profileId === 2}>
            <Avatar src={'/images/profile2.png'} style={{ width: 150, height: 150, objectFit: 'cover' }} />
          </AvatarWrapper>
          <AvatarWrapper onClick={() => onClickDefaultProfile(3)} $isActive={profileId === 3}>
            <Avatar src={'/images/profile3.png'} style={{ width: 150, height: 150, objectFit: 'cover' }} />
          </AvatarWrapper>
        </Grid>
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
      </DialogComponent>
    </Container>
  );
}

export default Join;

const Container = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      height: calc(100vh - 250px);
      max-width: 1024px;
      margin: 0 auto;
      padding: 20px 0;
      overflow: hidden;
    `;
  }}
`;

const UserNameField = styled.div`
  display: flex;
  && .MuiButtonBase-root {
    letter-spacing: -1px;
  }
`;

const RoomTitle = styled(Typography)`
  span {
    font-size: 14px;
    margin-left: 5px;
    color: #777;
  }
`;

const PageTitle = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const NoRoomsMessage = styled.div`
  color: #333;
  font-weight: 800;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    color: #333;
  }
`;

/** 버튼 문구 */
const AvatarWrapper = styled.span<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => {
    const { font } = theme;
    return css`
      width: 160px;
      height: 160px;
      background-size: cover;
      border-radius: 50%;
      border: 5px solid ${$isActive ? 'skyblue' : '#fff'};
    `;
  }}
`;
