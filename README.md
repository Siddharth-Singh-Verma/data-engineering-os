# Data Engineering OS

An interactive, responsive, and beautifully designed web application for navigating the path to becoming a modern Data Engineer. Built with React, Vite, TailwindCSS v4, React Router, and React Flow.

## Features

- **Interactive Roadmap Canvas**: Visualize learning paths, dependencies, and phases using React Flow.
- **Module Learning Hub**: Detailed curriculum and exercises for each data engineering topic.
- **Quizzes & Knowledge Checks**: Test your knowledge with interactive quizzes for each module.
- **Progress Tracking**: See your completion percentage, streak calendar, and readiness on the dashboard.
- **Global Search**: Press `Cmd+K` (or `Ctrl+K`) to quickly search and jump to any module.
- **Dark/Light Mode**: Full theme support out of the box.

## Getting Started

### Prerequisites

You need Node.js installed on your machine. We recommend Node.js 18 or newer.

### Installation

1. Open your terminal and navigate to this project folder.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the local development server:
```bash
npm run dev
```

This will spin up a local server (typically at `http://localhost:5173/`). Open that URL in your browser to view the application!

### Building for Production

To build the static assets for production:
```bash
npm run build
```

This compiles the TypeScript code and bundles the application into the `dist/` directory, ready to be served by any static file host.
