import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { PresetContext } from './PresetContext';
import * as presets from '../components/theming/themes';
// import { debug } from '../../App';
const defaultPreset = presets['Default'];

// Set initial options
// export const initialPaper = {
    // elevation: 8,
    // material: 'paper',
    // opacity: 1.0,
    // blurRadius: 20,
    // borderWidth: 0,
    // borderColor: '#ffffff',
    // borderRadius: 8,
// };

export const PaperContext = React.createContext(() => {
    throw new Error('Forgot to wrap component in `PaperProvider`');
});
  
if (process.env.NODE_ENV !== 'production') {
    PaperContext.displayName = 'PaperDispatchContext';
}
  
// const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
  
const getInitial = (active, name) => {
    if (active) {
        console.log("PaperContext:\nInitial from preset", name);
        return presets[name] ? presets[name].paper : null || defaultPreset.paper;
    } else if (process.browser && Cookies.getJSON("paper")) {
        console.log("PaperContext:\nInitial from cookie");
        return Cookies.getJSON("paper");
    } else {
        console.log("PaperContext:\nInitial from default");
        return presets['Default'].paper;
    }
}

/**
 * Provides the paper settings for the application.
 */
export function PaperProvider(props) {
    const { children } = props;
    const [ presetActive, presetName, setPresetActive, setPresetName ] = React.useContext(PresetContext);

  
    const [paper, setPaper] = React.useReducer((state, action) => {
        //   setPresetActive(false);
      switch (action.type) {
        case 'SET_ELEVATION':           return {elevation:    action.payload || state.elevation   };
        case 'SET_HOVER_EFFECT':        return {hoverEffect:  action.payload || state.hoverEffect };
        case 'SET_MATERIAL':            return {material:     action.payload || state.material    };
        case 'SET_OPACITY':             return {opacity:      action.payload || state.opacity     };
        case 'INCREASE_OPACITY':        return {opacity:      state.opacity + 1                   };
        case 'DECREASE_OPACITY':        return {opacity:      state.opacity - 1                   };
        case 'SET_BLUR_RADIUS':         return {blurRadius:   action.payload || state.borderRadius};
        case 'INCREASE_BLUR_RADIUS':    return {blurRadius:   state.blurRadius + 1                };
        case 'DECREASE_BLUR_RADIUS':    return {blurRadius:   state.blurRadius - 1                };
        case 'SET_BORDER_RADIUS':       return {borderRadius: action.payload || state.borderRadius};
        case 'INCREASE_BORDER_RADIUS':  return {borderRadius: state.borderRadius + 1              };
        case 'DECREASE_BORDER_RADIUS':  return {borderRadius: state.borderRadius - 1              };
        case 'SET_BORDER_WIDTH':        return {borderWidth:  action.payload || state.borderWidth };
        case 'INCREASE_BORDER_WIDTH':   return {borderWidth:  state.borderWidth + 1               };
        case 'DECREASE_BORDER_WIDTH':   return {borderWidth:  state.borderWidth - 1               };
        case 'CHANGE': return {
          elevation:    action.payload.elevation    || state.elevation,
          hoverEffect:  action.payload.hoverEffect  || state.hoverEffect,
          material:     action.payload.material     || state.material,
          opacity:      action.payload.opacity      || state.opacity,
          blurRadius:   action.payload.blurRadius   || state.blurRadius,
          borderRadius: action.payload.borderRadius || state.borderRadius,
          borderWidth:  action.payload.borderWidth  || state.borderWidth,
        }
        default: throw new Error(`PaperProvider action: Unrecognized type ${action.type}`);
      }
    }, getInitial(presetActive, presetName));
  
    // const { elevation, hoverEffect, material, opacity, blurRadius, borderRadius, borderWidth } = options;
  
    // Load initial settings from cookie
    // useEffect(() => {if (process.browser) dispatch({type: 'CHANGE', payload: Cookies.getJSON('paper')})}, []);
  
    // Persist settings in cookie on change
    React.useEffect(() => { Cookies.set("paper", paper)}, [paper])
  
    const changePaper = React.useCallback((v) => {
        console.log("PaperContext: setting to", v);
        setPaper({ type: 'CHANGE', payload: v });
    }, [setPaper]);

    return (
        <PaperContext.Provider value={[ paper, changePaper ]}>
          {children}
        </PaperContext.Provider>
    );
};
PaperProvider.propTypes = {
    children: PropTypes.node,
};

// const debugPaper = () => {
    // console.group("PaperContext");
// }

// const useGlass = makeStyles((theme: Theme) => createStyles({
// 
// }))

// const opacity2alpha = decimal => Math.floor(decimal * 255).toString(16);

// Overrides for making Paper Material-UI components look like glass
// const glassMaterial = useCallback((paperColor, paletteColors) => ({
// const glassMaterial = (paperSettings, colors) => {
//     const {
//         // elevation, material,
//         opacity, blurRadius, borderWidth
//     } = paperSettings
//     const { primary, secondary, paper, background } = colors;

//     return {
//         overrides: {
//             MuiPaper: {
//                 root: {
//                     borderColor: paper,
//                     borderStyle: 'solid',
//                     borderWidth: borderWidth,

//                     backgroundColor: paper + opacity2alpha(opacity),
//                     backdropFilter: `blur(${blurRadius}px)`,


//                     // border: `1px solid ${paperColor+"90"}`,
//                     // backdropFilter: 'blur(20px)',
//                     // backgroundColor: `${paperColor+"50"}`,
//                     // borderColor: paperColor+"90",
//                 },
//             },
//             MuiAppBar: {
//                 root: {
//                     borderColor: paper + opacity2alpha(opacity), // opacity + some value? Less transparent than bg?
//                     borderStyle: 'none',
//                     borderBottomStyle: 'solid',
//                     borderWidth: borderWidth,

//                     backgroundColor: paper + opacity2alpha(opacity),
//                     backdropFilter: `blur(${blurRadius}px)`,

//                     // border: 'none',
//                     // borderBottom: `1px solid ${paperColor}`,
//                     // backdropFilter: 'blur(20px)',
//                     // backgroundColor: `${paperColor+"50"}`,
//                     // borderColor: paperColor,
//                 }
//             },
//             MuiButton: {
//                 containedPrimary: {
//                     borderColor: primary.concat(opacity2alpha(opacity)),
//                     borderStyle: 'solid',
//                     borderWidth: borderWidth,

//                     backgroundColor: background.concat(opacity2alpha(opacity)),

//                     // border: `1px solid ${paletteColors.primary ? paletteColors.primary.main+"60" : paletteColors.primary+"60"}`,
//                     // backgroundColor: paletteColors.primary ? paletteColors.primary.main+"60" : paletteColors.primary+"60",

//                 },
//                 containedSecondary: {
//                     borderColor: secondary.concat(opacity2alpha(opacity)),
//                     borderStyle: 'solid',
//                     borderWidth: borderWidth,

//                     backgroundColor: secondary.concat(opacity2alpha(opacity)),

//                     // border: `1px solid ${paletteColors.secondary ? paletteColors.secondary.main+"60" : paletteColors.secondary+"60"}`,
//                     // backgroundColor: paletteColors.secondary ? paletteColors.secondary.main+"60" : paletteColors.secondary+"60",
//                 }
//             },
//             MuiFab: {
//                 root: {
//                     backdropFilter: `blur(${blurRadius}px)`,
//                     // backdropFilter: 'blur(20px)',
//                 }
//             }
//         },
//     }

//     // }), []);
// };

// const glassMaterialDark = glassMaterial('#282828');
// const glassMaterialLight = glassMaterial('#ffffff');

// Custom hooks for controlling paper settings from components.
// export function useChangePaperElevation() {
//     const dispatch = useContext(PaperContext);
//     return useCallback((elevation) => dispatch({ 
//         type: 'SET_ELEVATION', 
//         payload: elevation
//     }), [dispatch] );
// };
// export function useChangePaperColor() {
//     const dispatch = useContext(PaperContext);
//     return useCallback((color) => dispatch({
//         type: 'SET_COLOR',
//         payload: color
//     }), [dispatch] );
// };
// export function useChangePaperHoverEffect() {
//     const dispatch = useContext(PaperContext);
//     return useCallback((effect) => dispatch({
//         type: 'SET_HOVER_EFFECT',
//         payload: effect
//     }), [dispatch] );
// };
// export function useChangePaperMaterial() {
//     const dispatch = useContext(PaperContext);
//     return useCallback((material) => dispatch({
//         type: 'SET_MATERIAL',
//         payload: material
//     }), [dispatch] );
// };
// // Opacity hooks
// export function useChangePaperOpacity() {
//     const dispatch = useContext(PaperContext);
//     return useCallback((opacity) => dispatch({
//         type: 'SET_OPACITY',
//         payload: opacity
//     }), [dispatch] );
// };
// export function useIncreasePaperOpacity() {
//     const dispatch = useContext(PaperContext);
//     return useCallback(() => dispatch({
//         type: 'INCREASE_OPACITY'
//     }), [dispatch] );
// };
// export function useDecreasePaperOpacity() {
//     const dispatch = useContext(PaperContext);
//     return useCallback(() => dispatch({
//         type: 'DECREASE_OPACITY'
//     }), [dispatch] );
// };
// // Blur radius hooks.
// export function useChangePaperBlurRadius() {
//     const dispatch = useContext(PaperContext);
//     return useCallback((radius) => dispatch({
//         type: 'SET_BLUR_RADIUS',
//         payload: radius
//     }), [dispatch] );
// };
// export function useIncreasePaperBlurRadius() {
//     const dispatch = useContext(PaperContext);
//     return useCallback(() => dispatch({
//         type: 'INCREASE_BLUR_RADIUS'
//     }), [dispatch] );
// };
// export function useDecreasePaperBlurRadius() {
//     const dispatch = useContext(PaperContext);
//     return useCallback(() => dispatch({
//         type: 'DECREASE_BLUR_RADIUS'
//     }), [dispatch] );
// };
// // Border radius hooks.
// export function useChangePaperBorderRadius() {
//     const dispatch = useContext(PaperContext);
//     return useCallback((borderRadius) => dispatch({
//         type: 'SET_BORDER_RADIUS',
//         payload: borderRadius
//     }), [dispatch] );
// };
// export function useIncreasePaperBorderRadius() {
//     const dispatch = useContext(PaperContext);
//     return useCallback(() => dispatch({
//         type: 'INCREASE_BORDER_RADIUS'
//     }), [dispatch] );
// };
// export function useDecreasePaperBorderRadius() {
//     const dispatch = useContext(PaperContext);
//     return useCallback(() => dispatch({
//         type: 'DECREASE_BORDER_RADIUS'
//     }), [dispatch] );
// };