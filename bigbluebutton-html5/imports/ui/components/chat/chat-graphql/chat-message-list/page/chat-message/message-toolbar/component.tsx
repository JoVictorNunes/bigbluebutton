import React from 'react';
import {
  Container,
  EmojiPicker,
  EmojiPickerWrapper,
  EmojiButton,
} from './styles';
import Popover from '@mui/material/Popover';
import { layoutSelect } from '/imports/ui/components/layout/context';
import Button from '/imports/ui/components/common/button/component';
import BBBMenu from '/imports/ui/components/common/menu/component';
import { Layout } from '/imports/ui/components/layout/layoutTypes';

interface ChatMessageToolbarProps {
  messageId: string;
  chatId: string;
  username: string;
  message: string;
  onEmojiSelected(emoji: { id: string; native: string }): void;
}

const ChatMessageToolbar: React.FC<ChatMessageToolbarProps> = (props) => {
  const {
    messageId, chatId, message, username, onEmojiSelected,
  } = props;
  const [reactionsAnchor, setReactionsAnchor] = React.useState<Element | null>(
    null,
  );
  const isRTL = layoutSelect((i: Layout) => i.isRTL);

  const actions = [
    {
      key: 'edit',
      icon: 'pen_tool',
      label: 'Edit',
      onClick: () => null,
    },
    {
      key: 'delete',
      icon: 'delete',
      label: 'Delete',
      onClick: () => null,
    },
  ];

  return (
    <Container className="chat-message-toolbar">
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          window.dispatchEvent(
            new CustomEvent('ChatReplyIntention', {
              detail: {
                username,
                message,
                messageId,
                chatId,
              },
            }),
          );
        }}
        size="sm"
        icon="undo"
        color="light"
        ghost
        type="button"
        circle
      />
      <EmojiButton
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          setReactionsAnchor(e.currentTarget);
        }}
        size="sm"
        icon="happy"
        color="light"
        ghost
        type="button"
        circle
        data-test="emojiPickerButton"
      />

      <BBBMenu
        trigger={(
          <Button
            onClick={() => null}
            size="sm"
            icon="more"
            color="light"
            ghost
            type="button"
            circle
          />
        )}
        actions={actions}
        opts={{
          id: 'app-settings-dropdown-menu',
          keepMounted: true,
          transitionDuration: 0,
          elevation: 3,
          getcontentanchorel: null,
          fullwidth: 'true',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: isRTL ? 'left' : 'right',
          },
          transformorigin: {
            vertical: 'top',
            horizontal: isRTL ? 'left' : 'right',
          },
        }}
      />
      <Popover
        open={Boolean(reactionsAnchor)}
        anchorEl={reactionsAnchor}
        onClose={() => {
          setReactionsAnchor(null);
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: isRTL ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isRTL ? 'right' : 'left',
        }}
      >
        <EmojiPickerWrapper>
          <EmojiPicker
            onEmojiSelect={(emojiObject: { id: string; native: string }) => {
              onEmojiSelected(emojiObject);
            }}
            showPreview={false}
            showSkinTones={false}
          />
        </EmojiPickerWrapper>
      </Popover>
    </Container>
  );
};

export default ChatMessageToolbar;
