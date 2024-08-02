import styled from 'styled-components';

export const InfoContainer = styled.div`
  display: flex;
  background-color: #2c2c2c;
  padding: 1rem;
  justify-content: space-between;
  & svg {
    color: #fff;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const TitleText = styled.div`
  color: #fff;
  font-size: 20px;
`;

export const MessageBox = styled.div<{ isSentByCurrentUser: boolean }>`
  background: ${({ isSentByCurrentUser }) => (isSentByCurrentUser ? '#2979FF' : '#F3F3F3')};
  border-radius: 20px;
  padding: 10px 20px;
  color: ${({ isSentByCurrentUser }) => (isSentByCurrentUser ? '#FFF' : '#000')};
  display: inline-block;
  max-width: 80%;
`;

export const MessageWrapper = styled.p`
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;
`;

export const SentText = styled.p<{ isSentByCurrentUser: boolean }>`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: ${({ isSentByCurrentUser }) => (isSentByCurrentUser ? '#FFF' : '#000')};
  letter-spacing: 0.3px;
  padding: ${({ isSentByCurrentUser }) => (isSentByCurrentUser ? '0 10px 0 0' : '0 0 0 10px')};
  margin: 0;
  font-size: 12px;
`;

export const MessageText = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
  margin: 0;
`;
