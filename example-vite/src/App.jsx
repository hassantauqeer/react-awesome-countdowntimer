import { useState, useRef } from 'react'
import DateTimePicker from 'react-datetime-picker'
import CountdownTimer from 'react-awesome-countdowntimer'
import 'react-awesome-countdowntimer/dist/index.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import './App.css'

function App() {
  // Set default date to 7 days from now using native Date
  const getDefaultDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  };
  
  const [selectedDate, setSelectedDate] = useState(getDefaultDate())
  const [overtimeDate] = useState(() => new Date(Date.now() + 10000))
  const controlledTimerRef = useRef()
  const overtimeTimerRef = useRef()

  return (
    <div className="app">
      <header>
        <h1>React Awesome Countdown Timer</h1>
        <p>A customizable countdown timer component for React</p>
      </header>

      <main>
        <section className="example-section datetime-picker-section">
          <h2>Pick Your Target Date & Time</h2>
          <p>Select a date and time to see all countdown timers update</p>
          <div className="datetime-picker-container">
            <DateTimePicker
              onChange={setSelectedDate}
              value={selectedDate}
              format="y-MM-dd h:mm:ss a"
              disableClock={false}
              className="datetime-picker"
            />
          </div>
        </section>
        <section className="example-section">
          <h2>Default Timer</h2>
          <p>Basic countdown timer with default styling</p>
          <div className="timer-container">
            <CountdownTimer endDate={selectedDate} />
          </div>
        </section>

        <section className="example-section">
          <h2>Custom Inline Styles</h2>
          <p>Timer with custom colors and sizes using inline styles</p>
          <div className="timer-container">
            <CountdownTimer 
              endDate={selectedDate}
              timerStyle={{ 
                backgroundColor: '#f0f4f8', 
                padding: '30px',
                borderRadius: '15px'
              }}
              sectionStyle={{ 
                backgroundColor: '#3b82f6', 
                borderRadius: '12px',
                minWidth: '120px',
                minHeight: '120px'
              }}
              timeStyle={{ 
                color: '#ffffff', 
                fontSize: '60px',
                fontWeight: 'bold'
              }}
              labelStyle={{ 
                color: '#1e40af', 
                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}
            />
          </div>
        </section>

        <section className="example-section">
          <h2>Custom CSS Classes</h2>
          <p>Timer styled with custom CSS classes</p>
          <div className="timer-container">
            <CountdownTimer 
              endDate={selectedDate}
              timerClassName="custom-timer"
              sectionClassName="custom-section"
              timeClassName="custom-time"
              labelClassName="custom-label"
            />
          </div>
        </section>

        <section className="example-section">
          <h2>Gradient Style</h2>
          <p>Modern gradient design with custom styling</p>
          <div className="timer-container">
            <CountdownTimer 
              endDate={selectedDate}
              timerStyle={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '40px',
                borderRadius: '20px'
              }}
              sectionStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                minWidth: '110px',
                minHeight: '110px'
              }}
              timeStyle={{
                color: '#ffffff',
                fontSize: '56px',
                fontWeight: '700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}
              labelStyle={{
                color: '#764ba2',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '1px'
              }}
            />
          </div>
        </section>

        <section className="example-section">
          <h2>Responsive Layout</h2>
          <p>Layout adapts to screen size (font sizes stay the same)</p>
          <div className="timer-container">
            <CountdownTimer 
              endDate={selectedDate}
              timerClassName="responsive-timer"
              sectionClassName="responsive-section"
              timeClassName="responsive-time"
              labelClassName="responsive-label"
            />
          </div>
        </section>

        <section className="example-section">
          <h2>Fully Responsive (Layout + Font Sizes)</h2>
          <p>Both layout AND font sizes scale down on smaller screens - try resizing!</p>
          <div className="timer-container">
            <CountdownTimer 
              endDate={selectedDate}
              timerClassName="fully-responsive-timer"
              sectionClassName="fully-responsive-section"
              timeClassName="fully-responsive-time"
              labelClassName="fully-responsive-label"
            />
          </div>
        </section>

        <section className="example-section">
          <h2>🎨 V3: Custom Renderer</h2>
          <p>Complete control over rendering with a custom renderer function</p>
          <div className="timer-container">
            <CountdownTimer 
              endDate={selectedDate}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  return (
                    <div style={{ 
                      fontSize: '32px', 
                      fontWeight: 'bold', 
                      color: '#10b981',
                      textAlign: 'center',
                      padding: '40px'
                    }}>
                      🎉 Countdown Complete! 🎉
                    </div>
                  );
                }
                return (
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#6366f1',
                    fontFamily: 'monospace'
                  }}>
                    {days > 0 && <span>{days}d</span>}
                    <span>{hours}h</span>
                    <span>:</span>
                    <span>{minutes}m</span>
                    <span>:</span>
                    <span>{seconds}s</span>
                  </div>
                );
              }}
            />
          </div>
        </section>

        <section className="example-section">
          <h2>🔔 V3: With Callbacks</h2>
          <p>Trigger actions on completion and every tick (check console)</p>
          <div className="timer-container">
            <CountdownTimer 
              endDate={selectedDate}
              onComplete={(timeDelta) => {
                console.log('⏰ Countdown completed!', timeDelta);
                alert('🎉 Time is up!');
              }}
              onTick={(timeDelta) => {
                console.log('⏱️ Tick:', timeDelta.seconds, 'seconds remaining');
              }}
            />
          </div>
        </section>

        <section className="example-section">
          <h2>👶 V3: Completion Children</h2>
          <p>Simple way to show completion state using children</p>
          <div className="timer-container">
            <CountdownTimer endDate={selectedDate}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '40px',
                borderRadius: '20px',
                fontSize: '28px',
                fontWeight: 'bold',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                ✨ Mission Accomplished! ✨
              </div>
            </CountdownTimer>
          </div>
        </section>

        <section className="example-section">
          <h2>🎮 Phase 2: Imperative Controls</h2>
          <p>Start, pause, and stop the countdown programmatically</p>
          <div className="timer-container">
            <CountdownTimer 
              ref={controlledTimerRef}
              endDate={selectedDate}
              autoStart={false}
              onStart={() => console.log('▶️ Started')}
              onPause={() => console.log('⏸️ Paused')}
              onStop={() => console.log('⏹️ Stopped')}
            />
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={() => controlledTimerRef.current?.start()}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
              >
                ▶️ Start
              </button>
              <button 
                onClick={() => controlledTimerRef.current?.pause()}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
              >
                ⏸️ Pause
              </button>
              <button 
                onClick={() => controlledTimerRef.current?.stop()}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
              >
                ⏹️ Stop
              </button>
            </div>
          </div>
        </section>

        <section className="example-section">
          <h2>🔢 Phase 2: Zero Padding Control</h2>
          <p>Control number formatting with zeroPadTime prop</p>
          <div className="timer-container">
            <div style={{ marginBottom: '20px' }}>
              <strong>zeroPadTime=1 (no padding):</strong>
              <CountdownTimer 
                endDate={selectedDate}
                zeroPadTime={1}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <strong>zeroPadTime=3 (3 digits):</strong>
              <CountdownTimer 
                endDate={selectedDate}
                zeroPadTime={3}
              />
            </div>
          </div>
        </section>

        <section className="example-section">
          <h2>⏱️ Phase 2: Overtime Mode</h2>
          <p>Countdown continues into negative after reaching zero</p>
          <div className="timer-container">
            <CountdownTimer 
              ref={overtimeTimerRef}
              endDate={overtimeDate}
              overtime={true}
              renderer={({ hours, minutes, seconds, completed }) => (
                <div style={{ 
                  fontSize: '42px', 
                  fontWeight: 'bold',
                  color: completed ? '#ef4444' : '#10b981',
                  fontFamily: 'monospace'
                }}>
                  {completed && <span style={{ marginRight: '10px' }}>⚠️ OVERTIME</span>}
                  {hours}:{minutes}:{seconds}
                </div>
              )}
            />
          </div>
        </section>
      </main>

      <footer>
        <p>Built with ❤️ using React + Vite</p>
        <p>
          <a href="https://github.com/hassantauqeer/react-awesome-countdowntimer" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
