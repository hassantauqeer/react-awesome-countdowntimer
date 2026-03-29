import { useState, useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import './CountdownTimer.css';

const CountdownTimer = forwardRef(({
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
  onStart,
  onPause,
  onStop,
  onMount,
  autoStart = true,
  zeroPadTime = 2,
  overtime = false,
  daysInHours = false,
}, ref) => {
  const [timeRemaining, setTimeRemaining] = useState({
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  });
  const [completed, setCompleted] = useState(false);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPausedState, setIsPausedState] = useState(false);
  const [isStoppedState, setIsStoppedState] = useState(!autoStart);
  const completedRef = useRef(false);
  const intervalRef = useRef(null);
  const offsetTimeRef = useRef(0);
  const pauseTimeRef = useRef(null);
  const mountedRef = useRef(false);

  // onMount callback
  useEffect(() => {
    if (!mountedRef.current && onMount) {
      mountedRef.current = true;
      const now = new Date();
      const timeDiff = endDate instanceof Date ? endDate.getTime() - now.getTime() : 0;
      onMount({
        total: Math.max(0, timeDiff),
        completed: timeDiff <= 0,
      });
    }
  }, [onMount, endDate]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
        console.warn('CountdownTimer: endDate must be a valid Date object');
        return;
      }

      const now = new Date();
      const timeDiff = endDate.getTime() - now.getTime();

      if (timeDiff < 0 && !overtime) {
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
        setIsRunning(false);
        
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

      // Calculate time units (support negative for overtime)
      const absTimeDiff = Math.abs(timeDiff);
      const totalSeconds = Math.floor(absTimeDiff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      const totalMonths = Math.floor(totalDays / 30); // Approximate

      const months = totalMonths;
      let days, hours;
      
      if (daysInHours) {
        // Show all time in hours instead of days
        days = 0;
        hours = totalHours;
      } else {
        days = totalDays % 30;
        hours = totalHours % 24;
      }
      
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      const formatNumber = (num) => {
        const str = String(num);
        return str.padStart(zeroPadTime, '0');
      };
      
      const prefix = overtime && timeDiff < 0 ? '-' : '';

      setTimeRemaining({
        months: months > 0 ? prefix + formatNumber(months) : '',
        days: !daysInHours && totalDays > 0 ? prefix + formatNumber(days) : '',
        hours: (daysInHours ? totalHours : totalHours % 24) > 0 ? prefix + formatNumber(hours) : '',
        minutes: totalMinutes > 0 ? prefix + formatNumber(minutes) : '',
        seconds: totalSeconds > 0 ? prefix + formatNumber(seconds) : '',
      });
      setCompleted(timeDiff < 0 && !overtime);
      
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

    if (!isRunning) return;

    calculateTimeRemaining();
    intervalRef.current = setInterval(calculateTimeRemaining, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [endDate, onComplete, onTick, isRunning, zeroPadTime, overtime, daysInHours]);

  // Imperative API
  useImperativeHandle(ref, () => ({
    start: () => {
      if (isRunning) return;
      
      setIsRunning(true);
      setIsPausedState(false);
      setIsStoppedState(false);
      
      if (pauseTimeRef.current) {
        offsetTimeRef.current += Date.now() - pauseTimeRef.current;
        pauseTimeRef.current = null;
      }
      
      if (onStart) {
        onStart({
          total: Math.max(0, endDate?.getTime() - new Date().getTime()),
          completed: completed,
        });
      }
    },
    
    pause: () => {
      if (!isRunning || isPausedState) return;
      
      setIsRunning(false);
      setIsPausedState(true);
      pauseTimeRef.current = Date.now();
      
      if (onPause) {
        onPause({
          total: Math.max(0, endDate?.getTime() - new Date().getTime()),
          completed: completed,
        });
      }
    },
    
    stop: () => {
      if (isStoppedState) return;
      
      setIsRunning(false);
      setIsPausedState(false);
      setIsStoppedState(true);
      offsetTimeRef.current = 0;
      pauseTimeRef.current = null;
      
      if (onStop) {
        onStop({
          total: Math.max(0, endDate?.getTime() - new Date().getTime()),
          completed: completed,
        });
      }
    },
    
    isPaused: () => isPausedState,
    isStopped: () => isStoppedState,
    isCompleted: () => completed,
  }), [isRunning, isPausedState, isStoppedState, completed, endDate, onStart, onPause, onStop]);

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
});

// Prop validation in development
if (process.env.NODE_ENV !== 'production') {
  CountdownTimer.displayName = 'CountdownTimer';
}

export default CountdownTimer;
