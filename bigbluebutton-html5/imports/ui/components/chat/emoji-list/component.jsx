import React from 'react';
import PropTypes from 'prop-types';
import { Emoji, emojiIndex } from 'emoji-mart';
import Styled from './styles';

const propTypes = {
  emojiKey: PropTypes.string,
  focusedEmojiListItem: PropTypes.number,
  onSelect: PropTypes.func,
  onUpdate: PropTypes.func,
  setFocusedItem: PropTypes.func,
};

const defaultProps = {
  emojiKey: '',
  focusedEmojiListItem: 0,
  onSelect: () => {},
  onUpdate: () => {},
  setFocusedItem: () => {},
};

class EmojiList extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.handleFocusedItem.bind(this);
    this.componentDidUpdate = this.handleFocusedItem.bind(this);
  }

  handleFocusedItem(prevProps = {}) {
    const {
      focusedEmojiListItem,
      setFocusedItem,
    } = this.props;
    const {
      focusedEmojiListItem: prevFocusedEmojiListItem,
    } = prevProps;

    if (focusedEmojiListItem > this.emojis.length - 1) {
      setFocusedItem(0);
    }

    if (focusedEmojiListItem < 0) {
      setFocusedItem(this.emojis.length - 1);
    }

    const focusedItemRef = this.itemRefs[focusedEmojiListItem];
    const listRef = this.listRef;
    const isOutOfView = (focusedItemRef?.offsetTop <
      (listRef?.scrollTop + focusedItemRef?.clientHeight / 2))
      || (focusedItemRef?.offsetTop >
        (listRef?.scrollTop + listRef?.clientHeight - focusedItemRef?.clientHeight / 2));

    if (isOutOfView) {
      if (prevFocusedEmojiListItem && prevFocusedEmojiListItem < focusedEmojiListItem) {
        focusedItemRef?.scrollIntoView?.(false);
      } else if ( prevFocusedEmojiListItem && prevFocusedEmojiListItem > focusedEmojiListItem) {
        focusedItemRef?.scrollIntoView?.();
      }
    }
  }

  handleSelectEmoji(emoji, event) {
    const { onSelect } = this.props;
    event.stopPropagation();
    if (typeof onSelect === 'function') onSelect(emoji);
  }

  render() {
    const {
      emojiKey,
      focusedEmojiListItem,
      onUpdate,
    } = this.props;
  
    this.emojis = emojiIndex.search(emojiKey);
    this.itemRefs = [];
    this.listRef = null;

    if (this.emojis && this.emojis.length > 0) {
      return (
        <Styled.EmojiList
          as="ul"
          ref={(ref) => this.listRef = ref}
        >
          {this.emojis.map((emoji, index) => {
            const focused = focusedEmojiListItem === index;

            if (focused) onUpdate(emoji);

            return (
              <Styled.EmojiItem
                key={emoji.id}
                onClick={this.handleSelectEmoji.bind(this, emoji)}
                focused={focused}
                ref={(ref) => this.itemRefs[index] = ref}
              >
                <Emoji
                  emoji={emoji}
                  size={24}
                  native
                />
                <div>
                  {emoji.colons}
                </div>
              </Styled.EmojiItem>
            );
          })}
        </Styled.EmojiList>
      );
    }
  
    return null;
  }
};

EmojiList.propTypes = propTypes;
EmojiList.defaultProps = defaultProps;

export default EmojiList;
