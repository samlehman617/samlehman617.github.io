import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

// import * as presets from './themes';

export const PresetContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `PresetProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  PresetContext.displayName = 'PresetContext';
}

const getInitial = () => {
  const use = (process.browser && Cookies.get("use_preset")!==false);
  const cookieVal = Cookies.get("preset");
  const name = use && cookieVal !== undefined ? cookieVal : 'Default'
  console.log("PresetContext:", { use: use, name: name});
  return { use: use, name: name};
};

export function PresetProvider(props) {
  const { children } = props;

  const [preset, setPreset] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'SET':        return { use: action.payload.use || state.use, name: action.payload.name || state.name };
      case 'SET_USE':    return { ...state, use: action.payload };
      case 'SET_NAME':   return { ...state, name: action.payload };
      case 'TOGGLE':     return { ...state, use: !state.use };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, getInitial());

  // Persist palette in cookie
  React.useEffect(() => {
    console.log("PresetSwitcher: storing value in cookie:", preset);
    Cookies.set("preset", preset.name);
    Cookies.set("use_preset", preset.use);
  }, [preset]);

  // Define setters
  const changePresetActive = React.useCallback((v) => {
    console.log("PresetContext: hook active to", v);
    setPreset({ type: 'SET_USE', payload: v });
  }, [setPreset]);
  const changePreset= React.useCallback((v) => {
    console.log("PresetContext: hook name to", v);
    setPreset({ type: 'SET_NAME', payload: v });
  }, [setPreset]);

  return (
    <PresetContext.Provider value={[ preset.use, preset.name, changePresetActive, changePreset]}>
      {children}
    </PresetContext.Provider>
  );
};

PresetProvider.propTypes = {
  children: PropTypes.node,
  initial: PropTypes.string,
  use: PropTypes.bool,
};
PresetProvider.defaultProps = {
  initial: 'Default',
  cookie: true,
};

// /**
//  * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
//  */
// export function useChangePresetActive() {
//   const dispatch = React.useContext(PresetContext);
//   return React.useCallback((options) => dispatch({ type: 'SET_USE', payload: options }), [dispatch]);
// }