# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

# Project Setup Guide

This guide provides instructions on setting up and running your frontend project. Follow the steps below to ensure a smooth development environment.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your local machine.

## Installing Dependencies

1. Open a terminal and navigate to your frontend project directory.

2. Run the following command to install all necessary packages:

   ```bash
   npm install
   ```

## Running the Project

Start the frontend project with the following command:

```bash
npm run dev
```

The development server will be accessible at `http://localhost:5173`.

Now you can begin working on your frontend application. If you encounter any issues or have questions, refer to the project documentation or seek help from the community. Happy coding!
