import React from 'react';
import Styled from './styles';

interface MessageRepliedProps {
  // messageId: string;
  // chatId: string;
  username: string;
  message: string;
}

const ChatMessageReplied: React.FC<MessageRepliedProps> = (props) => {
  const { message, username } = props;
  return (
    <Styled.Container
      onClick={() => {
        //
      }}
    >
      <Styled.Username>{username}</Styled.Username>
      <Styled.Message>{message}</Styled.Message>
    </Styled.Container>
  );
};

export default ChatMessageReplied;
