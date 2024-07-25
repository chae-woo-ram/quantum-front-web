import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  /* background: #e0e0e0; */
  border: 1px solid #e0e0e0;
`;

export const InputField = styled.input`
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 10px 20px;
  width: 100%;
  margin-right: 10px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #2979ff; /* 포커스 시 테두리 색상 */
  }
`;

export const SendButton = styled.button`
  background: #2979ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  white-space: pre;

  &:hover {
    background: #2962ff; /* 호버 시 배경색 */
  }
`;
