import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    // useReducer,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
// import { capitalize } from '@material-ui/core';
import { usePreset } from './PresetContext';
import * as presets from '../themes';

export const BackgroundContext = createContext(() => {
    throw new Error('Forgot to wrap component in `BackgroundProvider`');
});
if (process.env.NODE_ENV !== 'production') {
    BackgroundContext.displayName = 'BackgroundContext';
}

// const mergeSavedWithPreset = (presetName = 'Default') => {
//     const preset = presets[capitalize(presetName)];
//     return { ...preset.background, ...Cookies.getJSON("background") };
// };

// const sectObj = {
//     name: 'default section',
//     layout: 'content',
//     colors: {
//         primary: 'primary',
//         secondary: 'secondary',
//         paper: 'paper',
//         background: 'background',
//     },
//     background: {
//         base: {
//             type: 'solid',       // solid | gradient | image
//             args: {},            // color | color,color2 | color?,(path|name)
//         },
//         effect: {
//             type: 'hilbert',
//             args: {}
//         },
//         header: {
//             type: 'wave',
//             args: {},
//         },
//         footer: {
//             type: 'wave',
//             args: {},
//         },
//     },
//     paper: {
//         material: 'paper',
//         opacity: 1.0,
//         elevation: 8,
//         blur: 0.0,
//     }
// }
// const bgObj = {
//     schema: 'all unique',
//     first: {},
//     last: {},
//     odd: {},
//     even: {},
//     mid: [],
// };

export const BackgroundProvider = props => {
  const { children } = props;
//   const [presetUse, presetName, setPresetUse, setPresetName] = usePreset();
  const [presetUse, presetName, ...rest] = usePreset();
  let initialSchema;
  if (presetUse) {
      if (presetName === 'debug') console.log("BackgroundProvider:", rest);
    initialSchema = presets[presetName].schema;
  } else {
    initialSchema = Cookies.get("schema");
  }
  const [schema, setSchema] = useState(initialSchema || 1);

  // Save changes to cookie.
  useEffect(() => {
    Cookies.set("schema", schema);
  }, [schema]);

  // const provide = { state, dispatch };
  const provide = { schema, setSchema };
  return (
    <BackgroundContext.Provider value={provide}>
      {children}
    </BackgroundContext.Provider>
  );
};
// export const BackgroundProvider = (props) => {
//     const { children, sections } = props;
//     const [presetUse, presetName, setPresetUse, setPresetName] = usePreset();
//     // const cookie = Cookies.getJSON("background");

//     const [schema, setSchema] = useState(1);

//     // Schemas: Uniform (1), Alternating (2), Unique 1st/nth, All unique
//     const [state, dispatch] = useReducer((old, action) => {
//         let newState = old;

//         // Build new object for section we care modifying.
//         let newBG = old[action.object];
//         switch (action.field) {
//             case 'set':         newBG = { ...old[action.object], ...action.payload };       break;
//             case 'section':     newBG = { ...old[action.object], ...action.payload };       break;
//             case 'schema':      newState.schema                     = action.payload;       break;
//             case 'base':        newBG['base']                       = action.payload;       break;
//             case 'base_type':   newBG['base']['type']               = action.payload;       break;
//             case 'base_color':  newBG['base']['color']              = action.payload;       break;
//             case 'base_arg':    newBG['base'][action.payload.arg]   = action.payload.value; break;
//             case 'effect':      newBG['effect']                     = action.payload;       break;
//             case 'effect_type': newBG['effect']['type']             = action.payload;       break;
//             case 'effect_arg':  newBG['effect'][action.payload.arg] = action.payload.value; break;
//             case 'header':      newBG['header']                     = action.payload;       break;
//             case 'header_type': newBG['header']['type']             = action.payload;       break;
//             case 'header_arg':  newBG['header'][action.payload.arg] = action.payload;       break;
//             case 'footer':      newBG['footer']                     = action.payload;       break;
//             case 'footer_type': newBG['footer']['type']             = action.payload;       break;
//             case 'footer_arg':  newBG['footer'][action.payload.arg] = action.payload.value; break;
//             default: throw new Error(`BackgroundProvider: Unrecognized dispatch field ${action.type}`);
//         }
        
//         // Build global state with our new object.
//         // Exclude first and last pages in alternation if necessary
//         let start   = old.schema === 'alternating' ?       0 : 1;
//         const end   = old.schema === 'alternating' ? sections-1 : sections-2;
//         switch (action.object) {
//             // Handles setting first section
//             case 0: case 'first': {
//                 newState[0] = newBG;
//                 newState['first'] = newBG;
//                 return newState;
//             }
//             // Handles setting middle sections
//             case 1: case 'middle': {
//                 newState[1] = newBG;
//                 newState['middle'] = newBG;
//                 return newState;
//             }
//             // Handles setting last section
//             case -1: case 'last': case sections-1: {
//                 newState[-1] = newBG;
//                 newState['last'] = newBG;
//                 newState[sections - 1] = newBG;
//                 return newState;
//             }
//             // Handles setting odd-numbered sections
//             case 'odd': {
//                 for (let i = start; i < end; i++) {
//                     if (i % 2 === 1) {
//                         newState[i] = newBG;
//                     }
//                 }
//                 return newState;
//             }
//             // Handles setting even-numbered sections
//             case 'even': {
//                 // Exclude first and last pages in alternation if necessary
//                 start = old.schema === 'alternating' ? 1 : 2;
//                 for (let i = start; i < end; i++) {
//                     if (i % 2 === 0) {
//                         newState[i] = newBG; 
//                     }
//                 }
//                 return newState;
//             }
//             // Handles setting specific sections by index
//             default: {
//                 newState[action.object] = newBG;
//                 return newState;
//             }
//         }
//     }, mergeSavedWithPreset());

//     const provide = { state, dispatch };
//     return (
//         <BackgroundContext.Provider value={provide}>
//             {children}
//         </BackgroundContext.Provider>
//     );

// }
BackgroundProvider.propTypes = {
    children: PropTypes.node,
    sections: PropTypes.number,
    sectionNumber: PropTypes.number,
};
BackgroundProvider.defaultProps = {
    sections: 6,
    sectionNumber: 0,
};
export const useSchema = () => {
    const { state, dispatch } = useContext(BackgroundContext);
    return [
        state.schema,
        useCallback((v) => dispatch({ field: 'schema', payload: v }), [dispatch]),
    ];
};