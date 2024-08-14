import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user/atom';
import supabase from '@/app/utils/supabase/client';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, MenuItem, MenuList, Modal, Typography } from '@mui/material';
import styled from 'styled-components';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal = ({ open, onClose }: ProfileModalProps) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const { avatar_url, name, email } = user.user_metadata;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser({});
    router.push('/login');
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="profile-modal-title">
      <StyledBox>
        <Content>
          {avatar_url && <StyledAvatar src={avatar_url} />}
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          <Typography variant="body2">{email}</Typography>
        </Content>
        <List disablePadding={true}>
          <ListItem onClick={handleLogout}>
            <LogoutIcon />
            로그아웃
          </ListItem>
          <ListItem onClick={() => console.log('비밀번호 재설정')}>
            <LockResetIcon />
            비밀번호 재설정
          </ListItem>
        </List>
      </StyledBox>
    </Modal>
  );
};

const StyledBox = styled(Box)`
  position: absolute;
  top: 50px;
  right: 2px;
  width: 280px;
  background-color: #000;
  color: #fff;
  padding-top: 30px;

  &:focus-visible {
    outline: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
`;

const List = styled(MenuList)``;

const ListItem = styled(MenuItem)`
  && {
    padding: 20px;
    border-top: 1px solid #ddd;
    && > svg {
      margin-right: 8px;
      font-size: 22px;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
`;

export default ProfileModal;
