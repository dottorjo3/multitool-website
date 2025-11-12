// 🔧 File: backend/tools/developer-css-color-parser.js
// 🔗 Analizza colori CSS (HEX, RGB, HSL) e restituisce conversioni utili

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function hexToRgb(hex) {
  const sanitized = hex.replace('#', '');
  if (![3, 6].includes(sanitized.length)) {
    throw new Error('Colore HEX non valido');
  }
  const normalized = sanitized.length === 3
    ? sanitized.split('').map((c) => c + c).join('')
    : sanitized;
  const intVal = parseInt(normalized, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
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
  const hh = clamp(h, 0, 360) / 360;
  const ss = clamp(s, 0, 100) / 100;
  const ll = clamp(l, 0, 100) / 100;

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
    throw new Error('Formato RGB non valido (usa rgb(r, g, b))');
  }
  return {
    r: clamp(Number(match[1]), 0, 255),
    g: clamp(Number(match[2]), 0, 255),
    b: clamp(Number(match[3]), 0, 255),
  };
}

function parseHsl(input) {
  const match = input.match(/hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)/i);
  if (!match) {
    throw new Error('Formato HSL non valido (usa hsl(h, s%, l%))');
  }
  return {
    h: clamp(Number(match[1]), 0, 360),
    s: clamp(Number(match[2]), 0, 100),
    l: clamp(Number(match[3]), 0, 100),
  };
}

function lightenColor({ h, s, l }, amount) {
  return { h, s, l: clamp(l + amount, 0, 100) };
}

function darkenColor({ h, s, l }, amount) {
  return { h, s, l: clamp(l - amount, 0, 100) };
}

module.exports = {
  async run({ params }) {
    const input = params.color?.trim();
    if (!input) {
      throw new Error('Inserisci un colore in formato HEX, RGB o HSL');
    }

    let rgb;
    let hsl;
    let hex;

    if (input.startsWith('#')) {
      rgb = hexToRgb(input);
      hex = input.toUpperCase();
      hsl = rgbToHsl(rgb);
    } else if (input.toLowerCase().startsWith('rgb')) {
      rgb = parseRgb(input);
      hex = rgbToHex(rgb);
      hsl = rgbToHsl(rgb);
    } else if (input.toLowerCase().startsWith('hsl')) {
      hsl = parseHsl(input);
      rgb = hslToRgb(hsl);
      hex = rgbToHex(rgb);
    } else {
      rgb = hexToRgb(input);
      hex = rgbToHex(rgb);
      hsl = rgbToHsl(rgb);
    }

    const lighten = lightenColor(hsl, 10);
    const darken = darkenColor(hsl, 10);

    return {
      input,
      normalized: {
        hex,
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      },
      channels: {
        rgb,
        hsl,
      },
      palette: {
        lighten: {
          hsl: `hsl(${lighten.h}, ${lighten.s}%, ${lighten.l}%)`,
          rgb: hslToRgb(lighten),
          hex: rgbToHex(hslToRgb(lighten)),
        },
        darken: {
          hsl: `hsl(${darken.h}, ${darken.s}%, ${darken.l}%)`,
          rgb: hslToRgb(darken),
          hex: rgbToHex(hslToRgb(darken)),
        },
      },
    };
  },
};



