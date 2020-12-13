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
import {
    // ThemeProvider as MuiThemeProvider,
    // createMuiTheme,
    // useTheme,
    // darken,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getCookie } from '../../utils/helpers';

import { debug } from '../../App';

export const ThemeTypeContext = createContext(() => {
    throw new Error('Forgot to wrap component in `ThemeTypeProvider`');
});
if (process.env.NODE_ENV !== 'production') {
    ThemeTypeContext.displayName = 'ThemeTypeDispatchContext';
}

// const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const initialThemeType = {
    type: 'light'
};

export function ThemeTypeProvider(props) {
    const { children } = props;
    const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
    if (debug) console.group('ThemeTypeContext');

    const [options, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_DARK':   return { type: 'dark'        };
            case 'SET_LIGHT':  return { type: 'light'       };
            case 'SET_SYSTEM': return { type: 'system'      };
            case 'SET_TYPE':   return { type: action.payload};
            case 'TOGGLE_TYPE': 
                return {
                    type: state.type === 'system' ? 
                        systemDark ? 'light' : 'dark' :
                        state.type === 'light' ? 'dark' : 'light'
                };
            default: throw new Error(`ThemeTypeContext: Unrecognized type ${action.type}`);
        }
    }, initialThemeType);

    const { type } = options;

    // Load initial state from cookie.
    useEffect(() => {
        if (process.browser) {
            const nextType = JSON.parse(getCookie('paletteType') || 'null');
        
            dispatch({
                type: 'SET_TYPE',
                payload: nextType,
            });
        }
    }, []);
    // Persist state in cookie on change.
    useEffect(() => {
        document.cookie = `paletteType=${type};path=/;max-age=31536000`;
    }, [type])

    return (
        <ThemeTypeProvider value={dispatch}>
            {children}
        </ThemeTypeProvider>
    );
};
ThemeTypeContext.propTypes = {
    children: PropTypes.node,
};

/**
 * Hook to change the theme settings.
 */
export function useChangeThemeType() {
    const dispatch = useContext(ThemeTypeContext);
    return useCallback((mode) => dispatch({ type: 'SET_TYPE', payload: mode }), [dispatch]);
};
export function useSetDarkTheme() {
    const dispatch = useContext(ThemeTypeContext);
    return useCallback(() => dispatch({type: 'SET_DARK'}), [dispatch]);
};
export function useSetLightTheme() {
    const dispatch = useContext(ThemeTypeContext);
    return useCallback(() => dispatch({type: 'SET_LIGHT'}), [dispatch]);
};
export function useSetSystemTheme() {
    const dispatch = useContext(ThemeTypeContext);
    return useCallback(() => dispatch({type: 'SET_SYSTEM'}), [dispatch]);
};
export function useToggleThemeType() {
    const dispatch = useContext(ThemeTypeContext);
    return useCallback(() => dispatch({type: 'TOGGLE_TYPE'}), [dispatch]);
};