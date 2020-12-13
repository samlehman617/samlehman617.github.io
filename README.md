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

## To-Do
### Major functionality
- [ ] Move URL to my domain.
- [ ] Implement backend for sam chatbot
- [ ] Implement frontend for sam chatbot

### Content
- [ ] Add resume section.
- [ ] Add GitHub contributions calendar.
- [x] Update footer lorem ipsum.
- [ ] Remove unused sections.

### UI
#### General UI
- [ ] Fix the faux glass on the project cards so text is legible on any background.
- [ ] Fix project cards not taking all available grid space.
- [ ] Fix project cards README not being scrollable when long.
- [ ] Fix pace component never disappearing.
- [ ] Make project card title a link.
- [ ] Add tech icons to project card chips.
- [ ] Add scroll to next section buttons.
- [ ] Add scroll to top button.

#### Theme Backend
- [ ] Allow multiple schemas for theme settings.
- [ ] Force context managers to exclusively derive state from cookie & defaults.
- [ ] Implement `current_theme` and `next_theme` where controls affect `next_theme`
- [ ] Move themes from `src/components/theming/themes` to `src/data/themes`
- [ ] Subdivide themes into components and build top-level themes from them.

#### Theme Animated Page Elements
- [ ] Make WaveHeader/WaveFooter use higher resolution for curvature.
- [ ] Make sure all p5.js backgrounds can handle window resize.
- [ ] Make sure all p5.js backgrounds can handle prop changes.

#### Theme Setting Controls
- [ ] Keep theme switcher action button row sticky & always on top.
- [ ] Consistent getter/setter functions in props for theme control widgets.
- [ ] Configure theme controls to only update context when save button clicked.

#### Theme Coverage
- [ ] Fix AppBar button text match theme properly.
- [ ] Make AppBar shadow match theme when scrolled to top.
- [ ] Make footer content aware of footer background and adapt content styles.

### Performance
- [ ] Move as much CSS out of React code as possible (huge performance hit)
- [ ] Optimize performance on the p5.js sketches.
- [ ] Dynamically load as much code as possible.
- [ ] Prevent FancyText change on every render.
- [ ] Cache data from GitHub API.
- [ ] Add loading spinners/skeletons for unloaded content.

### DevOps
- [ ] Fix GitHub Action
- [ ] Cache NPM deps?
- [ ] Keep main branch working & switch to development branch

### Documentation
- [ ] Add screenshot(s) of UI to README

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/samlehman617/developer-portfolio/blob/master/LICENSE) file for details.
