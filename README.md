# React Developer Portfolio
Sam Lehman's developer portfolio. Built with React, Webpack, Babel, Material-UI, and more!

[**Check out the demo**](https://samlehman617.github.io)

![Node.js CI](https://github.com/samlehman617/samlehman617.github.io/workflows/Node.js%20CI/badge.svg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=samlehman617/samlehman617.github.io)](https://dependabot.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


## Getting Started

### Prerequisites

#### Node.js

* Debian-based Linux:

   ```
   sudo apt install nodejs npm
   ```

* Windows or macOS:

   https://nodejs.org/en/

### Installing

1. Clone the repository

   ```
   git clone https://github.com/samlehman617/samlehman617.github.io
   ```
2. Install dependencies, this can take a minute

   ```
   cd samlehman617.github.io
   npm install
   ```
3. Start the local server

   ```
   npm start
   ```

Your browser should now open and show the app. Otherwise open http://localhost:3000/ in your browser. Editing files will automatically refresh the page.

### What next?

You should know React.js and Material-UI as those are the two main libraries this site uses.

* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [Material-UI documentation](https://material-ui.com/getting-started/usage/).

## Deployment

This repository has a GitHub Action in `.github/workflows/nodejs.yml` that deploys a new build when you commit to the `main` branch. The Action expects the built static files to be located in the `docs` directory.

To deploy the site manually, run:

```
npm run deploy 
```

It will create a folder named build with your compiled project inside. After that copy its content into your webroot and you are ready to go.

## Build With

* [Create-React-App](https://github.com/facebook/create-react-app) - Used to bootstrap the development
* [Material-UI](https://github.com/mui-org/material-ui) - Material Design components
* [React-Router](https://github.com/ReactTraining/react-router) - Routing of the app
* [Aos](https://github.com/michalsnik/aos) - Animations based on viewport


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/samlehman617/developer-portfolio/blob/master/LICENSE) file for details.
