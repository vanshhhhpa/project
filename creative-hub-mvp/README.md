# Creative Hub MVP

## Overview
Creative Hub is a platform that allows clients to browse and hire designers for various creative services. This project aims to provide a seamless experience for users to discover gigs, view details, and make payments securely.

## Features
- **Gig Listing System**: Clients can browse a variety of creative services offered by designers.
- **Service Browsing**: A dedicated page for clients to view all available gigs.
- **Payment Integration**: Secure payment processing through Stripe for hiring designers.
- **Backend API**: A basic API to handle gig data and payment processing.

## Project Structure
```
creative-hub-mvp
├── frontend          # Frontend application built with Next.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── src
│   │   ├── pages
│   │   │   ├── index.tsx
│   │   │   ├── gigs
│   │   │   │   ├── index.tsx
│   │   │   │   └── [id].tsx
│   │   │   └── checkout.tsx
│   │   ├── components
│   │   │   ├── GigCard.tsx
│   │   │   ├── GigList.tsx
│   │   │   └── Navbar.tsx
│   │   ├── services
│   │   │   ├── api.ts
│   │   │   └── stripe.ts
│   │   ├── hooks
│   │   │   └── useFetch.ts
│   │   └── types
│   │       └── index.ts
├── backend           # Backend application built with Node.js and Express
│   ├── package.json
│   ├── tsconfig.json
│   ├── src
│   │   ├── server.ts
│   │   ├── controllers
│   │   │   └── gigsController.ts
│   │   ├── routes
│   │   │   └── gigsRoutes.ts
│   │   ├── models
│   │   │   └── gig.ts
│   │   ├── services
│   │   │   └── stripeService.ts
│   │   ├── db
│   │   │   └── index.ts
│   │   ├── middleware
│   │   │   └── auth.ts
│   │   └── types
│   │       └── index.ts
│   └── .env.example
├── package.json      # Root configuration file for the project
├── tsconfig.json     # Root TypeScript configuration file
├── .gitignore        # Files and directories to be ignored by version control
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Stripe account for payment processing

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd creative-hub-mvp
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the backend directory and fill in the required values.

### Running the Application
- Start the backend server:
  ```
  cd backend
  npm start
  ```

- Start the frontend application:
  ```
  cd frontend
  npm run dev
  ```

### Usage
- Navigate to `http://localhost:3000` to access the application.
- Browse available gigs, view details, and proceed to checkout to hire designers.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.