'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateJoinChatModal from '@/components/chat/CreateJoinChatModal';
import Container from '@/components/common/Container';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Error from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import io from 'socket.io-client';
import { styled } from 'styled-components';
import { ModalType, RoomsState } from './chatType';

// Constants for socket endpoint
const ENDPOINT = 'http://localhost:5001';
const socket = io(ENDPOINT);

function Join() {
  const [rooms, setRooms] = useState<RoomsState>({});
  const [modalType, setModalType] = useState<ModalType>(undefined);
  const [entryRoom, setEntryRoom] = useState('');
  const router = useRouter();

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

  const handleCloseCallback = () => {
    entryRoom && setEntryRoom('');
    setModalType(undefined);
  };

  const handleSubmitCallBack = ({ room, name, profileId }) => {
    if (modalType === ModalType.ROOM_CREATE) {
      socket.emit('createRoom', room, () => {});
    }

    router.push(`/chat/${room}?name=${name}&profileId=${profileId}`);
  };
  return (
    <Container
      title="채팅"
      rightContent={
        <>
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
        </>
      }
    >
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
                    setEntryRoom(room);
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

      <CreateJoinChatModal
        modalType={modalType}
        entryRoom={entryRoom}
        handleCloseCallback={handleCloseCallback}
        handleSubmitCallBack={handleSubmitCallBack}
      />
    </Container>
  );
}

export default Join;

const RoomTitle = styled(Typography)`
  span {
    font-size: 14px;
    margin-left: 5px;
    color: #777;
  }
`;

const NoRoomsMessage = styled.div`
  font-weight: 400;
  height: 500px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
  svg {
    width: 60px;
    height: 60px;
    margin-bottom: 14px;
    color: #333;
  }
`;
