import React, { 
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
 } from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  useTheme,
  darken,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { enUS, zhCN, faIR, ruRU, ptBR, esES, frFR, deDE, jaJP } from '@material-ui/core/locale';
import { blue, pink } from '@material-ui/core/colors';

import { BackgroundProvider, BackgroundContext } from '../components/theming/BackgroundContext';
import { ColorProvider, ColorContext, initialColors } from '../components/theming/ColorContext';
import { DensityProvider, DensityContext } from '../components/theming/DensityContext';
import { FontProvider, FontContext } from '../components/theming/FontContext';
import { PaperProvider, PaperContext } from './PaperContext';

import { getCookie } from '../utils/helpers';

import { debug } from '../../../App';


const languageMap = {
  en: enUS,
  zh: zhCN,
  fa: faIR,
  ru: ruRU,
  pt: ptBR,
  es: esES,
  fr: frFR,
  de: deDE,
  ja: jaJP,
};

export const themeColor = blue[700];

const initialOptions = {
  dense: false,
  glass: true,
  direction: 'ltr',
  paletteColors: {},
  spacing: 8, // spacing unit
  background: {
    global: {
      base: "solid",
      effect: "hilbert",
      header: "none",
      footer: "none",
    }
  }
};

// Props & Overrides for high density theme
const highDensity = {
  props: {
    MuiButton:         {size:    'small'},
    MuiChip:           {size:    'small'},
    MuiFilledInput:    {margin:  'dense'},
    MuiFormControl:    {margin:  'dense'},
    MuiFormHelperText: {margin:  'dense'},
    MuiIconButton:     {size:    'small'},
    MuiInputBase:      {margin:  'dense'},
    MuiInputLabel:     {margin:  'dense'},
    MuiListItem:       {dense:   true},
    MuiOutlinedInput:  {margin:  'dense'},
    MuiFab:            {size:    'small'},
    MuiTable:          {size:    'small'},
    MuiTextField:      {margin:  'dense'},
    MuiToolbar:        {variant: 'dense'},
  },
  overrides: {
    MuiIconButton: {
      sizeSmall: {
        // minimal touch target hit spacing
        marginLeft: 4,
        marginRight: 4,
        padding: 12,
      },
    },
  },
};

// TODO: Move to util file.
const opacity2alpha = decimal => Math.floor(decimal * 255).toString(16);

export const DispatchContext = createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext';
}

const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function ThemeProvider(props) {
  const { children } = props;
  if (debug) console.group("ThemeContext");

  const [options, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_SPACING': return {...state, spacing: action.payload};
      case 'INCREASE_SPACING': return {...state, spacing: state.spacing + 1};
      case 'DECREASE_SPACING': return {...state, spacing: state.spacing - 1};
      case 'SET_DENSE': return {...state, dense: action.payload};
      case 'SET_GLASS': return {...state, glass: action.payload};
      case 'RESET_GLASS': return {...state, glass: initialOptions.glass};
      case 'RESET_DENSITY':
        return {
          ...state,
          dense: initialOptions.dense,
          spacing: initialOptions.spacing,
        };
      case 'RESET_COLORS': return {...state, paletteColors: initialOptions.paletteColors};
      case 'SET_PRIMARY':
        return {
          ...state,
          paletteColors: {
            ...state.paletteColors,
            // primary: theme.palette.augmentColor({ main: action.payload }),
            primary: action.payload,
          }
        };
      case 'SET_SECONDARY':
        return {
          paletteColors: {
            ...state.paletteColors,
            // secondary: theme.palette.augmentColor({ main: action.payload }),
            secondary: action.payload,
          }
        }
      case 'SET_PAPER': return {paletteColors: {...state.paletteColors, paper: action.payload}};
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType || state.paletteType,
          direction: action.payload.direction || state.direction,
          paletteColors: action.payload.paletteColors || state.paletteColors,
          backgroundGlobal: action.payload.backgroundGlobal || state.backgroundGlobal,
          backgroundLocal: action.payload.backgroundLocal || state.backgroundLocal,
        };
      default: throw new Error(`Unrecognized type ${action.type}`);
    }
  }, initialOptions);

  // const userLanguage = useSelector((state) => state.options.userLanguage);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredType = prefersDarkMode ? 'dark' : 'light';

  const { 
    dense, 
    direction, 
    paletteColors, 
    paletteType = preferredType, 
    spacing, 
    glass, 
    backgroundGlobal, 
    backgroundLocal 
  } = options;

  if (debug) console.log( "THEME CONTEXT: PALETTE", paletteColors );

  useEffect(() => {
    if (process.browser) {
      const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
      const nextPaletteType = getCookie('paletteType');

      dispatch({
        type: 'CHANGE',
        payload: { paletteColors: nextPaletteColors, paletteType: nextPaletteType },
      });
    }
  }, []);

  // Persist paletteType in cookie when paletteType changes
  useEffect(() => {
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;
  }, [paletteType]);

  // Persist paletteColors in cookie when paletteColors changes
  useEffect(() => {
    document.cookie = `paletteColors=${JSON.stringify(paletteColors)};path=/;max-age=31536000`;
  }, [paletteColors])
  

  // Change direction ltr <-> rtl
  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  // Overrides for making Paper Material-UI components look like glass
  const glassMaterial = useCallback((paperColor) => ({
    overrides: {
      MuiPaper: {
        root: {
          border: `1px solid ${paperColor+"90"}`,
          backdropFilter: 'blur(20px)',
          backgroundColor: `${paperColor+"50"}`,
          borderColor: paperColor+"90",
        },
      },
      MuiAppBar: {
        root: {
          border: 'none',
          borderBottom: `1px solid ${paperColor}`,
          backdropFilter: 'blur(20px)',
          backgroundColor: `${paperColor+"50"}`,
          borderColor: paperColor,
        }
      },
      MuiButton: {
        containedPrimary: {
          border: `1px solid ${paletteColors.primary ? paletteColors.primary.main+"60" : paletteColors.primary+"60"}`,
          backgroundColor: paletteColors.primary ? paletteColors.primary.main+"60" : paletteColors.primary+"60",
        },
        containedSecondary: {
          border: `1px solid ${paletteColors.secondary ? paletteColors.secondary.main+"60" : paletteColors.secondary+"60"}`,
          backgroundColor: paletteColors.secondary ? paletteColors.secondary.main+"60" : paletteColors.secondary+"60",
        },
      },
      MuiFab: {
        root: {
          backdropFilter: 'blur(20px)',
        }
      }
    },
  }),
    [paletteColors]
  );

  const glassMaterialDark = glassMaterial('#282828');
  const glassMaterialLight = glassMaterial('#ffffff');

  const background = useContext(BackgroundProvider);
  const colors = useContext(ColorProvider);
  const density = useContext(DensityProvider);
  const font = useContext(FontContext);
  const paper = useContext(PaperContext);
  console.group("ThemeContext");
  console.log("Background:", background);
  console.log("Colors:", colors);
  console.log("Density:", density);
  console.log("Font:", font);
  console.log("Paper:", paper);
  console.groupEnd();

  const glassProps = {

  }
  const glassStyles = {
    // props: {
    //   MuiPaper: {variant: 'outlined'}
    // },
    overrides: {
      MuiPaper: {
        root: {
          borderColor: colors.paper + opacity2alpha(paper.opacity),
          borderStyle: 'solid',
          borderWidth: paper.borderWidth,
          backgroundColor: colors.paper + opacity2alpha(paper.opacity),
          backdropFilter: `blur(${paper.blurRadius}px)`,
        },
      },
      MuiAppBar: {
        root: {
          borderColor: colors.paper + opacity2alpha(paper.opacity),
          borderStyle: 'none',
          borderBottomStyle: 'solid',
          borderWidth: paper.borderWidth,
          backgroundColor: colors.paper + opacity2alpha(paper.opacity),
          backdropFilter: `blur(${paper.blurRadius}px)`,
        }
      },
      MuiButton: {
        contained: {
          borderStyle: 'solid',
          borderWidth: paper.borderWidth,
          backdropFilter: `blur(${paper.blurRadius}px)`,
        },
        containedPrimary: {
          borderColor:     colors.primary + opacity2alpha(paper.opacity),
          backgroundColor: colors.primary + opacity2alpha(paper.opacity),
        },
        containedSecondary: {
          borderColor:     colors.secondary + opacity2alpha(paper.opacity),
          backgroundColor: colors.secondary + opacity2alpha(paper.opacity),
        }
      },
      MuiFab: {
        root: {
          backdropFilter: `blur(${paper.blurRadius}px)`,
        },
        primary: {
          backgroundColor: colors.primary + opacity2alpha(paper.opacity),
        },
        secondary: {
          backgroundColor: colors.secondary + opacity2alpha(paper.opacity),
        }
      }
    }
  }

  const theme = useMemo(() => {
    
    const nextTheme = createMuiTheme(
      {
        background: {
          global: backgroundGlobal,
          local: backgroundLocal,
        },
        direction,
        nprogress: {
          color: paletteType === 'light' ? '#000' : '#fff',
        },
        palette: {
          // background: {
          //   default: colors.background,
          //   paper: colors.paper,
          //   paperSolid: colors.paper,
          //   paperTransparent: color2hex(colors.paper) + inverseActivation(paper.opacity)
          //   colors.background,
          // 

          primary: blue,
          secondary: pink,
          // secondary: {
            // main: paletteType === 'light' ? darken(pink.A400, 0.1) : pink[200],
          // },
          type: paletteType,
          background: {
            default: paletteType === 'light' ? '#f5f5f5' : '#121212',
            paper: paletteType === 'light' ? glass ? '#ffffff50' : '#ffffff' : glass ? '#28282850' : '#282828',
            paperSolid: paletteType === 'light' ? '#ffffff' : '#282828',
            paperTransparent: paletteType === 'light' ? '#ffffff50' : '#28282850',
          },
          ...paletteColors,
        },
        spacing,
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Helvetica Neue"',
            'Roboto',
            '"Roboto Condensed"',
            '"Roboto Mono"', 
            '"Source Sans Pro"', 
            '"Baloo Bhaijaan"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ]
        },
      },
      {
        overrides: {
          MuiChip: {
            root: {
              backgroundColor: paletteType === 'light' ? glass ? '#f0f0f090' : '#f0f0f0' : glass ? '#32323290' : '#323232',
            },
          },
          MuiListItemIcon: {
            root: {
              minWidth: '40px',
            },
          },
          MuiSelect: {
            root: {
              display: 'flex',
            },
          },
        },
      },
      dense ? highDensity : null,
      glass ? glassMaterial : null,
      // languageMap[userLanguage],
    );

    nextTheme.palette.background.level2 =
      paletteType === 'light' ? nextTheme.palette.grey[100] : '#333';

    nextTheme.palette.background.level1 =
      paletteType === 'light' ? '#fff' : nextTheme.palette.grey[900];

    return nextTheme;
  }, [
      dense, 
      direction, 
      glass,
      paletteColors, 
      paletteType, 
      spacing, 
      backgroundGlobal,
      backgroundLocal,
      glassMaterial,

      background,
      colors,
      density,
      font,
      paper
    //   userLanguage
    ]);

  // Expose the theme as a global variable so people can play with it.
  useEffect(() => {
    if (process.browser) {
      window.theme = theme;
    }
  }, [theme]);
  if (debug) console.groupEnd();

  return (
    <ColorProvider>
    <MuiThemeProvider theme={theme}>
      {/* <ColorProvider> */}
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      {/* </ColorProvider> */}
    </MuiThemeProvider>
    </ColorProvider>    
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};


/**
 * Hook to change the theme settings.
 */
export function useChangeTheme() {
  const dispatch = useContext(DispatchContext);
  return useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}

// TODO: Implement backend
export function useChangePrimaryColor() {
  const dispatch = useContext(DispatchContext); 
  const theme = useTheme();
  return useCallback((options) => {
    if (debug) console.log("ChangePrimary:", options)
    dispatch({ 
      type: 'SET_PRIMARY', 
      payload: theme.palette.augmentColor({ main: options }) 
    });
  }, [ dispatch ] );
}
// TODO: Implement backend
export function useChangeSecondaryColor() {
  const dispatch = useContext(DispatchContext); 
  const theme = useTheme();
  return useCallback((options) => dispatch({ 
    type: 'SET_SECONDARY', 
    payload: theme.palette.augmentColor({main: options})
  }), [dispatch] );
}
// TODO: Implement backend
export function useChangePaperColor() {
  const dispatch = useContext(DispatchContext); 
  const theme = useTheme();
  return useCallback((options) => dispatch({ type: 'SET_PAPER', payload: options }), [dispatch] );
}

const CombinedContextProvider = ({ background, colors, density, font, paper }) => (
  <BackgroundProvider value={background}>
    <ColorProvider value={colors}>
      <DensityProvider value={density}>
        <FontProvider value={font}>
          <PaperProvider value={paper}>

          </PaperProvider>
        </FontProvider>
      </DensityProvider>
    </ColorProvider>
  </BackgroundProvider>
);