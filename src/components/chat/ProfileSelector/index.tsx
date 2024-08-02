import { useEffect } from 'react';
import { Divider, Grid } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
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
  /** 프로필의 개별 애니메이션 상태관리 */
  const controlsMap = profileData.reduce(
    (acc, { id }) => {
      acc[id] = useAnimation();
      return acc;
    },
    {} as Record<number, ReturnType<typeof useAnimation>>,
  );

  /** 프로필의 id가 변경될때 실행되는 애니메이션 */
  useEffect(() => {
    const controls = controlsMap[profileId];
    controls
      .start({
        scale: [1, 1.5, 1, 1.5, 1],
        y: [0, -20, 0, -20, 0],
        transition: { duration: 1, ease: 'easeInOut' },
      })
      .then(() => {
        setTimeout(() => {
          controls.start({
            rotate: [-5, 5, -5, 5, -5, 5, -5, 5, -5, 5, 0],
            transition: { duration: 0.5, ease: 'easeInOut' },
          });
        }, 1000);
      });
  }, [profileId]);

  return (
    <>
      <Divider />
      <Grid container direction="row" gap="10px" marginTop="20px" justifyContent="center">
        {profileData.map(({ id, src, isNew }) => (
          <AvatarWrapper key={id} onClick={() => onChange(id)} $isActive={profileId === id} $isNew={isNew}>
            <StyledAvatar src={src} animate={profileId === id ? controlsMap[id] : {}} />
          </AvatarWrapper>
        ))}
      </Grid>
    </>
  );
};

export default ProfileSelector;

const AvatarWrapper = styled.div<{ $isActive: boolean; $isNew?: boolean }>`
  ${({ theme, $isActive, $isNew }) => {
    return css`
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 5px solid ${$isActive ? 'skyblue' : '#eee'};
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      overflow: hidden;

      ${$isNew &&
      css`
        &:after {
          content: 'NEW!';
          position: absolute;
          top: 10px;
          right: 26px;
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
    return css`
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 50%; /* Ensure the image is also rounded */
    `;
  }}
`;
