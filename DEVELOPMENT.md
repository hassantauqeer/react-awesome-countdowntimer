# Development Workflow

This guide explains how to develop the countdown timer package locally and see changes in real-time in the example app.

## Setup (Already Done ✅)

The example app is now linked to your local package using `file:..` in its package.json. This means it will use the built files from the `dist/` directory.

## Development Workflow

### Option 1: Watch Mode (Recommended)

Run the package in watch mode so it automatically rebuilds when you make changes:

```bash
# In the root directory (react-awesome-countdowntimer/)
pnpm run dev
```

This will:
- Watch for changes in `src/index.jsx`
- Automatically rebuild to `dist/` when you save changes
- Keep running until you stop it (Ctrl+C)

Then in a **separate terminal**, run the example app:

```bash
# In the example-app/ directory
cd example-app
pnpm start
```

Now when you edit `src/index.jsx`:
1. Save the file
2. Vite automatically rebuilds to `dist/`
3. The example app will hot-reload and show your changes

### Option 2: Manual Build

If you prefer to build manually:

```bash
# In the root directory
pnpm run build

# Then start the example app
cd example-app
pnpm start
```

After each change to `src/index.jsx`, run `pnpm run build` again and the example app will reload.

## File Structure

```
react-awesome-countdowntimer/
├── src/
│   └── index.jsx          ← Edit this file
├── dist/                  ← Built output (auto-generated)
│   ├── index.js           ← ES module
│   └── index.cjs          ← CommonJS
├── example-app/
│   ├── src/
│   │   └── App.js         ← Uses the countdown timer
│   └── package.json       ← Links to parent via "file:.."
└── vite.config.js         ← Build configuration
```

## Making Changes

1. **Edit the component**: Modify `src/index.jsx`
2. **Build automatically**: Watch mode rebuilds automatically
3. **See changes**: Example app hot-reloads with new changes

## Tips

- Keep the watch mode running in one terminal
- Run the example app in another terminal
- Changes to styling props will be immediately visible
- If something doesn't update, try restarting the example app

## Troubleshooting

**Changes not showing up?**
- Make sure `pnpm run dev` is running
- Check that the build completed without errors
- Try refreshing the browser (Cmd+R)

**Example app not finding the package?**
```bash
cd example-app
pnpm install
```

**Need to rebuild from scratch?**
```bash
# In root directory
rm -rf dist
pnpm run build
```
