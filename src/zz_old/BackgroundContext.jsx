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

import { getCookie } from '../utils/helpers';

import { debug } from '../App';

// Default properties for a single background
const singleBackgroundInitialOptions = {
    base: "solid",
    baseProperties: {},
    effect: "none",
    effectProperties: {},
    header: "none",
    headerProperties: {},
    footer: "none",
    footerProperties: {}
};
/**
 * Default properties for background schema where the first, last, and middle 
 * pages are unique from the middle pages, which are uniform.
 */
const defaultBackgroundOptionsUniqueFirstLast = [
    {
        base: "solid",
        baseProperties: { color: "secondary"},
        effect: "none",
        effectProperties: {},
        header: "none",
        headerProperties: {},
        footer: "wave",
        footerProperties: { color: "background"},
    }, {
        base: "solid",
        baseProperties: { color: "background"},
        effect: "none",
        effectProperties: {},
        header: "none",
        headerProperties: {},
        footer: "none",
        footerProperties: {},
    }, {
        base: "solid",
        baseProperties: { color: "background"},
        effect: "none",
        effectProperties: {},
        header: "none",
        headerProperties: {},
        footer: "wave",
        footerProperties: { color: "secondary"},
    }
];
/**
 * Default properties for background schema where odd and even pages have
 * different background themes.
 */
// const defaultBackgroundOptionsAlternating = defaultBackgroundOptionsUniqueFirstLast;

/**
 * Default properties for the global background and options controlling
 * the per-page handling.
 */
export const initialBackground = {
    schema: "uniquefirstlast",
    global: singleBackgroundInitialOptions,
    pages: defaultBackgroundOptionsUniqueFirstLast,
};

export const BackgroundContext = createContext(() => {
  throw new Error('Forgot to wrap component in `BackgroundProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  BackgroundContext.displayName = 'BackgroundDispatchContext';
}

// const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function BackgroundProvider(props) {
  const { children } = props;
  if (true) console.group('BackgroundContext');
  const [options, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_SCHEMA':            return {schema:           action.payload || state.schema          };
      case 'SET_BASE':              return {base:             action.payload || state.base            };
      case 'SET_BASE_PROPERTIES':   return {baseProperties:   action.payload || state.baseProperties  };
      case 'SET_EFFECT':            return {effect:           action.payload || state.effect          };
      case 'SET_EFFECT_PROPERTIES': return {effectProperties: action.payload || state.effectProperties};
      case 'SET_HEADER':            return {header:           action.payload || state.header          };
      case 'SET_HEADER_PROPERTIES': return {header:           action.payload || state.headerProperties};
      case 'SET_FOOTER':            return {footer:           action.payload || state.footer          };
      case 'SET_FOOTER_PROPERTIES': return {footer:           action.payload || state.footerProperties};
      case 'CHANGE':
        return {
          ...state,
          schema: action.payload.schema || state.schema,
          base:             action.payload.base             || state.base,
          baseProperties:   action.payload.baseProperties   || state.baseProperties,
          effect:           action.payload.effect           || state.effect,
          effectProperties: action.payload.effectProperties || state.effectProperties,
          header:           action.payload.header           || state.header,
          headerProperties: action.payload.headerProperties || state.headerProperties,
          footer:           action.payload.footer           || state.footer,
          footerProperties: action.payload.footerProperties || state.footerProperties,
          global:           action.payload.global || state.global,
          pages:            action.payload.pages || state.pages,
        };
      default: throw new Error(`Unrecognized type ${action.type}`);
    }
  }, initialBackground);

  // const { 
  //   schema,
  //   base,
  //   baseProperties,
  //   effect,
  //   effectProperties,
  //   header,
  //   headerProperties,
  //   footer,
  //   footerProperties,
  // } = options;

  // const { base, effect, header, footer } = pageBackgroundOptions;
  if (debug) console.log( "BACKGROUND OPTIONS (GLOBAL):", options );
  if (debug) console.log( "BACKGROUND OPTIONS (PER-PAGE):", options );

  // Read state changes from cookie and dispatch them.
  // useEffect(() => {
  //   if (process.browser) {
  //     const nextBackground = JSON.parse(getCookie('background') || 'null');

  //     // const nextGlobal = JSON.parse(getCookie('backgroundGlobal') || 'null');
  //     // const nextPages = JSON.parse(getCookie('backgroundPages') || 'null');
  //     // const nextSchema = getCookie('backgroundSchema');

  //     dispatch({
  //       type: 'CHANGE',
  //       // payload: { schema: nextSchema, global: nextGlobal, pages: nextPages },
  //       payload: nextBackground,
  //     });
  //   }
  // }, []);

  // Persist schema in cookie when schema changes.
  // useEffect(() => {
  //   document.cookie = `backgroundSchema=${schema};path=/;max-age=31536000`;
  // }, [schema]);

  // Persist global background settings in cookie when a global background setting changes.
  // useEffect(() => {
  //   document.cookie = `background=${JSON.stringify(options)};path=/;max-age=31536000`;
  // }, [options])

  // const theme = useMemo(() => {

  // }, [
  //     schema,
  //     global,
  //     pages,
  //   ]);

  // useEffect(() => {
  //   // Expose the theme as a global variable so people can play with it.
  //   if (process.browser) {
  //     window.theme = theme;
  //   }
  // }, [theme]);

  return (
    <BackgroundContext.Provider value={dispatch}>
      {children}
    </BackgroundContext.Provider>
  );
}

BackgroundProvider.propTypes = {
  children: PropTypes.node,
};

/**
 * Hook to change the theme settings.
 */
export function useChangeBackground() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
};
export function useChangeBackgroundSchema() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((schema) => dispatch({ type: 'SET_SCHEMA', payload: schema }), [dispatch]);
};
export function useChangeBackgroundBase() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((base) => dispatch({ type: 'SET_BASE', payload: base }), [dispatch]);
};
export function useChangeBackgroundBaseProperties() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((baseprops) => dispatch({ type: 'SET_BASE_PROPERTIES', payload: baseprops }), [dispatch]);
};
export function useChangeBackgroundEffect() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((effect) => dispatch({ type: 'SET_EFFECT', payload: effect }), [dispatch]);
};
export function useChangeBackgroundEffectProperties() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((effectprops) => dispatch({ type: 'SET_EFFECT_PROPERTIES', payload: effectprops }), [dispatch]);
};
export function useChangeBackgroundHeader() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((header) => dispatch({ type: 'SET_HEADER', payload: header }), [dispatch]);
};
export function useChangeBackgroundHeaderProperties() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((headerprops) => dispatch({ type: 'SET_HEADER_PROPERTIES', payload: headerprops }), [dispatch]);
};
export function useChangeBackgroundFooter() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((footer) => dispatch({ type: 'SET_FOOTER', payload: footer }), [dispatch]);
};
export function useChangeBackgroundFooterProperties() {
  const dispatch = useContext(BackgroundContext);
  return useCallback((footerprops) => dispatch({ type: 'SET_FOOTER_PROPERTIES', payload: footerprops }), [dispatch]);
};