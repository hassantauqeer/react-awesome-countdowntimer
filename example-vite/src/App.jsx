import { useState } from 'react'
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker'
import CountdownTimer from 'react-awesome-countdowntimer'
import 'react-awesome-countdowntimer/dist/index.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(moment().add(7, 'days').toDate())

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
                color: '#e2e2e2',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '1px'
              }}
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
