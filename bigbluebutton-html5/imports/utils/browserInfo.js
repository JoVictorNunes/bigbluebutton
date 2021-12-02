import Bowser from 'bowser';

const BOWSER_RESULTS = Bowser.parse(window.navigator.userAgent);

const isChrome = BOWSER_RESULTS.browser.name === 'Chrome';
const isSafari = BOWSER_RESULTS.browser.name === 'Safari';
const isEdge = BOWSER_RESULTS.browser.name === 'Microsoft Edge';
const isIe = BOWSER_RESULTS.browser.name === 'Internet Explorer';
const isFirefox = BOWSER_RESULTS.browser.name === 'Firefox';

const browserName = BOWSER_RESULTS.browser.name;
const versionNumber = BOWSER_RESULTS.browser.version;

const isValidSafariVersion = Bowser.getParser(window.navigator.userAgent).satisfies({
  safari: '>12',
});

const isValidSafariForPictureInPicture = Bowser
  .getParser(window.navigator.userAgent)
  .satisfies({
    desktop: {
      safari: '>=13.1',
    },
    mobile: {
      safari: '>=13.4',
    },
  });

const isAnotherValidBrowserForPictureInPicture = Bowser
  .getParser(window.navigator.userAgent)
  .satisfies({
    desktop: {
      chrome: '>=69',
      edge: '>=79',
      opera: '>=56',
    },
  });

const browserInfo = {
  isChrome,
  isSafari,
  isEdge,
  isIe,
  isFirefox,
  browserName,
  versionNumber,
  isValidSafariVersion,
  isValidSafariForPictureInPicture,
  isAnotherValidBrowserForPictureInPicture,
};

export default browserInfo;
