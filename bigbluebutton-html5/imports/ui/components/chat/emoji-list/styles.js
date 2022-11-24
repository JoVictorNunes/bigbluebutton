import styled from 'styled-components';
import {
  colorOffWhite,
  colorPrimary,
  colorGrayLightest,
} from '/imports/ui/stylesheets/styled-components/palette';

const EmojiList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  user-select: none;
  border: 1px solid ${colorGrayLightest};
  border-radius: 10px;
  margin-bottom: 4px;

  & > li {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: .5rem .2rem;
  }

  & > li:hover {
    background-color: ${colorOffWhite};
    color: ${colorPrimary};
    cursor: pointer;
  }
`;

export default {
  EmojiList,
};
