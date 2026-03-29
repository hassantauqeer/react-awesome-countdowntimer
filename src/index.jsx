import { useState, useEffect, useMemo } from 'react';
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
      if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
        console.warn('CountdownTimer: endDate must be a valid Date object');
        return;
      }

      const now = new Date();
      const timeDiff = endDate.getTime() - now.getTime();

      if (timeDiff < 0) {
        setTimeRemaining({
          months: '',
          days: '',
          hours: '',
          minutes: '',
          seconds: '',
        });
        return;
      }

      // Calculate time units
      const totalSeconds = Math.floor(timeDiff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      const totalMonths = Math.floor(totalDays / 30); // Approximate

      const months = totalMonths;
      const days = totalDays % 30;
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      const formatNumber = (num) => (num < 10 ? `0${num}` : `${num}`);

      setTimeRemaining({
        months: months > 0 ? formatNumber(months) : '',
        days: totalDays > 0 ? formatNumber(days) : '',
        hours: totalHours > 0 ? formatNumber(hours) : '',
        minutes: totalMinutes > 0 ? formatNumber(minutes) : '',
        seconds: totalSeconds > 0 ? formatNumber(seconds) : '',
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

// Prop validation in development
if (process.env.NODE_ENV !== 'production') {
  CountdownTimer.displayName = 'CountdownTimer';
}

export default CountdownTimer;
