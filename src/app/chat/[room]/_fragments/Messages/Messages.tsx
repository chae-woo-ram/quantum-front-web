import { useEffect, useRef } from 'react';
import Message from './Message/Message';
import * as Style from './MessagesStyle';

function Messages({ messages, name }: any) {
  const messageBoxRef = useRef<HTMLUListElement>();

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Style.MessagesContainer ref={messageBoxRef as any}>
      {messages.map((message: any, i: number) => {
        return (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        );
      })}
    </Style.MessagesContainer>
  );
}

export default Messages;
