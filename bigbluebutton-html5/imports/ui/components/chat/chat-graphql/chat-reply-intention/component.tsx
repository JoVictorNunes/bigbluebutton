import React, { useEffect, useState } from 'react';
import Styled from './styles';
import useSettings from '/imports/ui/services/settings/hooks/useSettings';
import { SETTINGS } from '/imports/ui/services/settings/enums';

const ChatReplyIntention = () => {
  const [username, setUsername] = useState<string>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const handler = (e: Event) => {
      if (e instanceof CustomEvent) {
        setUsername(e.detail.username);
        setMessage(e.detail.message);
      }
    };

    window.addEventListener('ChatReplyIntention', handler);

    return () => {
      window.removeEventListener('ChatReplyIntention', handler);
    };
  }, []);

  const { animations } = useSettings(SETTINGS.APPLICATION) as {
    animations: boolean;
  };

  return (
    <Styled.Container $hidden={!username || !message} $animations={animations}>
      <Styled.Username>{username}</Styled.Username>
      <Styled.Message>{message}</Styled.Message>
      <Styled.CloseBtn
        onClick={() => {
          setMessage(undefined);
          setUsername(undefined);
        }}
        icon="close"
        ghost
        circle
        color="light"
        size="sm"
      />
    </Styled.Container>
  );
};

export default ChatReplyIntention;
