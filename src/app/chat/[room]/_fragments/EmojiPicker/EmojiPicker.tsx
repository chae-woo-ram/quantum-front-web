import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import * as Style from './EmojiPickerStyle';

function EmojiPickerComponent({ onEmojiClick }) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null); // 이모지 피커 컨테이너를 위한 ref

  // 외부 클릭을 처리하는 함수
  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    // 문서에 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (event) => {
    onEmojiClick?.(event);
    // setShowPicker(false);
  };

  return (
    <Style.Container>
      <IconButton style={{ background: '#ddd' }} onClick={() => setShowPicker(true)}>
        <Style.StyledEmojiEmotionsIcon />
      </IconButton>

      {showPicker && (
        <Style.PickerContainer ref={pickerRef}>
          <EmojiPicker
            width={300}
            height={400}
            onEmojiClick={handleEmojiClick}
            previewConfig={{ showPreview: false }} // 미리보기 hidden 처리
            searchDisabled // 검색 비활성화
          />
        </Style.PickerContainer>
      )}
    </Style.Container>
  );
}

export default EmojiPickerComponent;
