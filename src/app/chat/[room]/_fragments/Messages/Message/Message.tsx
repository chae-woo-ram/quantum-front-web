import { Divider } from '@mui/material';
import * as Style from './MessageStyle';

interface MessagePropsType {
  message: {
    user: string;
    text: string;
    createdAt: Date;
  };
  name: string;
}

function Message({ message: { user, text, createdAt }, name }: MessagePropsType) {
  let isSentByCurrentUser = false;
  let isAdmin = false;
  const timeString = new Date(createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  if (user === 'admin') {
    isAdmin = true;
  }

  if (isAdmin) {
    return (
      <Style.AdminMessageBox>
        <Divider>
          <Style.MessageText>{text}</Style.MessageText>
        </Divider>
      </Style.AdminMessageBox>
    );
  }

  return (
    <Style.MessageContainer isSentByCurrentUser={isSentByCurrentUser}>
      {isSentByCurrentUser ? (
        <>
          <Style.CreatedAtText isSentByCurrentUser={isSentByCurrentUser}>{timeString}</Style.CreatedAtText>
          <Style.MessageBox isSentByCurrentUser={isSentByCurrentUser}>
            <Style.MessageText>{text}</Style.MessageText>
          </Style.MessageBox>
        </>
      ) : (
        <Style.MessageWrapper>
          <Style.UserName>{user}</Style.UserName>
          <Style.MessageBoxWrapper>
            <Style.MessageBox isSentByCurrentUser={isSentByCurrentUser}>
              <Style.MessageText>{text}</Style.MessageText>
            </Style.MessageBox>
            <Style.CreatedAtText isSentByCurrentUser={isSentByCurrentUser}>{timeString}</Style.CreatedAtText>
          </Style.MessageBoxWrapper>
        </Style.MessageWrapper>
      )}
    </Style.MessageContainer>
  );
}

export default Message;
