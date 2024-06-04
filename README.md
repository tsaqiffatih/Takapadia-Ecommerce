

# E-commerce Application

This is an E-commerce application built with Next.js and TypeScript. It provides a platform for users to browse and purchase products online. The application includes user authentication, product listing, and a shopping cart feature.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [License](#license)

## Features

- User Authentication (Login/Register)
- Browse Products
- Product Search
- Product Details
- Wishlist
- Infinite Scroll
- Delete User Wishlist
- Create/Add User Wishlist

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React infinite scroll Component](https://www.npmjs.com/package/react-infinite-scroll-component)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/) for Authentication
- [Zod](https://github.com/colinhacks/zod)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/tsaqiffatih/Takapedia-Ecommerce.git
    cd Takapedia-Ecommerce
    cd my-ecommerce-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_URL_API=http://localhost:3000/api
JWT_SECRET_KEY=Your Secret Key
MONGODB_DATABASE_NAME=Your Database Name
MONGODB_URI=Your MongoDB URI
```

## Running the Application

1. Start the development server:
    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

