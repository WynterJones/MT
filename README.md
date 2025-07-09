# MoneyTracker

A personal finance tracker built with Electron, React, and Vite.

## Features

- Cross-platform desktop application
- Modern React UI with TypeScript
- Fast development with Vite
- Electron integration for native desktop features

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To run the app in development mode:

```bash
npm run electron:dev
```

This will start the Vite development server and launch the Electron app.

### Building

To build the app for production:

```bash
npm run electron:build
```

This will create a production build in the `release` folder.

### Scripts

- `npm run dev` - Start Vite development server
- `npm run electron` - Start Electron (requires dev server to be running)
- `npm run electron:dev` - Start both dev server and Electron concurrently
- `npm run electron:build` - Build for production
- `npm run build` - Build web version only

## Project Structure

```
MoneyTracker/
├── electron/           # Electron main process files
│   ├── main.ts        # Main Electron process
│   ├── preload.ts     # Preload script
│   └── util.ts        # Utility functions
├── src/               # React application source
│   ├── App.tsx        # Main App component
│   ├── App.css        # App styles
│   ├── index.css      # Global styles
│   └── main.tsx       # React entry point
├── dist/              # Built web application
├── dist-electron/     # Built Electron files
├── release/           # Production builds
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript config for React
├── tsconfig.node.json # TypeScript config for Node.js
└── vite.config.ts     # Vite configuration
```

## Technologies Used

- **Electron** - Desktop application framework
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **CSS3** - Styling with modern features

## License

MIT
