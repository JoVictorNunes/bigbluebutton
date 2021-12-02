import React, { useState } from 'react';
import PictureInPictureButtonComponent from './component';
import browserInfo from '/imports/utils/browserInfo';

const PictureInPictureButtonContainer = (props) => <PictureInPictureButtonComponent {...props} />;

export default (props) => {
  const { videoTag } = props;
  const {
    isValidSafariForPictureInPicture,
    isAnotherValidBrowserForPictureInPicture,
  } = browserInfo;

  if (!(isValidSafariForPictureInPicture || isAnotherValidBrowserForPictureInPicture)) return null;
  if (!(document.pictureInPictureEnabled && videoTag)) return null;

  const [isInPictureInPictureMode, setIsPictureInPictureMode] = useState(false);

  videoTag.addEventListener('enterpictureinpicture', () => setIsPictureInPictureMode(true));
  videoTag.addEventListener('leavepictureinpicture', () => setIsPictureInPictureMode(false));

  function togglePictureInPictureMode() {
    if (document.pictureInPictureElement && isInPictureInPictureMode) {
      setTimeout(() => {
        document.exitPictureInPicture()
          .then(() => setIsPictureInPictureMode(false))
          .catch(() => console.log('Could not exit picture-in-picture'));
      }, 0);
    } else {
      setTimeout(() => {
        videoTag.requestPictureInPicture()
          .then(() => setIsPictureInPictureMode(true))
          .catch(() => console.log('Could not start picture-in-picture'));
      }, 0);
    }
  }

  if (isValidSafariForPictureInPicture) {
    videoTag.autoPictureInPicture = true;
  }

  const isIphone = !!(navigator.userAgent.match(/iPhone/i));

  return (
    <PictureInPictureButtonContainer
      {...props}
      {...{
        isIphone,
        togglePictureInPictureMode,
        isInPictureInPictureMode,
      }}
    />
  );
};
