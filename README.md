

# TestMail Email Client

A modern web-based email client application built specifically for viewing and managing emails from TestMail.app. This application provides a clean, responsive interface to browse, filter, and read emails with real-time updates.

## Features

- 📧 View emails from TestMail.app API
- 🔍 Search and filter emails by tags
- 📱 Responsive design (mobile and desktop)
- 🎨 Modern UI with dark/light theme support
- 📄 Pagination support for large email lists
- 👀 HTML email rendering with safe sandboxing

## Prerequisites

Before running this project, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- A TestMail.app account with API access

## Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Configuration

To use this application, you'll need to configure your TestMail.app credentials:

1. Open the application in your browser
2. Click on the Settings icon
3. Enter your TestMail.app API Key and Namespace
4. Save the configuration

## Usage

1. **View Emails**: Browse your emails in the left sidebar
2. **Read Email**: Click on any email to view its content
3. **Filter**: Use the tag filter to narrow down emails
4. **Pagination**: Navigate through multiple pages of emails
5. **Theme**: Toggle between light and dark themes

## Technologies Used

This project is built with modern web technologies:

- **React** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Tanstack Query** - Data fetching and state management
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and types
├── pages/              # Application pages
├── services/           # API service layers
└── utils/              # Helper utilities
```

