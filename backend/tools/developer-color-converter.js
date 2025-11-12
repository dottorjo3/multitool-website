// 🔧 File: backend/tools/developer-color-converter.js
// 🔗 Converte colori tra HEX, RGB e HSL

function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  if (![3, 6].includes(cleaned.length)) {
    throw new Error('HEX non valido');
  }
  const normalized = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;
  const num = parseInt(normalized, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (value) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl({ r, g, b }) {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case nr:
        h = (ng - nb) / d + (ng < nb ? 6 : 0);
        break;
      case ng:
        h = (nb - nr) / d + 2;
        break;
      case nb:
        h = (nr - ng) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb({ h, s, l }) {
  const hh = h / 360;
  const ss = s / 100;
  const ll = l / 100;

  let r;
  let g;
  let b;

  if (ss === 0) {
    r = g = b = ll;
  } else {
    const hue2rgb = (p, q, t) => {
      let tt = t;
      if (tt < 0) tt += 1;
      if (tt > 1) tt -= 1;
      if (tt < 1 / 6) return p + (q - p) * 6 * tt;
      if (tt < 1 / 2) return q;
      if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
      return p;
    };

    const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
    const p = 2 * ll - q;
    r = hue2rgb(p, q, hh + 1 / 3);
    g = hue2rgb(p, q, hh);
    b = hue2rgb(p, q, hh - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function parseRgb(input) {
  const match = input.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i);
  if (!match) {
    throw new Error('Formato RGB non valido');
  }
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

function parseHsl(input) {
  const match = input.match(/hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)/i);
  if (!match) {
    throw new Error('Formato HSL non valido');
  }
  return {
    h: Number(match[1]),
    s: Number(match[2]),
    l: Number(match[3]),
  };
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim();
    const mode = params.mode || 'auto';

    if (!input) {
      throw new Error('Inserisci un colore da convertire');
    }

    let baseRgb;
    let detectedMode = mode;

    try {
      if (mode === 'auto' || mode === 'hex') {
        baseRgb = hexToRgb(input);
        detectedMode = 'hex';
      }
    } catch (error) {
      if (mode === 'hex') {
        throw error;
      }
    }

    if (!baseRgb) {
      try {
        if (mode === 'auto' || mode === 'rgb') {
          baseRgb = parseRgb(input);
          detectedMode = 'rgb';
        }
      } catch (error) {
        if (mode === 'rgb') {
          throw error;
        }
      }
    }

    if (!baseRgb) {
      try {
        if (mode === 'auto' || mode === 'hsl') {
          baseRgb = hslToRgb(parseHsl(input));
          detectedMode = 'hsl';
        }
      } catch (error) {
        if (mode === 'hsl') {
          throw error;
        }
      }
    }

    if (!baseRgb) {
      throw new Error('Impossibile interpretare il colore fornito');
    }

    const hex = rgbToHex(baseRgb);
    const hsl = rgbToHsl(baseRgb);

    return {
      detectedMode,
      hex,
      rgb: baseRgb,
      hsl,
    };
  },
};


