# React Awesome Countdown Timer

A modern, customizable countdown timer component for React applications. Built with React hooks and styled with CSS classes for easy customization.

[![npm version](https://img.shields.io/npm/v/react-awesome-countdowntimer.svg)](https://www.npmjs.com/package/react-awesome-countdowntimer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Live Demo: [https://codesandbox.io/p/sandbox/ypnt3l](https://codesandbox.io/p/sandbox/ypnt3l)

## ✨ Features

- 🎯 **Modern React** - Built with functional components and hooks
- 🎨 **Fully Customizable** - Style with CSS classes or inline styles
- 🎭 **Custom Renderer** - Complete control over rendering with render props (v3)
- � **Lifecycle Callbacks** - onComplete, onTick callbacks for actions (v3)
- 👶 **Completion Children** - Simple completion state with children prop (v3)
- � **Zero Dependencies** - No external dependencies required
- ⚡ **Lightweight** - Only ~1.5KB gzipped
- 🚀 **Fast** - Optimized with useMemo for performance
- 🔧 **TypeScript Ready** - Includes type definitions
- 🌐 **ESM Support** - Modern module format

## 📦 Installation

**Using npm:**
```bash
npm install react-awesome-countdowntimer
```

**Using pnpm:**
```bash
pnpm add react-awesome-countdowntimer
```

**Using yarn:**
```bash
yarn add react-awesome-countdowntimer
```

## 🚀 Quick Start

```jsx
import CountdownTimer from 'react-awesome-countdowntimer';
import 'react-awesome-countdowntimer/dist/index.css';

function App() {
  const endDate = new Date('2026-12-31T23:59:59');
  
  return <CountdownTimer endDate={endDate} />;
}
```

## 📖 Usage Examples

### Basic Usage (Default Styling)

```jsx
import CountdownTimer from 'react-awesome-countdowntimer';
import 'react-awesome-countdowntimer/dist/index.css';

function App() {
  const endDate = new Date('2026-12-31T23:59:59');
  
  return (
    <div>
      <h1>New Year Countdown</h1>
      <CountdownTimer endDate={endDate} />
    </div>
  );
}
```

### With Custom Inline Styles

```jsx
import CountdownTimer from 'react-awesome-countdowntimer';
import 'react-awesome-countdowntimer/dist/index.css';

function App() {
  const endDate = new Date('2026-12-31T23:59:59');
  
  return (
    <CountdownTimer 
      endDate={endDate}
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
        fontWeight: '600'
      }}
    />
  );
}
```

### With Custom CSS Classes

```jsx
import CountdownTimer from 'react-awesome-countdowntimer';
import 'react-awesome-countdowntimer/dist/index.css';
import './custom-timer.css';

function App() {
  const endDate = new Date('2026-12-31T23:59:59');
  
  return (
    <CountdownTimer 
      endDate={endDate}
      timerClassName="my-custom-timer"
      sectionClassName="my-custom-section"
      timeClassName="my-custom-time"
      labelClassName="my-custom-label"
    />
  );
}
```

**custom-timer.css:**
```css
.my-custom-timer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  border-radius: 20px;
}

.my-custom-section {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.my-custom-time {
  color: #ffffff;
  font-size: 56px;
  font-weight: 700;
}

.my-custom-label {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
}
```

### With Dynamic Date Selection

```jsx
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import CountdownTimer from 'react-awesome-countdowntimer';
import 'react-awesome-countdowntimer/dist/index.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date('2026-12-31T23:59:59'));
  
  return (
    <div>
      <h2>Pick Your Target Date</h2>
      <DateTimePicker
        onChange={setSelectedDate}
        value={selectedDate}
      />
      
      <h2>Countdown</h2>
      <CountdownTimer endDate={selectedDate} />
    </div>
  );
}
```

### V3: Custom Renderer

Take complete control over rendering with a custom renderer function:

```jsx
import CountdownTimer from 'react-awesome-countdowntimer';

function App() {
  const endDate = new Date('2026-12-31T23:59:59');
  
  return (
    <CountdownTimer 
      endDate={endDate}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return <div>🎉 Time's up!</div>;
        }
        return (
          <div>
            {days > 0 && <span>{days}d </span>}
            <span>{hours}:{minutes}:{seconds}</span>
          </div>
        );
      }}
    />
  );
}
```

### V3: With Callbacks

Trigger actions when countdown completes or on every tick:

```jsx
import CountdownTimer from 'react-awesome-countdowntimer';
import 'react-awesome-countdowntimer/dist/index.css';

function App() {
  const endDate = new Date('2026-12-31T23:59:59');
  
  return (
    <CountdownTimer 
      endDate={endDate}
      onComplete={(timeDelta) => {
        console.log('Countdown finished!', timeDelta);
        // Play sound, show notification, etc.
      }}
      onTick={(timeDelta) => {
        console.log('Tick:', timeDelta.seconds);
        // Update progress bar, etc.
      }}
    />
  );
}
```

### V3: Completion Children

Simple way to show content when countdown completes:

```jsx
import CountdownTimer from 'react-awesome-countdowntimer';
import 'react-awesome-countdowntimer/dist/index.css';

function App() {
  const endDate = new Date('2026-12-31T23:59:59');
  
  return (
    <CountdownTimer endDate={endDate}>
      <div>✨ Countdown Complete! ✨</div>
    </CountdownTimer>
  );
}
```

### Phase 2: Imperative API

Control the countdown programmatically with start, pause, and stop methods:

```jsx
import { useRef } from 'react';
import CountdownTimer from 'react-awesome-countdowntimer';
import 'react-awesome-countdowntimer/dist/index.css';

function App() {
  const timerRef = useRef();
  const endDate = new Date('2026-12-31T23:59:59');
  
  return (
    <>
      <CountdownTimer 
        ref={timerRef}
        endDate={endDate}
        autoStart={false}
        onStart={() => console.log('Started!')}
        onPause={() => console.log('Paused!')}
        onStop={() => console.log('Stopped!')}
      />
      
      <button onClick={() => timerRef.current.start()}>Start</button>
      <button onClick={() => timerRef.current.pause()}>Pause</button>
      <button onClick={() => timerRef.current.stop()}>Stop</button>
    </>
  );
}
```

### Phase 2: Zero Padding Control

Control how numbers are formatted:

```jsx
// No padding: 1:2:3
<CountdownTimer endDate={endDate} zeroPadTime={1} />

// Default padding: 01:02:03
<CountdownTimer endDate={endDate} zeroPadTime={2} />

// Extra padding: 001:002:003
<CountdownTimer endDate={endDate} zeroPadTime={3} />
```

### Phase 2: Overtime Mode

Continue counting into negative after reaching zero:

```jsx
<CountdownTimer 
  endDate={endDate}
  overtime={true}
  renderer={({ hours, minutes, seconds, completed }) => (
    <div>
      {completed && <span>OVERTIME: </span>}
      {hours}:{minutes}:{seconds}
    </div>
  )}
/>
```

### Creating Dates

Since the component uses native JavaScript Date objects, you can create dates in multiple ways:

```jsx
// Using Date constructor with string
const endDate1 = new Date('2026-12-31T23:59:59');

// Using Date constructor with parameters (year, month, day, hour, minute, second)
const endDate2 = new Date(2026, 11, 31, 23, 59, 59); // Note: month is 0-indexed

// Adding time to current date
const endDate3 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

// Using any of these
<CountdownTimer endDate={endDate1} />
```

## 🎛️ API Reference

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `endDate` | `Date` | ✅ Yes | - | The target date/time for the countdown |
| `renderer` | `function` | ❌ No | `undefined` | **V3** Custom render function for complete control over output |
| `children` | `ReactNode` | ❌ No | `undefined` | **V3** Content to show when countdown completes |
| `onComplete` | `function` | ❌ No | `undefined` | **V3** Callback when countdown finishes |
| `onTick` | `function` | ❌ No | `undefined` | **V3** Callback on every second (tick) |
| `onStart` | `function` | ❌ No | `undefined` | **Phase 2** Callback when countdown starts |
| `onPause` | `function` | ❌ No | `undefined` | **Phase 2** Callback when countdown pauses |
| `onStop` | `function` | ❌ No | `undefined` | **Phase 2** Callback when countdown stops |
| `autoStart` | `boolean` | ❌ No | `true` | **Phase 2** Whether countdown starts automatically |
| `zeroPadTime` | `number` | ❌ No | `2` | **Phase 2** Number of digits for zero-padding (1-3) |
| `overtime` | `boolean` | ❌ No | `false` | **Phase 2** Continue into negative after reaching zero |
| `timerClassName` | `string` | ❌ No | `''` | Custom CSS class for the timer container |
| `sectionClassName` | `string` | ❌ No | `''` | Custom CSS class for each time unit section |
| `timeClassName` | `string` | ❌ No | `''` | Custom CSS class for the time numbers |
| `labelClassName` | `string` | ❌ No | `''` | Custom CSS class for the labels (Months, Days, etc.) |
| `timerStyle` | `object` | ❌ No | `undefined` | Inline styles for the timer container |
| `sectionStyle` | `object` | ❌ No | `undefined` | Inline styles for each time unit section |
| `timeStyle` | `object` | ❌ No | `undefined` | Inline styles for the time numbers |
| `labelStyle` | `object` | ❌ No | `undefined` | Inline styles for the labels |

### V3 Render Props (for custom renderer)

When using the `renderer` prop, your function receives an object with:

| Property | Type | Description |
|----------|------|-------------|
| `total` | `number` | Total milliseconds remaining |
| `days` | `number` | Days remaining (as number) |
| `hours` | `number` | Hours remaining (as number) |
| `minutes` | `number` | Minutes remaining (as number) |
| `seconds` | `number` | Seconds remaining (as number) |
| `completed` | `boolean` | Whether countdown has finished |
| `formatted` | `object` | Zero-padded string values (`{ days, hours, minutes, seconds }`) |

### V3 Callback Parameters

Both `onComplete` and `onTick` receive a `timeDelta` object:

```typescript
{
  total: number;      // Total milliseconds remaining
  days: number;       // Days remaining
  hours: number;      // Hours remaining
  minutes: number;    // Minutes remaining
  seconds: number;    // Seconds remaining
  completed: boolean; // Whether countdown is complete
}
```

### Phase 2 Imperative API Methods

When using a ref, you can access these methods:

| Method | Returns | Description |
|--------|---------|-------------|
| `start()` | `void` | Starts the countdown |
| `pause()` | `void` | Pauses the countdown |
| `stop()` | `void` | Stops and resets the countdown |
| `isPaused()` | `boolean` | Returns true if countdown is paused |
| `isStopped()` | `boolean` | Returns true if countdown is stopped |
| `isCompleted()` | `boolean` | Returns true if countdown has finished |

**Example:**
```jsx
const timerRef = useRef();

// Later in your code:
timerRef.current.start();
timerRef.current.pause();
const paused = timerRef.current.isPaused();
```

### Default CSS Classes

The component uses these CSS classes by default (can be overridden):

- `.react-countdown-timer` - Main container
- `.react-countdown-section` - Each time unit box (months, days, hours, etc.)
- `.react-countdown-time` - The number display
- `.react-countdown-label` - The label text ("Months", "Days", etc.)

### Time Units Displayed

The timer automatically displays only non-zero time units:
- **Months** - Shown if > 0
- **Days** - Shown if > 0
- **Hours** - Shown if > 0
- **Minutes** - Shown if > 0
- **Seconds** - Shown if > 0

## 🎨 Styling Guide

### Default Styles

The component comes with default styles that provide a clean, modern look:
- Black background sections with rounded corners
- White text for numbers (74px)
- White background labels with black text (22px)

### Customization Options

1. **CSS Classes** (Recommended) - Override default classes in your CSS
2. **Inline Styles** - Pass style objects via props
3. **Mix Both** - Combine CSS classes with inline style overrides

### CSS Class Hierarchy

```
.react-countdown-timer (or your timerClassName)
  └── .react-countdown-section (or your sectionClassName)
        ├── .react-countdown-time (or your timeClassName)
        └── .react-countdown-label (or your labelClassName)
```

## 🛠️ Development

This package uses **Vite** for building and **pnpm** for package management.

### Setup

```bash
git clone https://github.com/hassantauqeer/react-awesome-countdowntimer.git
cd react-awesome-countdowntimer
pnpm install
```

### Build

```bash
pnpm run build
```

### Watch Mode (for development)

```bash
pnpm run build:watch
```

### Run Example App

```bash
cd example-vite
pnpm install
pnpm run dev
```

Then open [http://localhost:5173](http://localhost:5173) to see the examples.

## 📋 Requirements

- React 16.8+ (hooks support)
- No other dependencies required!

## 📄 License

MIT © [Hassan Tauqeer](https://github.com/hassantauqeer)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
