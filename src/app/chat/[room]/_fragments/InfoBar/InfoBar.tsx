import Link from 'next/link';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatIcon from '@mui/icons-material/Chat';
import * as Style from './InfoBarStyle';

function InfoBar({ roomName, users }) {
  return (
    <Style.InfoContainer>
      <Style.TitleWrapper>
        <ChatIcon />{' '}
        <Style.TitleText>
          {roomName} ({users?.length || 0}명 참여)
        </Style.TitleText>
      </Style.TitleWrapper>
      {/* 뒤로가기 */}
      <Link href={`/chat`}>
        <CancelIcon />
      </Link>
    </Style.InfoContainer>
  );
}

export default InfoBar;
