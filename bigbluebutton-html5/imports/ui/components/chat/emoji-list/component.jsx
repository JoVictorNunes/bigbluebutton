import React from 'react';
import PropTypes from 'prop-types';
import { Emoji, emojiIndex } from 'emoji-mart';
import Styled from './styles';

const propTypes = {
  emojiKey: PropTypes.string,
  onSelect: PropTypes.func,
};

const defaultProps = {
  emojiKey: '',
  onSelect: () => {},
};

const EmojiList = (props) => {
  const { emojiKey, onSelect } = props;

  const emojis = emojiIndex.search(emojiKey);

  if (emojis && emojis.length > 0) {
    return (
      <Styled.EmojiList as="ul">
        {emojis.map((emoji) => (
          <li
            key={emoji.id}
            onClick={(e) => {
              e.stopPropagation();
              if (typeof onSelect === 'function') onSelect(emoji);
            }}
          >
            <Emoji
              emoji={emoji}
              size={24}
              native
            />
            <div>
              {emoji.colons}
            </div>
          </li>
        ))}
      </Styled.EmojiList>
    );
  }

  return null;
};

EmojiList.propTypes = propTypes;
EmojiList.defaultProps = defaultProps;

export default EmojiList;
