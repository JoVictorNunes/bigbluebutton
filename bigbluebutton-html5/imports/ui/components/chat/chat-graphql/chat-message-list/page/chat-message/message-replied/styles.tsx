import styled from 'styled-components';
import {
  colorBlueLight,
  colorOffWhite,
} from '/imports/ui/stylesheets/styled-components/palette';

const Container = styled.div`
  border-radius: 4px;
  border-left: 4px solid ${colorBlueLight};
  background-color: ${colorOffWhite};
  padding: 6px;
  position: relative;
  margin-right: 0.75rem;
  margin-bottom: 0.25rem;
  overflow: hidden;
`;

const Typography = styled.div`
  line-height: 1rem;
  font-size: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Username = styled(Typography)`
  font-weight: bold;
  color: ${colorBlueLight};
  margin-bottom: 6px;
`;

const Message = styled(Typography)``;

export default {
  Container,
  Username,
  Message,
};
