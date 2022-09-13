import AbstractCollection from '/imports/ui/services/LocalCollectionSynchronizer/LocalCollectionSynchronizer';

// Collections
import Presentations from '/imports/api/presentations';
import PresentationPods from '/imports/api/presentation-pods';
import PresentationUploadToken from '/imports/api/presentation-upload-token';
import Screenshare from '/imports/api/screenshare';
import UserInfos from '/imports/api/users-infos';
import Polls, { CurrentPoll } from '/imports/api/polls';
import UsersPersistentData from '/imports/api/users-persistent-data';
import UserSettings from '/imports/api/users-settings';
import VideoStreams from '/imports/api/video-streams';
import VoiceUsers from '/imports/api/voice-users';
import WhiteboardMultiUser from '/imports/api/whiteboard-multi-user';
import GroupChat from '/imports/api/group-chat';
import ConnectionStatus from '/imports/api/connection-status';
import Captions from '/imports/api/captions';
import Pads, { PadsSessions, PadsUpdates, PadsPatches } from '/imports/api/pads';
import AuthTokenValidation from '/imports/api/auth-token-validation';
import Annotations from '/imports/api/annotations';
import Breakouts from '/imports/api/breakouts';
import BreakoutsHistory from '/imports/api/breakouts-history';
import guestUsers from '/imports/api/guest-users';
import Meetings, { RecordMeetings, ExternalVideoMeetings, MeetingTimeRemaining, Notifications } from '/imports/api/meetings';
import { UsersTyping } from '/imports/api/group-chat-msg';
import Users, { CurrentUser } from '/imports/api/users';
import { Slides, SlidePositions } from '/imports/api/slides';

// Custom Publishers
export const localCurrentPollSync = new AbstractCollection(CurrentPoll, CurrentPoll);
export const localCurrentUserSync = new AbstractCollection(CurrentUser, CurrentUser);
export const localSlidesSync = new AbstractCollection(Slides, Slides);
export const localSlidePositionsSync = new AbstractCollection(SlidePositions, SlidePositions);
export const localPollsSync = new AbstractCollection(Polls, Polls);
export const localPresentationsSync = new AbstractCollection(Presentations, Presentations);
export const localPresentationPodsSync = new AbstractCollection(PresentationPods, PresentationPods);
export const localPresentationUploadTokenSync = new AbstractCollection(PresentationUploadToken, PresentationUploadToken);
export const localScreenshareSync = new AbstractCollection(Screenshare, Screenshare);
export const localUserInfosSync = new AbstractCollection(UserInfos, UserInfos);
export const localUsersPersistentDataSync = new AbstractCollection(UsersPersistentData, UsersPersistentData);
export const localUserSettingsSync = new AbstractCollection(UserSettings, UserSettings);
export const localVideoStreamsSync = new AbstractCollection(VideoStreams, VideoStreams);
export const localVoiceUsersSync = new AbstractCollection(VoiceUsers, VoiceUsers);
export const localWhiteboardMultiUserSync = new AbstractCollection(WhiteboardMultiUser, WhiteboardMultiUser);
export const localGroupChatSync = new AbstractCollection(GroupChat, GroupChat);
export const localConnectionStatusSync = new AbstractCollection(ConnectionStatus, ConnectionStatus);
export const localCaptionsSync = new AbstractCollection(Captions, Captions);
export const localPadsSync = new AbstractCollection(Pads, Pads);
export const localPadsSessionsSync = new AbstractCollection(PadsSessions, PadsSessions);
export const localPadsUpdatesSync = new AbstractCollection(PadsUpdates, PadsUpdates);
export const localAuthTokenValidationSync = new AbstractCollection(AuthTokenValidation, AuthTokenValidation);
export const localAnnotationsSync = new AbstractCollection(Annotations, Annotations);
export const localRecordMeetingsSync = new AbstractCollection(RecordMeetings, RecordMeetings);
export const localExternalVideoMeetingsSync = new AbstractCollection(ExternalVideoMeetings, ExternalVideoMeetings);
export const localMeetingTimeRemainingSync = new AbstractCollection(MeetingTimeRemaining, MeetingTimeRemaining);
export const localUsersTypingSync = new AbstractCollection(UsersTyping, UsersTyping);
export const localBreakoutsSync = new AbstractCollection(Breakouts, Breakouts);
export const localBreakoutsHistorySync = new AbstractCollection(BreakoutsHistory, BreakoutsHistory);
export const localGuestUsersSync = new AbstractCollection(guestUsers, guestUsers);
export const localMeetingsSync = new AbstractCollection(Meetings, Meetings);
export const localUsersSync = new AbstractCollection(Users, Users);
export const localNotificationsSync = new AbstractCollection(Notifications, Notifications);
export const localPadsPatchesSync = new AbstractCollection(PadsPatches, PadsPatches);

const collectionMirrorInitializer = () => {
  localCurrentPollSync.setupListeners();
  localCurrentUserSync.setupListeners();
  localSlidesSync.setupListeners();
  localSlidePositionsSync.setupListeners();
  localPollsSync.setupListeners();
  localPresentationsSync.setupListeners();
  localPresentationPodsSync.setupListeners();
  localPresentationUploadTokenSync.setupListeners();
  localScreenshareSync.setupListeners();
  localUserInfosSync.setupListeners();
  localUsersPersistentDataSync.setupListeners();
  localUserSettingsSync.setupListeners();
  localVideoStreamsSync.setupListeners();
  localVoiceUsersSync.setupListeners();
  localWhiteboardMultiUserSync.setupListeners();
  localGroupChatSync.setupListeners();
  localConnectionStatusSync.setupListeners();
  localCaptionsSync.setupListeners();
  localPadsSync.setupListeners();
  localPadsSessionsSync.setupListeners();
  localPadsUpdatesSync.setupListeners();
  localAuthTokenValidationSync.setupListeners();
  localAnnotationsSync.setupListeners();
  localRecordMeetingsSync.setupListeners();
  localExternalVideoMeetingsSync.setupListeners();
  localMeetingTimeRemainingSync.setupListeners();
  localUsersTypingSync.setupListeners();
  localBreakoutsSync.setupListeners();
  localBreakoutsHistorySync.setupListeners();
  localGuestUsersSync.setupListeners();
  localMeetingsSync.setupListeners();
  localUsersSync.setupListeners();
  localNotificationsSync.setupListeners();
  localPadsPatchesSync.setupListeners();
};

export default collectionMirrorInitializer;
// const localUsersSync = new AbstractCollection(CurrentUser, CurrentUser);
