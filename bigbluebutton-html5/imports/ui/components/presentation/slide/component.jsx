import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Slide = ({ imageUri, svgWidth, svgHeight }) => {
  const [presentationSvgData, setPresentationSvgData] = useState('');

  fetch(imageUri)
    .then(response => response.text())
    .then(body => {
      console.log(body)
      const contentRegex = /(?<=<svg[\S\s]+>)[\S\s]+(?=<\/svg>)/g;
      const result = body.match(contentRegex);
      console.log(result);
      setPresentationSvgData(result[0]);
    })
    .catch((e) => console.log(e));

  return (
    <g>
      {imageUri ?
        // some pdfs lose a white background color during the conversion to svg
        // their background color is transparent
        // that's why we have a white rectangle covering the whole slide area by default
        <g>
          <rect
            x="0"
            y="0"
            width={svgWidth}
            height={svgHeight}
            fill="white"
          />
          <svg dangerouslySetInnerHTML={{ __html: presentationSvgData }} />
        </g>
      : null}
    </g>
  )
};

Slide.propTypes = {
  // Image Uri
  imageUri: PropTypes.string.isRequired,
  // Width of the slide (Svg coordinate system)
  svgWidth: PropTypes.number.isRequired,
  // Height of the slide (Svg coordinate system)
  svgHeight: PropTypes.number.isRequired,
};

export default Slide;
