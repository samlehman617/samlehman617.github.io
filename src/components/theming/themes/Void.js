// export default {
const voidTheme = {
    name: 'Void',
    schema: 'uniform',
    background: {
        schema: 'alternate',
        global: {
            base: 'backgroundColor',
            effect: 'snow',
            header: 'none',
            footer: 'wave',
        },
        sections: [{
            base: 'backgroundColor',
            effect: 'none',
            header: 'none',
            footer: 'none',
        }, {
            base: 'backgroundColor',
            effect: 'none',
            header: 'none',
            footer: 'none',
        }]
    },
    dense: true,
    direction: 'ltr',
    paletteType: 'dark',
    paletteColors: {
        primary: {
            hue: 'yellow',
            shade: 500,
        },
        secondary: {
            hue: 'purple',
            shade: 500,
        },
        background: '#000000',
    },
    paper: {
        material: 'Paper',
        elevation: 8,
        opacity: 0.90,
        blur: 4,
    },
    shape: { borderRadius: 4 },
    spacing: 8,
    text: {
        font: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
        },
        effect: 'zalgo',
    },
};
export default voidTheme;