import { useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Session } from 'meteor/session';
import {
  getUserCurrent,
  GetUserCurrentResponse,
  getUserInfo,
  GetUserInfoResponse,
  userJoinMutation,
} from './queries';
import { setAuthData } from '/imports/ui/core/local-states/useAuthData';
import MeetingEndedContainer from '../../meeting-ended/component';
import { setUserDataToSessionStorage } from './service';
import { LoadingContext } from '../../common/loading-screen/loading-screen-HOC/component';
import logger from '/imports/startup/client/logger';
import deviceInfo from '/imports/utils/deviceInfo';
import GuestWaitContainer, { GUEST_STATUSES } from '../guest-wait/component';

const connectionTimeout = 60000;

interface PresenceManagerContainerProps {
    children: React.ReactNode;
  }

interface PresenceManagerProps extends PresenceManagerContainerProps {
    authToken: string;
    logoutUrl: string;
    meetingId: string;
    meetingName: string;
    userName: string;
    extId: string;
    userId: string;
    joinErrorCode: string;
    joinErrorMessage: string;
    joined: boolean;
    meetingEnded: boolean;
    endedReasonCode: string;
    endedBy: string;
    ejectReasonCode: string;
    bannerColor: string;
    bannerText: string;
    customLogoUrl: string;
    loggedOut: boolean;
    guestStatus: string;
    guestLobbyMessage: string | null;
    positionInWaitingQueue: number | null;
}

const PresenceManager: React.FC<PresenceManagerProps> = ({
  authToken,
  children,
  logoutUrl,
  meetingId,
  meetingName,
  userName,
  extId,
  userId,
  joinErrorCode,
  joinErrorMessage,
  joined,
  meetingEnded,
  endedReasonCode,
  endedBy,
  ejectReasonCode,
  bannerColor,
  bannerText,
  customLogoUrl,
  loggedOut,
  guestLobbyMessage,
  guestStatus,
  positionInWaitingQueue,
}) => {
  const [allowToRender, setAllowToRender] = React.useState(false);
  const [dispatchUserJoin] = useMutation(userJoinMutation);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const loadingContextInfo = useContext(LoadingContext);
  const isGuestAllowed = guestStatus === GUEST_STATUSES.ALLOW;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      loadingContextInfo.setLoading(false, '');
      throw new Error('Authentication timeout');
    }, connectionTimeout);

    const urlParams = new URLSearchParams(window.location.search);
    const sessionToken = urlParams.get('sessionToken') as string;
    setAuthData({
      meetingId,
      userId,
      authToken,
      logoutUrl,
      sessionToken,
      userName,
      extId,
      meetingName,
    });
    setUserDataToSessionStorage({
      meetingId,
      userId,
      authToken,
      logoutUrl,
      sessionToken,
      userName,
      extId,
      meetingName,
      customLogoUrl,
    });
  }, []);

  useEffect(() => {
    if (bannerColor || bannerText) {
      Session.set('bannerText', bannerText);
      Session.set('bannerColor', bannerColor);
    }
  }, [bannerColor, bannerText]);

  useEffect(() => {
    if (authToken && !joined && isGuestAllowed) {
      dispatchUserJoin({
        variables: {
          authToken,
          clientType: 'HTML5',
          clientIsMobile: deviceInfo.isMobile,
        },
      });
    }
  }, [joined, authToken, isGuestAllowed]);

  useEffect(() => {
    if (joined) {
      clearTimeout(timeoutRef.current);
      setAllowToRender(true);
    }
  }, [joined]);

  useEffect(() => {
    if (joinErrorCode) {
      loadingContextInfo.setLoading(false, '');
    }
  },
  [joinErrorCode, joinErrorMessage]);

  const errorCode = loggedOut ? 'user_logged_out_reason' : joinErrorCode || ejectReasonCode;

  if (!isGuestAllowed) {
    return (
      <GuestWaitContainer
        guestLobbyMessage={guestLobbyMessage}
        guestStatus={guestStatus}
        logoutUrl={logoutUrl}
        positionInWaitingQueue={positionInWaitingQueue}
      />
    );
  }

  return (
    <>
      {allowToRender && !(meetingEnded || joinErrorCode || ejectReasonCode || loggedOut) ? children : null}
      {
        meetingEnded || joinErrorCode || ejectReasonCode || loggedOut
          ? (
            <MeetingEndedContainer
              meetingEndedCode={endedReasonCode}
              endedBy={endedBy}
              joinErrorCode={errorCode}
            />
          )
          : null
      }
    </>
  );
};

const PresenceManagerContainer: React.FC<PresenceManagerContainerProps> = ({ children }) => {
  const { loading, error, data } = useSubscription<GetUserCurrentResponse>(getUserCurrent);

  const {
    loading: userInfoLoading,
    error: userInfoError,
    data: userInfoData,
  } = useQuery<GetUserInfoResponse>(getUserInfo);

  const loadingContextInfo = useContext(LoadingContext);
  if (loading || userInfoLoading) return null;
  if (error || userInfoError) {
    loadingContextInfo.setLoading(false, '');
    logger.debug(`Error on user authentication: ${error}`);
    throw new Error('Error on user authentication');
  }

  if (!data || data.user_current.length === 0) return null;
  if (!userInfoData
      || userInfoData.meeting.length === 0
      || userInfoData.user_current.length === 0) return null;
  const {
    authToken,
    joinErrorCode,
    joinErrorMessage,
    joined,
    ejectReasonCode,
    meeting,
    loggedOut,
    guestStatusDetails,
    guestStatus,
  } = data.user_current[0];
  const {
    logoutUrl,
    meetingId,
    name: meetingName,
    bannerColor,
    bannerText,
    customLogoUrl,
  } = userInfoData.meeting[0];
  const { extId, name: userName, userId } = userInfoData.user_current[0];

  return (
    <PresenceManager
      authToken={authToken}
      logoutUrl={logoutUrl}
      meetingId={meetingId}
      meetingName={meetingName}
      userName={userName}
      extId={extId}
      userId={userId}
      joined={joined}
      joinErrorCode={joinErrorCode}
      joinErrorMessage={joinErrorMessage}
      meetingEnded={meeting.ended}
      endedReasonCode={meeting.endedReasonCode}
      endedBy={meeting.endedByUserName}
      ejectReasonCode={ejectReasonCode}
      bannerColor={bannerColor}
      bannerText={bannerText}
      loggedOut={loggedOut}
      customLogoUrl={customLogoUrl}
      guestLobbyMessage={guestStatusDetails?.guestLobbyMessage ?? null}
      positionInWaitingQueue={guestStatusDetails?.positionInWaitingQueue ?? null}
      guestStatus={guestStatus}
    >
      {children}
    </PresenceManager>
  );
};

export default PresenceManagerContainer;
