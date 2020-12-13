import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    // useState,
} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {
    ThemeProvider as MuiThemeProvider,
    // capitalize,
    createMuiTheme,
    responsiveFontSizes,
    useMediaQuery,
} from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import * as presets from '../themes';
import highDensity from '../options/density/high';
import { languageMap } from '../options/languages';
import { usePreset } from './PresetContext';
const defaultPreset = presets['Default'];

// Create a new context type for themes
export const ThemeContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});
export const ColorContext = createContext(() => {
    throw new Error('Forgot to wrap component in `ColorProvider`');
});
export const DirectionContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `DirectionProvider`');
});
// export const PresetContext = React.createContext(() => {
//   throw new Error('Forgot to wrap component in `PresetProvider`');
// });
export const PaperContext = React.createContext(() => {
    throw new Error('Forgot to wrap component in `PaperProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'ThemeDispatchContext';
  DirectionContext.displayName = 'DirectionDispatchContext';
  // PresetContext.displayName = 'PresetDispatchContext';
}

// const useEnhancedEffect = typeof window === 'undefined' ? useEffect : React.useLayoutEffect;

/**
 * Builds object to initialize ThemeProvider with.
 * @param {boolean} usePreset Use the preset 'presetName' or not.
 * @param {string} presetName Name of the preset to build values from.
 */
const getInitialValues = (usePreset, presetName) => {
    let themeValues;
    if (usePreset) {
        // Use only values from default preset.
        if (presetName === 'None') {
            console.log("ThemeContext: Using default preset.");
            themeValues = presets['Default'];
        // Use only values from selected preset.
        } else {
            console.log("ThemeContext: Using values from preset", presetName);
            themeValues = presets[presetName];
        }
    } else {
        // Use only values stored in cookie.
        if (presetName === 'None') {
            console.log("ThemeContext: Using theme values from cookie.");
            themeValues = Cookies.getJSON("theme");
        // Merge cookie values with default.
        } else {
            console.log("ThemeContext: Using values from merge of cookie and preset", presetName);
            themeValues = { ...presets[presetName], ...Cookies.getJSON("theme") };
        }
    }
    console.log("ThemeContext:", themeValues);
    return themeValues;
};

/**
 * Builds a palette color given a base hue and shade.
 * @param {string} hue Base hue to build from.
 * @param {string} shade Base shade to build from.
 * @param {float} opacity Opacity to use for transparent colors from [0.0, 1.0]
 */
const buildColor = (hue, shade, opacity) => {
    const main = colors[hue][shade];
    return {
        main,
        transparent: main + (opacity * 255).toString(16),
    };
};

/**
 * 1. Breakpoints
 * 2. Direction
 * 3. Mixins
 * 4. Palette
 * 5. Shadows
 * 6. Typography
 * 7. Spacing
 * 8. Shape
 * 9. Transitions
 * 10. zIndex
 * -------------------
 * A. PaletteType
 * B. PaletteColors
 * C. PaperTypes
 *   - Material
 *   - Transparency
 *   - Blur
 * D. Density
 * E. Spacing
 * F. Backgrounds
 * G. Languages
 * @param {node} props.children Child components to render with access to the theme.
 * @param {string} props.defaultThemeName The name to select the default theme.
 */
export function ThemeProvider(props) {
    const { children,
        // defaultThemeName
    } = props;

    // Use preset to select other values
    const [presetUse, presetName, setUsePreset, setPresetName] = usePreset();

    // Get the initial values using preset and cookies.
    const initialThemeValues = getInitialValues(presetUse, presetName);
    useEffect(() => {
        console.log("ThemeContext:",
            "\nPresetUse = ", presetUse,
            "\nPresetName = ", presetName
        );
        if (presetUse) {
            Cookies.set("theme", presets[presetName]);
        } else {
            Cookies.set("theme", {...Cookies.getJSON("theme"), ...presets[presetName]})
        }
        // Cookies.set("theme", getInitialValues(presetUse, presetName));
    }, [presetUse, presetName]);
    // console.log("Init paletteColors:", initialThemeValues.paletteColors);

    const [themeValues, dispatch] = useReducer((old, action) => {
        console.log("DISPATCH:", action.type, action.payload);
        switch (action.type) {
            case 'SET_PRESET': { setUsePreset(true); return presets[action.payload] || old; }
            case 'SET_PRESET_NAME': { setPresetName(action.payload); return presets[action.payload] || old; }
            // case 'SET_PRESET': { setUsePreset(true); setPresetName(action.payload); return presets[action.payload] || old; }
            case 'SET_MODE': return { ...old, paletteType: action.payload || old.paletteType };
            case 'SET_DENSE': return { ...old, dense: action.payload };
            case 'SET_SPACING': return { ...old, spacing: action.payload };
            case 'INCREASE_SPACING': return { ...old, spacing: old.spacing+1}
            case 'DECREASE_SPACING': return { ...old, spacing: old.spacing-1}
            case 'SET_BORDER_RADIUS': return { ...old, shape: { borderRadius: action.payload } };
            case 'INCREASE_BORDER_RADIUS': return { ...old, shape: { borderRadius: old.shape.borderRadius+2 } };
            case 'DECREASE_BORDER_RADIUS': return { ...old, shape: { borderRadius: old.shape.borderRadius-2 } };
            case 'SET_PAPER': return { ...old, paper: action.payload };
            case 'SET_MATERIAL': return { ...old, paper: { ...old.paper, material: action.payload } };
            case 'SET_ELEVATION': return { ...old, paper: { ...old.paper, elevation: action.payload } };
            case 'SET_OPACITY': return { ...old, paper: { ...old.paper, opacity: action.payload } };
            case 'SET_BLUR': return { ...old, paper: { ...old.paper, blur: action.payload } };
            case 'SET_PRIMARY_COLOR': return {
                ...old,
                paletteColors: {
                    ...old.paletteColors,
                    primary: action.payload,
                },
            };
            case 'SET_PRIMARY_HUE': return {
                ...old,
                paletteColors: {
                    ...old.paletteColors,
                    primary: {
                        ...old.paletteColors.primary,
                        hue: action.payload, 
                    },
                },
            };
            case 'SET_PRIMARY_SHADE': return {
                ...old,
                paletteColors: {
                    ...old.paletteColors,
                    primary: {
                        ...old.paletteColors.primary,
                        shade: action.payload,
                    },
                },
            };
            case 'SET_SECONDARY_COLOR': return {
                ...old,
                paletteColors: {
                    ...old.paletteColors,
                    secondary: action.payload,
                },
            };
            case 'SET_SECONDARY_HUE': return {
                ...old,
                paletteColors: {
                    ...old.paletteColors,
                    secondary: {
                        ...old.paletteColors.secondary,
                        hue: action.payload,
                    },
                },
            };
            case 'SET_SECONDARY_SHADE': return {
                ...old,
                paletteColors: {
                    ...old.paletteColors,
                    secondary: {
                        ...old.paletteColors.secondary,
                        shade: action.payload,
                    },
                },
            };
            case 'SET_PAPER_COLOR': return { ...old, paletteColors: { ...old.paletteColors, paper: action.payload } };
            case 'SET_BACKGROUND_COLOR': return { ...old, paletteColors: { ...old.paletteColors, background: action.payload } };
            default: throw new Error(`Unrecognized type ${action.type}`);
        }
    }, initialThemeValues);

    // Store changes to theme in cookie.
    useMemo(() => {
        Cookies.set("theme", themeValues);
    }, [themeValues]);

    // Destructure state object into variables so we can use them.
    const {
        // backgrounds,
        dense,
        direction,
        language,
        paletteType,
        paletteColors,
        paper,
        shape,
        spacing,
        text,
    } = themeValues;


    // Build theme object
    const systemMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
    const mode = paletteType === 'system' ? systemMode : paletteType;
    const primaryHue = paletteColors.primary ? paletteColors.primary.hue : defaultPreset.paletteColors.primary.hue;
    const secondaryHue = paletteColors.secondary ? paletteColors.secondary.hue : defaultPreset.paletteColors.secondary.hue;
    const primaryShade = paletteColors.primary ? paletteColors.primary.shade : defaultPreset.paletteColors.primary.shade;
    const secondaryShade = paletteColors.secondary ? paletteColors.secondary.shade : defaultPreset.paletteColors.secondary.shade;
    console.log(
        "Primary:  ", primaryHue, primaryShade, colors[primaryHue][primaryShade],
        "Secondary:", secondaryHue, secondaryShade, colors[secondaryHue][secondaryShade],
    );
    const palette = useMemo(() => {
        return {
            type: mode,
            primary: buildColor(primaryHue, primaryShade, paper.opacity),
            secondary: buildColor(secondaryHue, secondaryShade, paper.opacity),
        }
    }, [mode, primaryHue, primaryShade, paper.opacity, secondaryHue, secondaryShade]);

    console.log("palette", palette);

    // Build Material-UI theme from theme object
    const theme = useMemo(() => {
        const nextTheme = createMuiTheme({
            direction,
            // nprogress: {},
            palette,
            shape,
            spacing,
            typography: text.font,
        },
            paper,
            dense ? highDensity : null,
            languageMap[language],
        );
        return nextTheme;
    }, [
        dense,
        direction,
        text,
        language,
        palette,
        paper,
        shape,
        spacing,
    ]);

    return (
        <MuiThemeProvider theme={responsiveFontSizes(theme)}>
            <ThemeContext.Provider value={[themeValues, dispatch]}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
};
ThemeProvider.propTypes = {
    children: PropTypes.node,
    defaultThemeName: PropTypes.string,
};
ThemeProvider.defaultProps = {
    defaultThemeName: 'default',
};
// export function usePreset() {
//     const [theme, dispatch] = useContext(ThemeContext);
//     return [theme.name, useCallback((v) => {
//         // console.log(
//         //     "Setting preset...", v,
//         //     "\ntheme:", theme,
//         //     "\ndispatch:", dispatch,
//         //     "\npreset:", theme.name
//         // );
//         dispatch({ type: 'SET_PRESET', payload: v });
//     }, [dispatch])];
// };
export function useThemeMode() {
    const [theme, dispatch] = useContext(ThemeContext);
    // console.log("context:", useContext(ThemeContext), "\ndispatch:", dispatch, "\ntheme:", theme);
    return [
        theme.paletteType,
        useCallback((v) => dispatch({ type: 'SET_MODE', payload: v }), [dispatch])
    ];
};
export function useDensity() {
    const [theme, dispatch] = useContext(ThemeContext);
    // console.log(
    //     "Setting density...",
    //     "\ncontext:", useContext(ThemeContext),
    //     "\ntheme:", theme,
    //     "\ndispatch:", dispatch,
    //     "\ndense:", theme.dense
    // );
    return [theme.dense, useCallback((v) => dispatch({ type: 'SET_DENSE', payload: v }), [dispatch])];
};
export function useSpacing() {
    const [theme, dispatch] = useContext(ThemeContext);
    return [
        theme.spacing,
        useCallback((v) => dispatch({ type: 'SET_SPACING', payload: v }), [dispatch]),
        useCallback(() => dispatch({ type: 'INCREASE_SPACING' }), [dispatch]),
        useCallback(() => dispatch({ type: 'DECREASE_SPACING' }), [dispatch]),
    ];
};
export function useShape() {
    const [theme, dispatch] = useContext(ThemeContext);
    return [
        theme.shape.borderRadius,
        useCallback((v) => dispatch({ type: 'SET_BORDER_RADIUS', payload: v }), [dispatch]),
        useCallback(() => dispatch({ type: 'INCREASE_BORDER_RADIUS' }), [dispatch]),
        useCallback(() => dispatch({ type: 'DECREASE_BORDER_RADIUS' }), [dispatch]),
    ];
};
export function usePaper() {
    const [theme, dispatch] = useContext(ThemeContext);
    // console.log("context:", useContext(ThemeContext), "\ndispatch:", dispatch, "\ntheme:", theme);
    return [
        theme.paper,
        useCallback((v) => dispatch({ type: 'SET_PAPER', payload: v }), [dispatch]),
        useCallback((v) => dispatch({ type: 'SET_MATERIAL', payload: v }), [dispatch]),
        useCallback((v) => dispatch({ type: 'SET_ELEVATION', payload: v }), [dispatch]),
        useCallback((v) => dispatch({ type: 'SET_OPACITY', payload: v }), [dispatch]),
        useCallback((v) => dispatch({ type: 'SET_BLUR', payload: v }), [dispatch]),

    ];
};
export function usePaletteColors(variant) {
    const [theme, dispatch] = useContext(ThemeContext);
    console.log(
        "usePaletteColors("+variant+"):", theme.paletteColors[variant],
        theme.paletteColors,
    );
    return [
        theme.paletteColors[variant],
        useCallback((hue, shade) => dispatch({ type: `SET_${variant.toUpperCase()}_COLOR`, payload: { hue, shade } }), [variant, dispatch]),
    ];
};
export function usePrimaryColor() {
    const [theme, dispatch] = useContext(ThemeContext);
    console.log(
        "usePaletteColors(primary):", theme.paletteColors['primary'],
        theme.paletteColors,
    );
    return [
        theme.paletteColors['primary'],
        useCallback((hue, shade) => dispatch({ type: `SET_PRIMARY_COLOR`, payload: { hue, shade } }), [dispatch]),
        useCallback((hue) => dispatch({type: 'SET_PRIMARY_HUE', payload: hue}), [dispatch]),
        useCallback((shade) => dispatch({type: 'SET_PRIMARY_SHADE', payload: shade}), [dispatch])
    ];
};
export function useSecondaryColor() {
    const [theme, dispatch] = useContext(ThemeContext);
    console.log(
        "usePaletteColors(secondary):", theme.paletteColors['secondary'],
        theme.paletteColors,
    );
    return [
        theme.paletteColors['secondary'],
        useCallback((hue, shade) => dispatch({ type: `SET_SECONDARY_COLOR`, payload: { hue, shade } }), [dispatch]),
        useCallback((hue) => dispatch({type: 'SET_SECONDARY_HUE', payload: hue}), [dispatch]),
        useCallback((shade) => dispatch({type: 'SET_SECONDARY_SHADE', payload: shade}), [dispatch])
    ];
}