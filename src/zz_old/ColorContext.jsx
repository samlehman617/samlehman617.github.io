import React, { 
    createContext,
    useCallback,
    useContext,
    useEffect,
    // useLayoutEffect,
    // useMemo,
    useReducer,
} from 'react';
import PropTypes from 'prop-types';
// import {
    // ThemeProvider as MuiThemeProvider,
    // createMuiTheme,
    // useTheme,
    // darken,
// } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { blue, pink, grey } from '@material-ui/core/colors';
import { getCookie } from '../../utils/helpers';

import { debug } from '../../App';

export const initialColors = {
    primary: blue[500],
    secondary: pink[500],
    paper: grey[900],
    background: '#121212'
};

// export const ColorContext = createContext((initialColors) => {
//     throw new Error('Forgot to wrap component in  `ColorProvider`');
// });
export const ColorContext = createContext(initialColors);

if (process.env.NODE_ENV !== 'production') {
    ColorContext.displayName = 'ColorDispatchContext';
}

/**
 * Provides the color settings for the application.
 */
export function ColorProvider(props) {
    const { children } = props;
    if (true) console.group('ColorContext');
  
    const [options, dispatch] = useReducer((state, action) => {
      switch (action.type) {
        case 'SET_PRIMARY':    return {primary:    action.payload || state.primary   };
        case 'SET_SECONDARY':  return {secondary:  action.payload || state.secondary };
        case 'SET_BACKGROUND': return {background: action.payload || state.background};
        case 'SET_PAPER':      return {paper:      action.payload || state.paper     };
        case 'CHANGE': return {
          primary:    action.payload.primary    || state.primary,
          secondary:  action.payload.secondary  || state.secondary,
          paper:      action.payload.paper      || state.paper,
          background: action.payload.background || state.background
        }
        default: throw new Error(`Unrecognized type ${action.type}`);
      }
    }, initialColors);
  
    console.log("ColorContext: [Options, Initial, JSON]", options, initialColors);
    // const { primary, secondary, paper, background } = options;
  
    // Load initial settings from cookie
    useEffect(() => {if (process.browser) dispatch({type: 'CHANGE', payload: JSON.parse(getCookie('colors'))})}, []);
  
    // Persist colors in cookie on change
    useEffect(() => {document.cookie = `colors=${JSON.stringify(options)};path=/;max-age31536000`}, [options])
  
    if (debug) console.groupEnd();
  
    return (
        <ColorContext.Provider value={dispatch}>
          {children}
        </ColorContext.Provider>
    );
  };
  ColorProvider.propTypes = {
    children: PropTypes.node,
  };

export function useChangeColors() {
    const dispatch = useContext(ColorContext);
    // const theme = useTheme();
    return useCallback((colors) => {
        if (debug) console.log('ColorContext: useChangeColors()');
        dispatch({
            type: 'CHANGE',
            payload: colors,
        });
    }, [dispatch]);
};

// Custom hooks for controlling colors.
export function useChangePrimaryColor() {
    const dispatch = useContext(ColorContext); 
    return useCallback((color) => {
        if (debug) console.log("ChangePrimary:", color)
        dispatch({ 
            type: 'SET_PRIMARY', 
            payload: color 
        });
    }, [ dispatch ] );
};
export function useChangeSecondaryColor() {
    const dispatch = useContext(ColorContext); 
    return useCallback((color) => {
        if (debug) console.log("ChangeSecondary:", color)
        dispatch({ 
            type: 'SET_SECONDARY', 
            payload: color
        });
    }, [ dispatch ] );
};
export function useChangePaperColor() {
    const dispatch = useContext(ColorContext); 
    return useCallback((color) => {
        if (debug) console.log("ChangePaperColor:", color)
        dispatch({ 
            type: 'SET_PAPER', 
            payload: color
        });
    }, [ dispatch ] );
};
export function useChangeBackgroundColor() {
    const dispatch = useContext(ColorContext); 
    return useCallback((color) => {
        if (debug) console.log("ChangeBackgroundColor:", color)
        dispatch({ 
            type: 'SET_BACKGROUND', 
            payload: color
        });
    }, [ dispatch ] );
};