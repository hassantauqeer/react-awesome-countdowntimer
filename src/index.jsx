import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './CountdownTimer.css';

const CountdownTimer = ({
  endDate,
  timerClassName = '',
  sectionClassName = '',
  timeClassName = '',
  labelClassName = '',
  timerStyle,
  sectionStyle,
  timeStyle,
  labelStyle,
}) => {
  const [timeRemaining, setTimeRemaining] = useState({
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (!(endDate instanceof Date)) return;

      const now = moment();
      const end = moment(endDate);
      const duration = moment.duration(end.diff(now));

      if (duration.asSeconds() < 0) {
        setTimeRemaining({
          months: '',
          days: '',
          hours: '',
          minutes: '',
          seconds: '',
        });
        return;
      }

      const formatNumber = (num) => (num < 10 ? `0${num}` : `${num}`);

      setTimeRemaining({
        months: Math.floor(duration.asMonths()) > 0 ? formatNumber(Math.floor(duration.asMonths())) : '',
        days: Math.floor(duration.asDays()) > 0 ? formatNumber(Math.floor(duration.days())) : '',
        hours: Math.floor(duration.asHours()) > 0 ? formatNumber(Math.floor(duration.hours())) : '',
        minutes: Math.floor(duration.asMinutes()) > 0 ? formatNumber(Math.floor(duration.minutes())) : '',
        seconds: Math.floor(duration.asSeconds()) > 0 ? formatNumber(Math.floor(duration.seconds())) : '',
      });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const timerClasses = useMemo(() => {
    return `react-countdown-timer ${timerClassName}`.trim();
  }, [timerClassName]);

  const sectionClasses = useMemo(() => {
    return `react-countdown-section ${sectionClassName}`.trim();
  }, [sectionClassName]);

  const timeClasses = useMemo(() => {
    return `react-countdown-time ${timeClassName}`.trim();
  }, [timeClassName]);

  const labelClasses = useMemo(() => {
    return `react-countdown-label ${labelClassName}`.trim();
  }, [labelClassName]);

  const renderTimeUnit = (value, label, unitClass) => {
    if (!value) return null;

    return (
      <div className={`${sectionClasses} ${unitClass}`} style={sectionStyle}>
        <div className={timeClasses} style={timeStyle}>
          {value}
        </div>
        <div className={labelClasses} style={labelStyle}>
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className={timerClasses} style={timerStyle}>
      {renderTimeUnit(timeRemaining.months, 'Months', 'months')}
      {renderTimeUnit(timeRemaining.days, 'Days', 'days')}
      {renderTimeUnit(timeRemaining.hours, 'Hours', 'hours')}
      {renderTimeUnit(timeRemaining.minutes, 'Minutes', 'minutes')}
      {renderTimeUnit(timeRemaining.seconds, 'Seconds', 'seconds')}
    </div>
  );
};

CountdownTimer.propTypes = {
  endDate: PropTypes.instanceOf(Date).isRequired,
  timerClassName: PropTypes.string,
  sectionClassName: PropTypes.string,
  timeClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  timerStyle: PropTypes.object,
  sectionStyle: PropTypes.object,
  timeStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

export default CountdownTimer;
