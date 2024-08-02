import styled from 'styled-components';
import { MessagePropsType } from './MessageType';

export const DownloadButton = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  &:hover {
    color: #999;
  }
`;

export const ImagePreviewBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  &:hover ${DownloadButton} {
    opacity: 1;
  }
`;

export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

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
  display: flex;
  flex-direction: column;
  gap: 10px;
  word-break: break-all;

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

export const MessageWrapper = styled.div``;

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
  white-space: pre;
  margin: 0;
`;

export const StyledAvatar = styled.div<{ $profileId: number }>`
  width: 80px;
  height: 80px;
  display: inline-block;
  background-size: 150%;
  background-position: center;
  background-image: ${({ $profileId }) => `url('/images/profile${$profileId}.png')`};
  border-radius: 50%;
  border: 3px solid #ddd;
`;
