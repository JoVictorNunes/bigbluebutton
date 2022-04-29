import React, { Component } from 'react';
import Styled from './styles';

class Subtitles extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      const { toggleSubtitle } = this.props;
        return (
            <Styled.SubtitlesWrapper>
              <Styled.SubtitlesButton 
                color="primary"
                icon="closed_caption"
                onClick={() => toggleSubtitle()}
                label={'Subtitles'}
                hideLabel
              />
            </Styled.SubtitlesWrapper>
        );
    }
}

export default Subtitles;