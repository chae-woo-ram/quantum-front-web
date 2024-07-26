import styled from 'styled-components';
import { MessagePropsType } from './MessageType';

export const MessageContainer = styled.div<MessagePropsType>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isSentByCurrentUser }) => ($isSentByCurrentUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 15px;
  align-items: flex-end;
`;

export const AdminMessageBox = styled.div`
  text-align: center;
  padding: 1rem;
  height: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const MessageBox = styled.div<MessagePropsType>`
  background: ${({ $isSentByCurrentUser }) => ($isSentByCurrentUser ? '#2979FF' : '#F3F3F3')};
  border-radius: 20px;
  padding: 10px 20px;
  color: ${({ $isSentByCurrentUser }) => ($isSentByCurrentUser ? '#FFF' : '#000')};
  display: inline-block;
  position: relative;
  font-size: 14px;

  &::after {
    content: '';
    position: absolute;
    top: 65%;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    margin-top: -4px;

    ${({ $isSentByCurrentUser }) =>
      $isSentByCurrentUser
        ? `
        right: -4px; 
        border-left-color: #2979FF;
        border-right: 0;
        transform: rotate(15deg);
        transform-origin: 0 0;
      `
        : `
        left: -4px; 
        border-right-color: #F3F3F3;
        border-left: 0;
        transform: rotate(-15deg);
        transform-origin: 0 0;
      `};
  }
`;

export const MessageWrapper = styled.p`
  margin: 5px;
`;

export const MessageBoxWrapper = styled.p`
  display: inline-flex;
  align-items: flex-end;
  flex-direction: row;
  gap: 5px;
  margin: 0;
`;

export const UserName = styled.p`
  padding: 10px 0;
  font-size: 14px;
  letter-spacing: -0.3px;
  font-weight: 600;
`;

export const CreatedAtText = styled.p<MessagePropsType>`
  display: flex;
  align-items: center;
  color: #777;
  padding: ${({ $isSentByCurrentUser }) => ($isSentByCurrentUser ? '0 5px 4px 0' : '0 0 4px 5px')};
  margin: 0;
  font-size: 12px;
  letter-spacing: -0.3px;
`;

export const MessageText = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
  margin: 0;
`;
