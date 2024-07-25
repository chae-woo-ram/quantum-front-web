import Link from 'next/link';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatIcon from '@mui/icons-material/Chat';
import * as Style from './InfoBarStyle';

function InfoBar({ roomName }) {
  return (
    <Style.InfoContainer>
      <Style.TitleWrapper>
        <ChatIcon /> <Style.TitleText>{roomName}</Style.TitleText>
      </Style.TitleWrapper>
      {/* 뒤로가기 */}
      <Link href={`/chat`}>
        <CancelIcon />
      </Link>
    </Style.InfoContainer>
  );
}

export default InfoBar;
