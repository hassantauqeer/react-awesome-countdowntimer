# React Awesome Countdown Timer - Example App

A comprehensive Vite-based demo application showcasing all the features and styling capabilities of the `react-awesome-countdowntimer` package.

## 🎯 What's Included

This example app demonstrates:

### 1. **Interactive Date/Time Picker**
- Pick any future date and time
- All countdown timers update in real-time
- Uses `react-datetime-picker` for a smooth UX

### 2. **Default Timer**
- Basic countdown with default black/white styling
- Shows all time units (months, days, hours, minutes, seconds)
- Clean, minimal design

### 3. **Custom Inline Styles**
- Blue gradient background
- Custom colors, sizes, and spacing
- Demonstrates inline style props

### 4. **Custom CSS Classes**
- Pink/purple gradient design
- External CSS file styling
- Hover effects and transitions
- Shows how to override default styles

### 5. **Gradient Style**
- Modern purple gradient background
- Glassmorphism effects with backdrop blur
- Semi-transparent sections
- Professional, polished look

## 🚀 Running the Example

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm/yarn

### Installation & Setup

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

```bash
pnpm run build
```

### Preview Production Build

```bash
pnpm run preview
```

## 📁 Project Structure

```
example-vite/
├── src/
│   ├── App.jsx          # Main component with all examples
│   ├── App.css          # Custom styles for examples
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🎨 Styling Examples

This app shows three different ways to style the countdown timer:

### 1. Default Styling
```jsx
<CountdownTimer endDate={selectedDate} />
```

### 2. Inline Styles
```jsx
<CountdownTimer 
  endDate={selectedDate}
  timerStyle={{ backgroundColor: '#f0f4f8', padding: '30px' }}
  sectionStyle={{ backgroundColor: '#3b82f6' }}
  timeStyle={{ color: '#ffffff', fontSize: '60px' }}
  labelStyle={{ color: '#1e40af' }}
/>
```

### 3. CSS Classes
```jsx
<CountdownTimer 
  endDate={selectedDate}
  timerClassName="custom-timer"
  sectionClassName="custom-section"
  timeClassName="custom-time"
  labelClassName="custom-label"
/>
```

## 💡 Key Learnings

From this example, you'll learn:

- How to import and use the countdown timer component
- How to import the required CSS file
- Different styling approaches (classes vs inline styles)
- How to integrate with date picker libraries
- How to create modern, gradient designs
- CSS specificity and override techniques

## 🔗 Links

- [Main Package](../README.md)
- [npm Package](https://www.npmjs.com/package/react-awesome-countdowntimer)
- [GitHub Repository](https://github.com/hassantauqeer/react-awesome-countdowntimer)

## 📝 Notes

- This example uses React 19 and Vite 8
- All timers share the same target date (controlled by the date picker)
- The component automatically hides time units that are zero
- CSS classes have lower specificity than inline styles (by design)
