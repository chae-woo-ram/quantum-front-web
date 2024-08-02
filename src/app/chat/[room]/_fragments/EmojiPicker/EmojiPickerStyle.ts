import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import styled from 'styled-components';

const EMOJI_CONTAINER_HEIGHT = 400;

export const Container = styled.div`
  position: relative;
`;

export const PickerContainer = styled.div`
  position: absolute;
  width: 100%;
  top: calc(-${EMOJI_CONTAINER_HEIGHT + 50}px); /* -450px로 설정 */
  left: 60px;
  z-index: 1000;
  background-color: #fff;
`;

export const StyledEmojiEmotionsIcon = styled(EmojiEmotionsIcon)`
  color: #fff;
  width: 30px;
  height: 30px;
`;
