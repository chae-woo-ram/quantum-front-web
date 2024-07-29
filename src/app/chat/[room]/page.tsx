'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import InfoBar from './_fragments/InfoBar/InfoBar';
import Input from './_fragments/Input/Input';
import Messages from './_fragments/Messages/Messages';
import io from 'socket.io-client';
import { styled } from 'styled-components';

const ENDPOINT = 'http://localhost:5001';

function Chat({ params }) {
  const searchParams = useSearchParams();
  const [name, setName] = useState<string>(searchParams.get('name') || '');
  const [profileId, setProfileId] = useState<string>(searchParams.get('profileId') || '');
  const [room, setRoom] = useState<string>(params.room || '');
  const [users, setUsers] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // searchParams와 params에 따라 상태 업데이트
    const newName = searchParams.get('name') || '';
    const profileId = searchParams.get('profileId') || '';
    const newRoom = params.room || '';

    if (newName !== name) setName(newName);
    if (newRoom !== room) setRoom(newRoom);
    if (newRoom !== room) setProfileId(profileId);
  }, [searchParams, params, name, room]);

  useEffect(() => {
    // 이름과 방이 설정되었을 때 소켓 연결 설정
    if (name && room) {
      const newSocket = io(ENDPOINT);
      setSocket(newSocket);

      // 방에 참가
      newSocket.emit('join', { name, room, profileId }, (err: any) => {
        if (err) console.error('참가 오류:', err);
      });

      // 메시지 수신
      newSocket.on('message', (message: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // 방 데이터 수신
      newSocket.on('roomData', ({ users }: { users: any[] }) => {
        setUsers(users);
      });

      // 컴포넌트 언마운트 시 소켓 연결 해제 및 정리
      return () => {
        newSocket.emit('userDisconnect');
        newSocket.off();
        newSocket.disconnect();
      };
    }
  }, [name, room]);

  // 메시지 전송 함수
  const sendMessage = useCallback(
    (event: any) => {
      event.preventDefault();
      if ((!!file || !!message) && socket) {
        socket.emit('sendMessage', { message: message, file: file }, () => {
          setMessage('');
          setFile(null);
        });
      }
    },
    [message, file, socket],
  );

  return (
    <ChatContainer>
      {JSON.stringify(messages)}
      <InfoBar roomName={room} users={users} />
      <Messages messages={messages} name={name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} setFile={setFile} />
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow: hidden; /* 스크롤바를 숨기기 위한 설정 */
`;
