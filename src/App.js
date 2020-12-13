import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  CssBaseline,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core";
// import defaultTheme from "./components/theming/themes/Default";
import defaultTheme from "./components/theming/themes/Void";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./components/navigation/Pace";
import { ThemeProvider } from './components/theming/context/ThemeContext';
import {
  // PresetContext,
  PresetProvider
} from "./components/theming/context/PresetContext";
// TODO: Separate schema to global provider & use instance of section provider for each section.
import { SchemaProvider } from './components/theming/context/SchemaContext';

const LoggedInComponent = lazy(() => import("./components/navigation/LoggedIn/Selector"));
const LoggedOutComponent = lazy(() => import("./components/navigation/LoggedOut/Selector"));
const debug = false;
const theme = responsiveFontSizes(createMuiTheme(defaultTheme));

function App() {
  if (debug) console.log("URL:", process.env.PUBLIC_URL);
  return (
    <BrowserRouter>
    <PresetProvider>
      <SchemaProvider>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route path="/c">
              <LoggedInComponent />
            </Route>
            <Route>
              <LoggedOutComponent />
            </Route>
          </Switch>
        </Suspense>
      </ThemeProvider>
      </SchemaProvider>
      </PresetProvider>
    </BrowserRouter>
  );
}

serviceWorker.register();

export { debug };
export default App;
