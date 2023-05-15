import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { defineMessages, injectIntl } from 'react-intl';
import Service from './service';
import injectWbResizeEvent from '/imports/ui/components/presentation/resize-wrapper/component';
import Styled from './styles';

const intlMessages = defineMessages({
  hideTimerLabel: {
    id: 'app.timer.hideTimerLabel',
    description: 'Label for hiding timer button',
  },
  title: {
    id: 'app.timer.title',
    description: 'Title for timer',
  },
  stopwatch: {
    id: 'app.timer.button.stopwatch',
    description: 'Stopwatch switch button',
  },
  timer: {
    id: 'app.timer.button.timer',
    description: 'Timer switch button',
  },
  start: {
    id: 'app.timer.button.start',
    description: 'Timer start button',
  },
  stop: {
    id: 'app.timer.button.stop',
    description: 'Timer stop button',
  },
  reset: {
    id: 'app.timer.button.reset',
    description: 'Timer reset button',
  },
  hours: {
    id: 'app.timer.hours',
    description: 'Timer hours label',
  },
  minutes: {
    id: 'app.timer.minutes',
    description: 'Timer minutes label',
  },
  seconds: {
    id: 'app.timer.seconds',
    description: 'Timer seconds label',
  },
});

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

class Timer extends Component {
  constructor(props) {
    super(props);

    this.timeRef = React.createRef();
    this.interval = null;

    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    const { timer } = this.props;
    const { running } = timer;

    const { current } = this.timeRef;
    if (current && running) {
      this.interval = setInterval(this.updateTime, Service.getInterval());
    }
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    const { timer: prevTimer } = prevProps;

    this.updateInterval(prevTimer, timer);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateInterval(prevTimer, timer) {
    const { running } = timer;
    const { running: prevRunning } = prevTimer;

    if (!prevRunning && running) {
      this.interval = setInterval(this.updateTime, Service.getInterval());
    }

    if (prevRunning && !running) {
      clearInterval(this.interval);
    }
  }

  getTime() {
    const {
      timer,
      timeOffset,
    } = this.props;

    const {
      stopwatch,
      running,
      time,
      accumulated,
      timestamp,
    } = timer;

    const elapsedTime = Service.getElapsedTime(running, timestamp, timeOffset, accumulated);

    let updatedTime;
    if (stopwatch) {
      updatedTime = elapsedTime;
    } else {
      updatedTime = Math.max(time - elapsedTime, 0);
    }

    return Service.getTimeAsString(updatedTime, stopwatch);
  }

  updateTime() {
    const { current } = this.timeRef;
    if (current) {
      current.textContent = this.getTime();
    }
  }

  handleControlClick() {
    const { timer } = this.props;

    if (timer.running) {
      Service.stopTimer();
    } else {
      Service.startTimer();
    }
  }

  handleOnHoursChange(event) {
    const { timer } = this.props;
    const { target } = event;

    if (target && target.value) {
      const hours = parseInt(target.value);
      Service.setHours(hours, timer.time);
    }
  }

  handleOnMinutesChange(event) {
    const { timer } = this.props;
    const { target } = event;

    if (target && target.value) {
      const minutes = parseInt(target.value);
      Service.setMinutes(minutes, timer.time);
    }
  }

  handleOnSecondsChange(event) {
    const { timer } = this.props;
    const { target } = event;

    if (target && target.value) {
      const seconds = parseInt(target.value);
      Service.setSeconds(seconds, timer.time);
    }
  }

  handleSwitchToStopwatch() {
    const { timer } = this.props;

    if (!timer.stopwatch) {
      Service.switchTimer(true);
    }
  }

  handleSwitchToTimer() {
    const { timer } = this.props;

    if (timer.stopwatch) {
      Service.switchTimer(false);
    }
  }

  renderControls() {
    const {
      intl,
      timer,
    } = this.props;

    const { running } = timer;

    const label = running ? intlMessages.stop : intlMessages.start;

    return (
      <Styled.TimerControls>
        <Styled.TimerControlButton
          color="primary"
          label={intl.formatMessage(label)}
          onClick={() => this.handleControlClick()}
        />
        <Styled.TimerControlButton
          label={intl.formatMessage(intlMessages.reset)}
          onClick={() => Service.resetTimer()}
        />
      </Styled.TimerControls>
    );
  }

  renderTimer() {
    const {
      intl,
      timer,
    } = this.props;

    const {
      time,
      stopwatch,
    } = timer;

    const timeArray = Service.getTimeAsString(time).split(':');

    const hasHours = timeArray.length === 3;

    const hours = hasHours ? timeArray[0] : '00';
    const minutes = hasHours ? timeArray[1] : timeArray[0];
    const seconds = hasHours ? timeArray[2] : timeArray[1];

    return (
      <div>
        <Styled.StopwatchTime>
          <input
            type="number"
            disabled={stopwatch}
            value={hours}
            maxLength="2"
            max={Service.getMaxHours()}
            min="0"
            onChange={(event) => this.handleOnHoursChange(event)}
          />
          <Styled.StopwatchTimeColon>:</Styled.StopwatchTimeColon>
          <input
            type="number"
            disabled={stopwatch}
            value={minutes}
            maxLength="2"
            max="59"
            min="0"
            onChange={(event) => this.handleOnMinutesChange(event)}
          />
          <Styled.StopwatchTimeColon>:</Styled.StopwatchTimeColon>
          <input
            type="number"
            disabled={stopwatch}
            value={seconds}
            maxLength="2"
            max="59"
            min="0"
            onChange={(event) => this.handleOnSecondsChange(event)}
          />
        </Styled.StopwatchTime>
        {this.renderControls()}
      </div>
    );
  }

  renderContent() {
    const {
      intl,
      timer,
    } = this.props;

    const { stopwatch } = timer;

    return (
      <Styled.TimerContent>
        <Styled.TimerCurrent>
          {this.getTime()}
        </Styled.TimerCurrent>
        <Styled.TimerType>
          <Styled.TimerSwitchButton
            color={stopwatch ? 'primary' : 'default'}
            label={intl.formatMessage(intlMessages.stopwatch)}
            onClick={() => this.handleSwitchToStopwatch()}
          />
          <Styled.TimerSwitchButton
            color={stopwatch ? 'default' : 'primary'}
            label={intl.formatMessage(intlMessages.timer)}
            onClick={() => this.handleSwitchToTimer()}
          />
        </Styled.TimerType>
        {this.renderTimer()}
      </Styled.TimerContent>
    );
  }

  render() {
    const {
      intl,
      isRTL,
      isActive,
      isModerator,
      layoutContextDispatch,
      timer,
    } = this.props;

    if (!isActive || !isModerator) {
      Service.closePanel(layoutContextDispatch)
      return null;
    }

    const { stopwatch } = timer;
    const message = stopwatch ? intlMessages.stopwatch : intlMessages.timer;

    return (
      <Styled.TimerSidebarContent
        data-test="timer"
      >
        <Styled.TimerHeader>
          <Styled.TimerTitle
            data-test="timerTitle"
          >
            <Styled.TimerMinimizeButton
              onClick={() => Service.closePanel(layoutContextDispatch)}
              aria-label={intl.formatMessage(intlMessages.hideTimerLabel)}
              label={intl.formatMessage(message)}
              icon={isRTL ? "right_arrow" : "left_arrow"}
            />
          </Styled.TimerTitle>
        </Styled.TimerHeader>
        {this.renderContent()}
      </Styled.TimerSidebarContent>
    );
  }
};

Timer.propTypes = propTypes;

export default injectWbResizeEvent(injectIntl(Timer));
