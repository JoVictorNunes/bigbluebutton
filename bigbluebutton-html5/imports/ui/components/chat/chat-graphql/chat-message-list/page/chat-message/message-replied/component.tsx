import React from 'react';
import Styled from './styles';
import Storage from '/imports/ui/services/storage/in-memory';

interface MessageRepliedProps {
  // messageId: string;
  // chatId: string;
  username: string;
  message: string;
  sequence: number;
}

const ChatMessageReplied: React.FC<MessageRepliedProps> = (props) => {
  const { message, username, sequence } = props;
  return (
    <Styled.Container
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent('ChatFocusMessageRequest', {
            detail: {
              sequence,
            },
          }),
        );
        Storage.removeItem('ChatFocusMessageRequest');
        Storage.setItem('ChatFocusMessageRequest', sequence);
      }}
    >
      <Styled.Username>{username}</Styled.Username>
      <Styled.Message>{message}</Styled.Message>
    </Styled.Container>
  );
};

export default ChatMessageReplied;
