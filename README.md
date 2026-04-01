# React Awesome Countdown Timer

A modern, customizable countdown timer component for React with custom renderer, callbacks, and zero dependencies.

[![npm version](https://img.shields.io/npm/v/react-awesome-countdowntimer.svg)](https://www.npmjs.com/package/react-awesome-countdowntimer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://codesandbox.io/p/sandbox/ypnt3l)

![Demo Image](https://github.com/hassantauqeer/react-awesome-countdowntimer/blob/dev/demo.gif)

## ✨ Features

- 🎯 Modern React with hooks
- 🎨 Fully customizable (CSS classes + inline styles)
- 🎭 Custom renderer with render props
- 🔔 Lifecycle callbacks (onComplete, onTick, onStart, onPause, onStop, onMount)
- 🎮 Imperative API (start, pause, stop)
- 👶 Completion children
- 📦 Zero dependencies
- ⚡ Lightweight (~1.6KB gzipped)
- 🔧 TypeScript ready

## 📦 Installation

```bash
npm install react-awesome-countdowntimer
# or
pnpm add react-awesome-countdowntimer
# or
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

## 📖 Examples

### Custom Styling

```jsx
// With CSS classes
<CountdownTimer 
  endDate={endDate}
  timerClassName="my-timer"
  sectionClassName="my-section"
/>

// With inline styles
<CountdownTimer 
  endDate={endDate}
  timerStyle={{ background: '#f0f4f8', padding: '30px' }}
  sectionStyle={{ background: '#3b82f6', borderRadius: '12px' }}
/>
```

### Custom Renderer

```jsx
<CountdownTimer 
  endDate={endDate}
  renderer={({ days, hours, minutes, seconds, completed }) => {
    if (completed) return <div>🎉 Time's up!</div>;
    return <div>{days}d {hours}:{minutes}:{seconds}</div>;
  }}
/>
```

### Callbacks

```jsx
<CountdownTimer 
  endDate={endDate}
  onComplete={() => console.log('Done!')}
  onTick={(delta) => console.log(delta.seconds)}
/>
```

### Completion Children

```jsx
<CountdownTimer endDate={endDate}>
  <div>✨ Complete! ✨</div>
</CountdownTimer>
```

### Imperative Control

```jsx
const timerRef = useRef();

<CountdownTimer ref={timerRef} endDate={endDate} autoStart={false} />
<button onClick={() => timerRef.current.start()}>Start</button>
<button onClick={() => timerRef.current.pause()}>Pause</button>
```

### Advanced Features

```jsx
// Overtime mode (continue past zero)
<CountdownTimer endDate={endDate} overtime={true} />

// Days in hours (show 48h instead of 2d)
<CountdownTimer endDate={endDate} daysInHours={true} />

// Custom padding
<CountdownTimer endDate={endDate} zeroPadTime={3} /> // 001:002:003
```

## 🎛️ API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `endDate` | `Date` | **required** | Target date/time |
| `renderer` | `function` | - | Custom render function |
| `children` | `ReactNode` | - | Content shown when complete |
| `onComplete` | `function` | - | Callback when finished |
| `onTick` | `function` | - | Callback every second |
| `onStart` | `function` | - | Callback when started |
| `onPause` | `function` | - | Callback when paused |
| `onStop` | `function` | - | Callback when stopped |
| `onMount` | `function` | - | Callback on mount |
| `autoStart` | `boolean` | `true` | Auto-start countdown |
| `zeroPadTime` | `number` | `2` | Zero-padding digits (1-3) |
| `overtime` | `boolean` | `false` | Continue past zero |
| `daysInHours` | `boolean` | `false` | Show hours instead of days |
| `timerClassName` | `string` | `''` | Timer container class |
| `sectionClassName` | `string` | `''` | Section class |
| `timeClassName` | `string` | `''` | Time number class |
| `labelClassName` | `string` | `''` | Label class |
| `timerStyle` | `object` | - | Timer container styles |
| `sectionStyle` | `object` | - | Section styles |
| `timeStyle` | `object` | - | Time number styles |
| `labelStyle` | `object` | - | Label styles |

### Render Props

The `renderer` function receives:

```typescript
{
  total: number;      // Milliseconds remaining
  days: number;       // Days remaining
  hours: number;      // Hours remaining
  minutes: number;    // Minutes remaining
  seconds: number;    // Seconds remaining
  completed: boolean; // Is complete
  formatted: {        // Zero-padded strings
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }
}
```

### Imperative API

```jsx
const ref = useRef();
ref.current.start();      // Start countdown
ref.current.pause();      // Pause countdown
ref.current.stop();       // Stop countdown
ref.current.isPaused();   // Returns boolean
ref.current.isStopped();  // Returns boolean
ref.current.isCompleted(); // Returns boolean
```

### Default CSS Classes

- `.react-countdown-timer` - Main container
- `.react-countdown-section` - Time unit box
- `.react-countdown-time` - Number display
- `.react-countdown-label` - Label text

## 📄 License

MIT © [Hassan Tauqeer](https://github.com/hassantauqeer)

## ⭐ Support

Give a ⭐️ if this project helped you!
