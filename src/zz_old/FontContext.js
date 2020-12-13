import React, { 
    createContext,
    // useCallback,
    // useContext,
    useEffect,
    // useLayoutEffect,
    // useMemo,
    useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { getCookie } from '../../utils/helpers';

import { debug } from '../../App';

export const initialFont = {
    effect: 'none',
    font: 'roboto',
    size: 16,
    weight: 500,
    variant: 'normal',
};

export const FontContext = createContext(() => {
    throw new Error('Forgot to wrap component in `FontProvider`');
});

if (process.env.NODE_ENV !== 'production') {
    FontContext.displayName = 'FontDispatchContext';
}

/**
 * Provides the font settings for the application.
 */
export function FontProvider(props) {
    const { children } = props;
    if (debug) console.group('ColorContext');
  
    const [options, dispatch] = useReducer((state, action) => {
      switch (action.type) {
        case 'SET_EFFECT':    return {effect:  action.payload || state.effect };
        case 'SET_FONT':      return {font:    action.payload || state.font   };
        case 'SET_CASE':      return {case:    action.payload || state.case   };
        case 'SET_SIZE':      return {size:    action.payload || state.size   };
        case 'INCREASE_SIZE': return {size:    state.size + 1                 };
        case 'DECREASE_SIZE': return {size:    state.size - 1                 };
        case 'SET_WEIGHT':    return {weight:  action.payload || state.weight };
        case 'SET_VARIANT':   return {variant: action.payload || state.variant};
        case 'CHANGE': return {
          effect:  action.payload.effect  || state.effect,
          font:    action.payload.font    || state.font,
          size:    action.payload.size    || state.size,
          weight:  action.payload.weight  || state.weight,
          variant: action.payload.variant || state.variant,
        }
        default: throw new Error(`FontProvider action: Unrecognized type ${action.type}`);
      }
    }, initialFont);
  
    // const { effect, font, size, weight, variant } = options;
  
    // Load initial settings from cookie
    useEffect(() => {if (process.browser) dispatch({type: 'CHANGE', payload: JSON.parse(getCookie('font'))})}, []);
  
    // Persist settings in cookie on change
    useEffect(() => {document.cookie = `font=${JSON.stringify(options)};path=/;max-age31536000`}, [options])
  
    if (debug) console.groupEnd();
  
    return (
        <FontContext.Provider value={dispatch}>
          {children}
        </FontContext.Provider>
    );
  };
  FontProvider.propTypes = {
    children: PropTypes.node,
  };