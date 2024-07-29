import { Divider, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

interface ProfileSelectorProps {
  profileId: number;
  onChange: (selectedId: number) => void;
}

const ProfileSelector = ({ profileId = 1, onChange }: ProfileSelectorProps) => {
  const profileData = [
    { id: 1, src: '/images/profile1.png' },
    { id: 2, src: '/images/profile2.png' },
    { id: 3, src: '/images/profile3.png' },
    { id: 4, src: '/images/profile4.png', isNew: true },
    { id: 5, src: '/images/profile5.png', isNew: true },
    { id: 6, src: '/images/profile6.png', isNew: true },
    { id: 7, src: '/images/profile7.png', isNew: true },
    { id: 8, src: '/images/profile8.png', isNew: true },
    { id: 9, src: '/images/profile9.png', isNew: true },
  ];

  return (
    <>
      <Divider />
      <Grid container direction={'row'} gap={'10px'} marginTop={'20px'} justifyContent={'center'}>
        {profileData.map(({ id, src, isNew }) => (
          <AvatarWrapper key={id} onClick={() => onChange(id)} $isActive={profileId === id} $isNew={isNew}>
            <StyledAvatar
              src={src}
              animate={profileId === id ? { rotate: [0, -1, 1, -1, 1, 0] } : {}}
              transition={{ repeat: 2, duration: 0.3, ease: 'easeInOut' }}
            />
          </AvatarWrapper>
        ))}
      </Grid>
    </>
  );
};

export default ProfileSelector;

const AvatarWrapper = styled.div<{ $isActive: boolean; $isNew?: boolean }>`
  ${({ theme, $isActive, $isNew }) => {
    const { font } = theme;
    return css`
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 5px solid ${$isActive ? 'skyblue' : '#fff'};
      position: relative;

      ${$isNew &&
      css`
        &:after {
          content: 'NEW!';
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: ${$isActive ? 'green' : 'red'};
          color: #fff;
          border: 2px solid #fff;
          border-radius: 12px;
          padding: 5px;
          font-size: 12px;
          font-weight: bold;
        }
      `}
    `;
  }}
`;

const StyledAvatar = styled(motion.img)`
  ${({ theme }) => {
    const { font } = theme;
    return css`
      width: 150px;
      height: 150px;
      object-fit: cover;
    `;
  }}
`;
