# LiveDocs

LiveDocs is a collaborative document editing platform built using Next.js. It allows users to create, share, edit, and view documents in real-time. The application is inspired by the [LiveDocs App Design on Figma](https://resource.jsmastery.pro/livedocs-app) and aims to provide an intuitive and responsive user experience.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Real-time Editing**: Multiple users can collaborate on documents simultaneously with real-time updates.
- **Document Sharing**: Share documents via unique links.
- **User Authentication**: Secure user authentication to manage document access.
- **Rich Text Editor**: Create and edit documents with a rich text editor.
- **Responsive Design**: Seamlessly works on desktop, tablet, and mobile devices.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn or Pnpm
- Git

### Clone the Repository

```bash
git clone https://github.com/PedroRaposo02/live_docs.git
cd livedocs
```

### Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

Or using Pnpm:

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add your environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

LIVEBLOCKS_PUBLIC_API=your-liveblocks-public-api
LIVEBLOCKS_SECRET_KEY=your-liveblocks-secret-key

SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

### Start the Development Server

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Or using Pnpm:

```bash
pnpm dev
```

Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Sign Up / Log In**: Users need to sign up or log in to start using the app using Google.
2. **Create a Document**: Click on "New Document" to create a new document.
3. **Edit Document**: Use the rich text editor to add or modify content.
4. **Share Document**: Use the "Share" option to generate a link that others can use to access the document.
5. **Collaborate**: Share the document link with collaborators and edit in real-time.
6. **Version History**: Access the document's version history to see previous edits or revert changes.

## Project Structure

```plaintext
├── components    # Reusable UI components
├── app           # Next.js pages and API routes
├── lib           # Utility functions and hooks
├── public        # Static assets (images, fonts, etc.)
├── styles        # Global and component-specific styles
├── types         # TypeScript type definitions
├── .env.local    # Environment variables
├── package.json  # NPM/Yarn/Pnpm scripts and dependencies
└── README.md     # Project documentation
```

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Clerk**: User authentication library for Next.js applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Figma**: Design tool used as inspiration for UI/UX.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **JavaScript Mastery**: For the [LiveDocs Figma design](https://resource.jsmastery.pro/livedocs-app) which inspired this project and a great follow along video.
- **Next.js**: For providing an excellent framework for building React applications.
- **Liveblocks**: For the real-time collaboration features used in the application.
