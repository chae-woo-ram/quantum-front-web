import React, { useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import EmojiPickerComponent from '../EmojiPicker/EmojiPicker';
import * as Style from './InputStyle';

const Input = ({ setMessage, sendMessage, message, setFile }: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPicker, setShowPicker] = useState(false);

  // 파일 아이콘 클릭 시 파일 입력 클릭
  const handleFileIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 시 이미지 미리보기 설정
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
          setFile(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 제거 및 파일 상태 초기화
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFile(null); // 파일 상태 제거
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 파일 입력 초기화
    }
  };

  // 메시지 전송 함수
  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (imagePreview) {
      handleRemoveImage();
    }
    console.log('Sending message!');
    sendMessage(event);
  };

  // Enter 키 이벤트 처리
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key === 'Enter' && !event.shiftKey) {
      // Shift + Enter로 줄 바꿈 방지
      handleSendMessage(event);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage((prevInput) => prevInput + event.emoji);
  };

  return (
    <Style.InputWrapper>
      <Style.Form>
        <IconButton style={{ background: '#ddd' }} onClick={handleFileIconClick}>
          <Style.StyledFileIcon />
        </IconButton>
        <EmojiPickerComponent onEmojiClick={onEmojiClick} />
        {showPicker && (
          <EmojiPicker
            style={{ width: '30%', position: 'absolute', top: '30px', bottom: '20%' }}
            onEmojiClick={onEmojiClick}
          />
        )}

        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
          <Style.StyledTextField
            size="medium"
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyUp={handleKeyUp} // Enter 키 이벤트 처리
            placeholder="전송하려는 메시지를 입력하세요."
            $hasImageFile={imagePreview !== null}
          />

          {imagePreview && (
            <Style.ImagePreviewBox>
              <Style.ImagePreview src={imagePreview} alt="Image Preview" />
              <Style.RemoveButton onClick={handleRemoveImage}>
                <CloseIcon />
              </Style.RemoveButton>
            </Style.ImagePreviewBox>
          )}
        </div>
        <Style.SendButton onClick={handleSendMessage} size="large">
          <SendIcon />
        </Style.SendButton>
      </Style.Form>
    </Style.InputWrapper>
  );
};

export default Input;
