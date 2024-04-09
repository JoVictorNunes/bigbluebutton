import React, { useState } from 'react';
import Styled from '../styles';
import { useIntl } from 'react-intl';
import { BreakoutRoom } from '../queries';
import { useMutation } from '@apollo/client';
import { BREAKOUT_ROOM_SET_TIME } from '../../../mutations';

const intlMessages = defineMessages({
  breakoutTitle: {
    id: 'app.createBreakoutRoom.title',
    description: 'breakout title',
  },
  breakoutAriaTitle: {
    id: 'app.createBreakoutRoom.ariaTitle',
    description: 'breakout aria title',
  },
  breakoutDuration: {
    id: 'app.createBreakoutRoom.duration',
    description: 'breakout duration time',
  },
  breakoutRoom: {
    id: 'app.createBreakoutRoom.room',
    description: 'breakout room',
  },
  breakoutJoin: {
    id: 'app.createBreakoutRoom.join',
    description: 'label for join breakout room',
  },
  breakoutJoinAudio: {
    id: 'app.createBreakoutRoom.joinAudio',
    description: 'label for option to transfer audio',
  },
  breakoutReturnAudio: {
    id: 'app.createBreakoutRoom.returnAudio',
    description: 'label for option to return audio',
  },
  askToJoin: {
    id: 'app.createBreakoutRoom.askToJoin',
    description: 'label for generate breakout room url',
  },
  generatingURL: {
    id: 'app.createBreakoutRoom.generatingURL',
    description: 'label for generating breakout room url',
  },
  endAllBreakouts: {
    id: 'app.createBreakoutRoom.endAllBreakouts',
    description: 'Button label to end all breakout rooms',
  },
  chatTitleMsgAllRooms: {
    id: 'app.createBreakoutRoom.chatTitleMsgAllRooms',
    description: 'chat title for send message to all rooms',
  },
  alreadyConnected: {
    id: 'app.createBreakoutRoom.alreadyConnected',
    description: 'label for the user that is already connected to breakout room',
  },
  setTimeInMinutes: {
    id: 'app.createBreakoutRoom.setTimeInMinutes',
    description: 'Label for input to set time (minutes)',
  },
  setTimeLabel: {
    id: 'app.createBreakoutRoom.setTimeLabel',
    description: 'Button label to set breakout rooms time',
  },
  setTimeCancel: {
    id: 'app.createBreakoutRoom.setTimeCancel',
    description: 'Button label to cancel set breakout rooms time',
  },
  setTimeHigherThanMeetingTimeError: {
    id: 'app.createBreakoutRoom.setTimeHigherThanMeetingTimeError',
    description: 'Label for error when new breakout rooms time would be higher than remaining time in parent meeting',
  },
});

interface TimeRemainingPanelProps {
  showChangeTimeForm: boolean;
  isModerator: boolean;
  breakout: BreakoutRoom;
  durationInSeconds: number;
  toggleShowChangeTimeForm: (value: boolean) => void;
}

const TimeRemaingPanel: React.FC<TimeRemainingPanelProps> = ({
  showChangeTimeForm,
  isModerator,
  breakout,
  durationInSeconds,
  toggleShowChangeTimeForm,
}) => {
  const intl = useIntl();
  const durationContainerRef = React.useRef(null);
  const [showFormError, setShowFormError] = useState(false);
  const [newTime, setNewTime] = useState(0);

  const [breakoutRoomSetTime] = useMutation(BREAKOUT_ROOM_SET_TIME);

  const setBreakoutsTime = (timeInMinutes: number) => {
    if (timeInMinutes <= 0) return false;

    return breakoutRoomSetTime({ variables: { timeInMinutes } });
  };

  return (
    <Styled.DurationContainer
      centeredText={!showChangeTimeForm}
      ref={durationContainerRef}
    >
      {/*
        have been implemented in PR #18920
        https://github.com/bigbluebutton/bigbluebutton/pull/18920
        <Styled.Duration>
          <MeetingRemainingTime
            messageDuration={intlMessages.breakoutDuration}
            breakoutRoom={breakoutRooms[0]}
            fromBreakoutPanel
          />
        </Styled.Duration> */}
      {isModerator && showChangeTimeForm ? (
        <Styled.SetTimeContainer>
          <label htmlFor="inputSetTimeSelector">
            {intl.formatMessage(intlMessages.setTimeInMinutes)}
          </label>
          <br />
          <Styled.FlexRow>
            <Styled.SetDurationInput
              id="inputSetTimeSelector"
              type="number"
              min="1"
              value={newTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newSetTime = Number.parseInt(e.target.value, 10) || 0;
                setNewTime(newSetTime);
              }}
              aria-label={intl.formatMessage(intlMessages.setTimeInMinutes)}
            />
            &nbsp;
            &nbsp;
            <Styled.EndButton
              data-test="sendButtonDurationTime"
              color="primary"
              disabled={false}
              size="sm"
              label={intl.formatMessage(intlMessages.setTimeLabel)}
              onClick={() => {
                setShowFormError(false);

                if (newTime > durationInSeconds) {
                  setShowFormError(true);
                } else if (setBreakoutsTime(newTime)) {
                  toggleShowChangeTimeForm(false);
                }
              }}
            />
          </Styled.FlexRow>
          {showFormError ? (
            <Styled.WithError>
              {intl.formatMessage(intlMessages.setTimeHigherThanMeetingTimeError)}
            </Styled.WithError>
          ) : null}
        </Styled.SetTimeContainer>
      ) : null}
    </Styled.DurationContainer>
  );
};

export default TimeRemaingPanel;
