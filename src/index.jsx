import { useState, useEffect, useMemo, useRef } from 'react';
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
  renderer,
  children,
  onComplete,
  onTick,
}) => {
  const [timeRemaining, setTimeRemaining] = useState({
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  });
  const [completed, setCompleted] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
        console.warn('CountdownTimer: endDate must be a valid Date object');
        return;
      }

      const now = new Date();
      const timeDiff = endDate.getTime() - now.getTime();

      if (timeDiff < 0) {
        const wasCompleted = completedRef.current;
        setTimeRemaining({
          months: '',
          days: '',
          hours: '',
          minutes: '',
          seconds: '',
        });
        setCompleted(true);
        completedRef.current = true;
        
        // Trigger onComplete callback only once
        if (!wasCompleted && onComplete) {
          onComplete({
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            completed: true,
          });
        }
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
      setCompleted(false);
      
      // Trigger onTick callback
      if (onTick) {
        onTick({
          total: timeDiff,
          days: totalDays,
          hours: totalHours,
          minutes: totalMinutes,
          seconds: totalSeconds,
          completed: false,
        });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [endDate, onComplete, onTick]);

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

  // Prepare render props for custom renderer
  const renderProps = useMemo(() => {
    const parseFormattedValue = (val) => (val ? parseInt(val, 10) : 0);
    
    return {
      total: completed ? 0 : Math.max(0, endDate?.getTime() - new Date().getTime()),
      days: parseFormattedValue(timeRemaining.days),
      hours: parseFormattedValue(timeRemaining.hours),
      minutes: parseFormattedValue(timeRemaining.minutes),
      seconds: parseFormattedValue(timeRemaining.seconds),
      completed,
      formatted: {
        days: timeRemaining.days,
        hours: timeRemaining.hours,
        minutes: timeRemaining.minutes,
        seconds: timeRemaining.seconds,
      },
    };
  }, [timeRemaining, completed, endDate]);

  // If completed and children provided, show children
  if (completed && children) {
    return children;
  }

  // If custom renderer provided, use it
  if (renderer) {
    return renderer(renderProps);
  }

  // Default rendering
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
