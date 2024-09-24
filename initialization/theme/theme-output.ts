type Theme = {
  background: string;
  surface: string;
  error: string;
  onError: string;
  primary: string;
  onBackground: string;
  onSecondary: string;
  onPrimary: string;
  onSurface: string;
  secondary: string;
  accentBackground: string;
  accentColor: string;
  background0: string;
  background025: string;
  background05: string;
  background075: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color0: string;
  color025: string;
  color05: string;
  color075: string;
  backgroundHover: string;
  backgroundPress: string;
  backgroundFocus: string;
  borderColor: string;
  borderColorHover: string;
  borderColorPress: string;
  borderColorFocus: string;
  color: string;
  colorHover: string;
  colorPress: string;
  colorFocus: string;
  colorTransparent: string;
  placeholderColor: string;
  outlineColor: string;

}

function t(a: [number, number][]) {
  let res: Record<string,string> = {}
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = vs[vi] as string
  }
  return res as Theme
}
const vs = [
  'hsla(0, 0%, 4%, 1)',
  'hsla(0, 0%, 11%, 1)',
  'hsla(0, 88%, 56%, 1)',
  'hsla(0, 0%, 100%, 1)',
  'hsla(72, 65%, 93%, 1)',
  'hsla(75, 13%, 72%, 1)',
  'hsla(24, 92%, 52%, 1)',
  'hsla(72, 65%, 93%, 0.75)',
  'hsla(72, 65%, 93%, 0.5)',
  'hsla(72, 65%, 93%, 0.25)',
  'hsla(72, 65%, 93%, 0)',
]

const ks = [
'background',
'surface',
'error',
'onError',
'primary',
'onBackground',
'onSecondary',
'onPrimary',
'onSurface',
'secondary',
'accentBackground',
'accentColor',
'background0',
'background025',
'background05',
'background075',
'color1',
'color2',
'color3',
'color4',
'color5',
'color6',
'color7',
'color8',
'color9',
'color10',
'color11',
'color12',
'color0',
'color025',
'color05',
'color075',
'backgroundHover',
'backgroundPress',
'backgroundFocus',
'borderColor',
'borderColorHover',
'borderColorPress',
'borderColorFocus',
'color',
'colorHover',
'colorPress',
'colorFocus',
'colorTransparent',
'placeholderColor',
'outlineColor']


const n1 = t([[0, 0],[1, 1],[2, 2],[3, 3],[4, 4],[5, 4],[6, 4],[7, 0],[8, 5],[9, 6],[10, 6],[11, 6],[12, 0],[13, 7],[14, 8],[15, 9],[16, 4],[17, 4],[18, 4],[19, 4],[20, 4],[21, 4],[22, 4],[23, 4],[24, 4],[25, 4],[26, 3],[27, 3],[28, 10],[29, 9],[30, 8],[31, 7],[32, 1],[33, 0],[34, 0],[35, 4],[36, 4],[37, 5],[38, 4],[39, 4],[40, 4],[41, 4],[42, 4],[43, 10],[44, 5],[45, 6]])

export const dark = n1