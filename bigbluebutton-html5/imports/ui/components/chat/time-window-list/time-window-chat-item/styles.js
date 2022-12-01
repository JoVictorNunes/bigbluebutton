import styled from 'styled-components';
import {
  borderRadius,
  borderSize,
  chatPollMarginSm,
  smPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import { lineHeightComputed, fontSizeBase, btnFontWeight } from '/imports/ui/stylesheets/styled-components/typography';
import {
  systemMessageBackgroundColor,
  systemMessageBorderColor,
  systemMessageFontColor,
  highlightedMessageBackgroundColor,
  highlightedMessageBorderColor,
  colorHeading,
  colorGrayLight,
  palettePlaceholderText,
  colorGrayLighter,
  colorPrimary,
  colorText,
} from '/imports/ui/stylesheets/styled-components/palette';
import MessageChatItem from './message-chat-item/component';
import Icon from '/imports/ui/components/common/icon/component';
import Button from '/imports/ui/components/common/button/component';
import EmojiPickerComponent from '/imports/ui/components/emoji-picker/component';

const Item = styled.div`
  padding: calc(${lineHeightComputed} / 4) 0 calc(${lineHeightComputed} / 2) 0;
  font-size: ${fontSizeBase};
  pointer-events: auto;
  [dir="rtl"] & {
    direction: rtl;
  }
  &:hover {
    background-color: gray;
  }
  position: relative;
`;

const Messages = styled.div`
  > * {
    &:first-child {
      margin-top: calc(${lineHeightComputed} / 4);
    }
  }
`;

const SystemMessageChatItem = styled(MessageChatItem)`
  ${({ border }) => border && `
    background-color: ${systemMessageBackgroundColor};
    border: 1px solid ${systemMessageBorderColor};
    border-radius: ${borderRadius};
    font-weight: ${btnFontWeight};
    padding: ${fontSizeBase};
    color: ${systemMessageFontColor};
    margin-top: 0px;
    margin-bottom: 0px;
    overflow-wrap: break-word;
  `}

  ${({ border }) => !border && `
    color: ${systemMessageFontColor};
    margin-top: 0px;
    margin-bottom: 0px;
  `}
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
  flex: 1;
  position: relative;
  margin: ${borderSize} 0 0 ${borderSize};

  ${({ isSystemSender }) => isSystemSender && `
    background-color: ${highlightedMessageBackgroundColor};
    border-left: 2px solid ${highlightedMessageBorderColor};
    border-radius: 0px 3px 3px 0px;
    padding: 8px 2px;
  `}
  
  [dir="rtl"] & {
    margin: ${borderSize} ${borderSize} 0 0;
  }
`;

const AvatarWrapper = styled.div`
  flex-basis: 2.25rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0 calc(${lineHeightComputed} / 2) 0 0;

  [dir="rtl"] & {
    margin: 0 0 0 calc(${lineHeightComputed} / 2);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  width: calc(100% - 1.7rem);
`;

const Meta = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row;
  line-height: 1.35;
  align-items: baseline;
`;

const Name = styled.div`
  display: flex;
  min-width: 0;
  font-weight: 600;
  position: relative;

  &:first-child {
    min-width: 0;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ isOnline }) => isOnline && `
    color: ${colorHeading};
  `}

  ${({ isOnline }) => !isOnline && `
    text-transform: capitalize;
    font-style: italic;

    & > span {
      text-align: right;
      padding: 0 .1rem 0 0;

      [dir="rtl"] & {
        text-align: left;
        padding: 0 0 0 .1rem;
      }
    }
  `}
`;

const Offline = styled.span`
  color: ${colorGrayLight};
  font-weight: 100;
  text-transform: lowercase;
  font-style: italic;
  font-size: 90%;
  line-height: 1;
  align-self: center;
  user-select: none;
`;

const Time = styled.time`
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 3.5rem;
  color: ${palettePlaceholderText};
  text-transform: uppercase;
  font-size: 75%;
  margin: 0 0 0 calc(${lineHeightComputed} / 2);

  [dir="rtl"] & {
    margin: 0 calc(${lineHeightComputed} / 2) 0 0;
  }

  & > span {
    vertical-align: sub;
  }
`;

const ChatItem = styled(MessageChatItem)`
  flex: 1;
  margin-top: calc(${lineHeightComputed} / 3);
  margin-bottom: 0;
  color: ${colorText};
  word-wrap: break-word;

  ${({ emphasizedMessage }) => emphasizedMessage && `
    font-weight: bold;
  `}
`;

const PollIcon = styled(Icon)`
  bottom: 1px;
`;

const PollMessageChatItem = styled(MessageChatItem)`
  flex: 1;
  margin-top: calc(${lineHeightComputed} / 3);
  margin-bottom: 0;
  color: ${colorText};
  word-wrap: break-word;

  background-color: ${systemMessageBackgroundColor};
  border: solid 1px ${colorGrayLighter};
  border-radius: ${borderRadius};
  padding: ${chatPollMarginSm};
  padding-left: 1rem;
  margin-top: ${chatPollMarginSm} !important;
`;

const PresentationWrapper = styled(Wrapper)`
  display: flex;
  flex-flow: row;
  flex: 1;
  position: relative;
  margin: ${borderSize} 0 0 ${borderSize};
  border-left: 2px solid ${colorPrimary};
  border-radius: 2px;
  padding: 6px 0 6px 6px;
  background-color: ${systemMessageBackgroundColor};

  [dir="rtl"] & {
    margin: ${borderSize} ${borderSize} 0 0;
    border-right: 2px solid ${colorPrimary};
    border-left: none;
  }
`;

const PresentationChatItem = styled(MessageChatItem)`
  flex: 1;
  margin-top: ${chatPollMarginSm};
  margin-bottom: 0;
  color: ${colorText};
  word-wrap: break-word;
`;

const Reactions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background: red;
`;

const EmojiButton = styled(Button)`
  margin: 0 0 0 ${smPaddingX};
  align-self: center;
  font-size: 0.5rem;

  [dir="rtl"]  & {
    margin: 0 ${smPaddingX} 0 0;
    -webkit-transform: scale(-1, 1);
    -moz-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  z-index: 999;
  .emoji-mart {
    max-width: 100% !important;
  }
  .emoji-mart-anchor {
    cursor: pointer;
  }
  .emoji-mart-emoji {
    cursor: pointer !important;
  }
  .emoji-mart-category-list {
    span {
      cursor: pointer !important;
      display: inline-block !important;
    }
  }
`;

const EmojiPicker = styled(EmojiPickerComponent)``;

export default {
  Item,
  Messages,
  SystemMessageChatItem,
  Wrapper,
  AvatarWrapper,
  Content,
  Meta,
  Name,
  Offline,
  Time,
  ChatItem,
  PollIcon,
  PollMessageChatItem,
  PresentationChatItem,
  PresentationWrapper,
  Reactions,
  EmojiButton,
  EmojiPickerWrapper,
  EmojiPicker,
};
