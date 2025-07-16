Gemini UI Clone
This project is a UI clone of the GeminiUI, built with Next.js, TypeScript, and various modern web technologies. It features authentication, chat functionality, and a responsive design with dark/light theme support.

Tech Stack Used: Next JS,Typescript,React Hook Form,Zod,Tailwind CSS,Shadcn,
🚀 Live Demo
https://gemini-clone-seven-puce.vercel.app/

✨ Features
Authentication: Secure user authentication with phone number and OTP verification.

PhoneNumber: 1234567890

OTP: 123456

Chat Functionality: Real-time-like chat interface with message handling.

Infinite Scroll (Upward): Efficient loading of older messages in chatrooms as the user scrolls up.

Throttling: Optimized scroll event handling for smooth performance.

Form Validation: Robust form validation using Zod schemas.

Dark/Light Theme: Toggle between dark and light modes using next-themes.

Responsive Design: Adapts to various screen sizes.

🛠️ Technologies Used
Next.js: React framework for production.

TypeScript: Statically typed superset of JavaScript.

Zustand: A small, fast, and scalable bearbones state-management solution.

React Hook Form: For flexible and extensible forms.

Zod: TypeScript-first schema declaration and validation library.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Shadcn UI: Reusable UI components.

Lucide React: Beautifully simple and consistent open-source icon toolkit.

📂 Folder Structure
This project follows Next.js's App Router structure.

.
├── public/                     # Static assets
├── src/
│   ├── app/                    # App Router pages
│   │   ├── auth/               # Authentication page
│   │   │   └── page.tsx
│   │   ├── dashboard/          # Initial dashboard page
│   │   │   └── page.tsx
│   │   └── search/             # Search page
│   │       └── page.tsx
│   ├── components/             # Reusable UI components
│   │   ├── auth/               # Auth-specific components
│   │   ├── chat/               # Chat-specific components (e.g., MessageList)
│   │   └── common/             # common UI components
│   │   └── dashboard/          # dashboard UI components
│   │   └── layout/             # layout UI components (e.g header,sidebar)
│   │   └── ui/                 # Shadcn UI components
│   ├── hooks/                  # Custom React Hooks (e.g., useDebounce)
│   ├── lib/                    # Utility functions or configurations
│       └── validations.ts      # Zod schemas for form validation
│       └── utils.ts            # Utility Functions
│   ├── store/                  # Zustand stores
│       ├── authStore.ts        # Authentication state management
│       └── chatStore.ts        # Chat data state management
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── package.json
└── tsconfig.json
⚙️ Setup and Run Instructions
Prerequisites
Node.js (v18 or higher recommended)

npm or Yarn

Installation
Clone the repository:

Bash

git clone https://github.com/Sathiya-EST/gemini-clone.git
cd gemini-clone
Install dependencies:

Bash

npm install
# or
yarn install

Running the Development Server
To run the project in development mode:

Bash

npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.

Building for Production
To build the project for production:

Bash

npm run build
# or
yarn build
Starting the Production Server
To start the production server after building:

Bash

npm start
# or
yarn start
📈 Implementation Details
Form Validation
Form validation is implemented using react-hook-form with zod for schema validation.

Zod Schemas: Defined in src/lib/validations.ts. These schemas define the expected shape and types of form data, providing clear validation rules (e.g., for chatroom titles, phone numbers, OTPs).

Pagination & Infinite Scroll (Upward)
The MessageList component (likely located in src/components/chat/MessageList.tsx) implements infinite scroll for messages.

Mechanism: When the user scrolls to the very top of the chat container (scrollTop reaches 0), it triggers a function (loadMoreMessages) to fetch older messages.

Simulated Loading: A 1-second setTimeout is used to simulate an asynchronous API call for fetching more messages. This can be replaced with actual backend API logic.

Initial Load: On the initial render, the component displays the 20 latest messages.

Dynamic Loading: Each time the user scrolls to the top, an additional 20 older messages are loaded until all available messages are displayed.

Throttling
To optimize performance during scrolling, throttling is applied to the scroll event handler (handleScroll).

Purpose: Throttling ensures that a function (in this case, handleScroll) is executed at most once within a specified time interval, regardless of how many times the event fires.

Benefits:

Performance: Reduces the number of times handleScroll is executed, preventing excessive re-renders and computations.

Smooth UX: Keeps scroll performance smooth and responsive, especially crucial for applications with large message lists.

Efficiency: Avoids duplicate or overlapping calls to loadMoreMessages, improving data fetching efficiency.

Memory: Fewer function executions translate to less memory pressure and garbage collection work for the JavaScript engine.

Debouncing
The useDebounce hook (likely found in src/hooks/useDebounce.ts) is utilized specifically for searching chat rooms.

Purpose: Debouncing ensures that a function is not called until a certain amount of time has passed without any further calls. This is ideal for search inputs.

Application: When a user types into the chatroom search bar, the search logic will only execute after a short delay (e.g., 300) once the user has stopped typing. This prevents unnecessary and frequent search queries for every keystroke.

📸 Screenshots
Screenshots available on the public folder.

Authentication Page:public\login.png

Dashboard:public\dashboard_page.png

Chatroom Interface:public\Chat_Interface.png
