import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button, IconButton, TextField } from '@mui/material';
import styled from 'styled-components';

interface StyledTextFieldProps {
  $hasImageFile: boolean;
}

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #e0e0e0;
  gap: 10px;
`;

export const InputField = styled.input`
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #2979ff; /* 포커스 시 테두리 색상 */
  }
`;

export const SendButton = styled(Button)`
  background: #2979ff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  white-space: pre;
  height: 55px;
  &:hover {
    background: #2962ff; /* 호버 시 배경색 */
  }
`;

export const StyledFileIcon = styled(AttachFileIcon)`
  color: #fff;
  width: 30px;
  height: 30px;
  transform: rotate(35deg);
`;

export const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  & .MuiInputBase-root {
    height: ${({ $hasImageFile }) => ($hasImageFile ? '200px' : '120px')};
    align-items: flex-start;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const ImagePreviewBox = styled.div`
  height: 100px;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const ImagePreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
`;

export const RemoveButton = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 12px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  padding: 0;
  background: #666;
  color: #fff;

  svg {
    font-size: 13px;
  }
  &:hover {
    background: #111;
  }
`;
