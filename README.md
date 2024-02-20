# Getting Started

This is the source for the WalletOS dashboard project.

### Tools

- [Vite](https://https://vitejs.dev/) - Development Framework
- [Biome](https://biomejs.dev) - Formatting, Linting and Code quality
- [TanstackRouter](https://tanstack.com/router/latest) - Routing
- [TanstackQuery](https://tanstack.com/query/latest) - Asynchronous state management
- [Ofetch](https://unjs.io/ofetch) - Data fetching
- [Zod](https://zod.dev) - Type safe and Data Validation

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run lint`

Show all Typescript and Code Quality errors/warnings in the project.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Contribution

### Biomejs

Install [extension](https://biomejs.dev/reference/vscode/#:~:text=You%20can%20install%20the%20code,biome%20%2C%20and%20hit%20enter) in VSCode.

### Environment variables

Create a `.env.local` file `.env.example` file and populate the variables.

```bash
cp .env.example .env.local
```