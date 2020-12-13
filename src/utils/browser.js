import { capitalize } from '@utils/text';
import { defaultTheme, presets } from '@utils/themes';
import { debug } from '../App';

export function getPresetFromURL() {
    // Try to load theme from URL preset
    let params = (new URL(document.location)).searchParams;
    let presetStr = params.get('preset');
    let presetObj;
    if (presetStr) {
      presetObj = presets[capitalize(presetStr)] ? 
        presets[capitalize(presetStr)] : 
        defaultTheme;
    } else { presetObj = defaultTheme; }
    if (debug) {
      console.log(
        "--------PRESETS---------",
        "\nString:", presetStr,
        "\nObject:", presetObj,
        "\n--------PRESETS---------"
      );
    }
    return presetObj;
}

export const setManifestColors = (color, bg_color) => {
    // if (debug) { console.log("Updating manifest colors...", "\nFG Color:", color, "\nBG Color:", bg_color)}
    return {
      "short_name": "Sam Lehman",
      "name": "Sam Lehman | Software Dev",
      "description": "I am a software developer. My name is Sam. This is my website.",
      "icons": [
        {
          "src": "/favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        },
        {
            "src": "/sam_head.png",
            "size": "1024x1024",
            "type": "image"
        }
      ],
      "scope": "https://samlehman.me",
      "start_url": "https://samlehman.me",
      "display": "standalone",
      "theme_color": color == null ? "#000000" : color,
      "background_color": bg_color == null ? "#fff" : bg_color
    };
};
export const setManifest = (manifest_json) => {
    const stringManifest = JSON.stringify(manifest_json);
    const blob = new Blob([stringManifest], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(blob);
    var linkTag = document.querySelector('#app-manifest');
    if (linkTag.getAttribute('href')) linkTag.removeAttribute('href');
    linkTag.setAttribute('href', manifestURL);
    if (debug) {
        console.log(
            "--------MANIFEST--------",
            "\nUpdating manifest...",
            "\n  Theme Color:", manifest_json["theme_color"],
            "\n   Background:", manifest_json["background_color"],
            "\n         JSON:", manifest_json,
            "\n       String:", stringManifest,
            "\n         Blob:", blob,
            "\n          URL:", manifestURL,
            "\n     Link Tag:", linkTag,
            "\nManifest updated.",
            "\n--------MANIFEST--------"
        );
    }
};

export default {getPresetFromURL, setManifest, setManifestColors};