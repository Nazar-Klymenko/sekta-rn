type Theme = {
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
  background: string;
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
  'hsla(250, 50%, 48%, 1)',
  'hsla(0, 0%, 99%, 0)',
  'hsla(0, 0%, 99%, 0.25)',
  'hsla(0, 0%, 99%, 0.5)',
  'hsla(0, 0%, 99%, 0.75)',
  'hsla(0, 0%, 99%, 1)',
  'hsla(0, 0%, 93%, 1)',
  'hsla(0, 0%, 88%, 1)',
  'hsla(0, 0%, 82%, 1)',
  'hsla(0, 0%, 77%, 1)',
  'hsla(0, 0%, 72%, 1)',
  'hsla(0, 0%, 66%, 1)',
  'hsla(0, 0%, 61%, 1)',
  'hsla(0, 0%, 55%, 1)',
  'hsla(0, 0%, 50%, 1)',
  'hsla(0, 15%, 15%, 1)',
  'hsla(0, 15%, 10%, 1)',
  'hsla(0, 14%, 10%, 0)',
  'hsla(0, 14%, 10%, 0.25)',
  'hsla(0, 14%, 10%, 0.5)',
  'hsla(0, 14%, 10%, 0.75)',
  'hsla(250, 50%, 57%, 1)',
  'hsla(0, 0%, 4%, 0)',
  'hsla(0, 0%, 4%, 0.25)',
  'hsla(0, 0%, 4%, 0.5)',
  'hsla(0, 0%, 4%, 0.75)',
  'hsla(0, 0%, 4%, 1)',
  'hsla(0, 0%, 9%, 1)',
  'hsla(0, 0%, 14%, 1)',
  'hsla(0, 0%, 19%, 1)',
  'hsla(0, 0%, 24%, 1)',
  'hsla(0, 0%, 30%, 1)',
  'hsla(0, 0%, 35%, 1)',
  'hsla(0, 0%, 40%, 1)',
  'hsla(0, 0%, 45%, 1)',
  'hsla(0, 15%, 93%, 1)',
  'hsla(0, 15%, 95%, 1)',
  'hsla(0, 15%, 95%, 0)',
  'hsla(0, 15%, 95%, 0.25)',
  'hsla(0, 15%, 95%, 0.5)',
  'hsla(0, 15%, 95%, 0.75)',
  'hsla(250, 50%, 40%, 0)',
  'hsla(250, 50%, 40%, 0.25)',
  'hsla(250, 50%, 40%, 0.5)',
  'hsla(250, 50%, 40%, 0.75)',
  'hsla(250, 50%, 40%, 1)',
  'hsla(250, 50%, 43%, 1)',
  'hsla(250, 50%, 46%, 1)',
  'hsla(250, 50%, 51%, 1)',
  'hsla(250, 50%, 54%, 1)',
  'hsla(250, 50%, 59%, 1)',
  'hsla(250, 50%, 62%, 1)',
  'hsla(250, 50%, 65%, 1)',
  'hsla(250, 50%, 95%, 1)',
  'hsla(249, 52%, 95%, 0)',
  'hsla(249, 52%, 95%, 0.25)',
  'hsla(249, 52%, 95%, 0.5)',
  'hsla(249, 52%, 95%, 0.75)',
  'hsla(250, 50%, 35%, 0)',
  'hsla(250, 50%, 35%, 0.25)',
  'hsla(250, 50%, 35%, 0.5)',
  'hsla(250, 50%, 35%, 0.75)',
  'hsla(250, 50%, 35%, 1)',
  'hsla(250, 50%, 38%, 1)',
  'hsla(250, 50%, 41%, 1)',
  'hsla(250, 50%, 49%, 1)',
  'hsla(250, 50%, 52%, 1)',
  'hsla(250, 50%, 60%, 1)',
  'hsla(250, 50%, 90%, 1)',
]

const ks = [
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
'background',
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


const n1 = t([[0, 0],[1, 0],[2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 7],[9, 8],[10, 9],[11, 10],[12, 11],[13, 12],[14, 13],[15, 14],[16, 15],[17, 16],[18, 17],[19, 18],[20, 19],[21, 20],[22, 5],[23, 4],[24, 6],[25, 6],[26, 8],[27, 7],[28, 9],[29, 8],[30, 16],[31, 15],[32, 16],[33, 15],[34, 17],[35, 13],[36, 18]])

export const light = n1
const n2 = t([[0, 21],[1, 21],[2, 22],[3, 23],[4, 24],[5, 25],[6, 26],[7, 27],[8, 28],[9, 29],[10, 30],[11, 31],[12, 32],[13, 33],[14, 34],[15, 14],[16, 35],[17, 36],[18, 37],[19, 38],[20, 39],[21, 40],[22, 26],[23, 27],[24, 25],[25, 25],[26, 29],[27, 30],[28, 28],[29, 29],[30, 36],[31, 35],[32, 36],[33, 35],[34, 37],[35, 34],[36, 38]])

export const dark = n2
const n3 = t([[0, 8],[1, 8],[2, 41],[3, 42],[4, 43],[5, 44],[6, 45],[7, 46],[8, 47],[9, 0],[10, 48],[11, 49],[12, 21],[13, 50],[14, 51],[15, 52],[16, 53],[17, 53],[18, 54],[19, 55],[20, 56],[21, 57],[22, 45],[23, 44],[24, 46],[25, 46],[26, 0],[27, 47],[28, 48],[29, 0],[30, 53],[31, 53],[32, 53],[33, 53],[34, 54],[35, 51],[36, 55]])

export const light_accent = n3
const n4 = t([[0, 34],[1, 34],[2, 58],[3, 59],[4, 60],[5, 61],[6, 62],[7, 63],[8, 64],[9, 46],[10, 47],[11, 65],[12, 66],[13, 49],[14, 21],[15, 67],[16, 68],[17, 53],[18, 54],[19, 55],[20, 56],[21, 57],[22, 62],[23, 63],[24, 61],[25, 61],[26, 46],[27, 47],[28, 64],[29, 46],[30, 53],[31, 68],[32, 53],[33, 68],[34, 54],[35, 21],[36, 55]])

export const dark_accent = n4
const n5 = t([[30, 15],[31, 14],[32, 15],[33, 14]])

export const light_alt1 = n5
const n6 = t([[30, 14],[31, 13],[32, 14],[33, 13]])

export const light_alt2 = n6
const n7 = t([[22, 8],[23, 7],[24, 9],[25, 9],[26, 11],[27, 10],[29, 11],[28, 12]])

export const light_active = n7
export const light_surface3 = n7
const n8 = t([[22, 6],[23, 5],[24, 7],[25, 7],[26, 9],[27, 8],[29, 9],[28, 10]])

export const light_surface1 = n8
const n9 = t([[22, 7],[23, 6],[24, 8],[25, 8],[26, 10],[27, 9],[29, 10],[28, 11]])

export const light_surface2 = n9
const n10 = t([[22, 10],[23, 10],[24, 11],[25, 11],[26, 10],[27, 10],[29, 11],[28, 11]])

export const light_surface4 = n10
const n11 = t([[30, 35],[31, 14],[32, 35],[33, 14]])

export const dark_alt1 = n11
const n12 = t([[30, 14],[31, 34],[32, 14],[33, 34]])

export const dark_alt2 = n12
const n13 = t([[22, 29],[23, 30],[24, 28],[25, 28],[26, 32],[27, 33],[29, 32],[28, 31]])

export const dark_active = n13
export const dark_surface3 = n13
const n14 = t([[22, 27],[23, 28],[24, 26],[25, 26],[26, 30],[27, 31],[29, 30],[28, 29]])

export const dark_surface1 = n14
const n15 = t([[22, 28],[23, 29],[24, 27],[25, 27],[26, 31],[27, 32],[29, 31],[28, 30]])

export const dark_surface2 = n15
const n16 = t([[22, 31],[23, 31],[24, 30],[25, 30],[26, 31],[27, 31],[29, 30],[28, 30]])

export const dark_surface4 = n16
const n17 = t([[30, 53],[31, 52],[32, 53],[33, 52]])

export const light_accent_alt1 = n17
const n18 = t([[30, 52],[31, 51],[32, 52],[33, 51]])

export const light_accent_alt2 = n18
const n19 = t([[22, 0],[23, 47],[24, 48],[25, 48],[26, 21],[27, 49],[29, 21],[28, 50]])

export const light_accent_active = n19
export const light_accent_surface3 = n19
const n20 = t([[22, 46],[23, 45],[24, 47],[25, 47],[26, 48],[27, 0],[29, 48],[28, 49]])

export const light_accent_surface1 = n20
const n21 = t([[22, 47],[23, 46],[24, 0],[25, 0],[26, 49],[27, 48],[29, 49],[28, 21]])

export const light_accent_surface2 = n21
const n22 = t([[22, 49],[23, 49],[24, 21],[25, 21],[26, 49],[27, 49],[29, 21],[28, 21]])

export const light_accent_surface4 = n22
const n23 = t([[30, 68],[31, 67],[32, 68],[33, 67]])

export const dark_accent_alt1 = n23
const n24 = t([[30, 67],[31, 21],[32, 67],[33, 21]])

export const dark_accent_alt2 = n24
const n25 = t([[22, 46],[23, 47],[24, 64],[25, 64],[26, 66],[27, 49],[29, 66],[28, 65]])

export const dark_accent_active = n25
export const dark_accent_surface3 = n25
const n26 = t([[22, 63],[23, 64],[24, 62],[25, 62],[26, 47],[27, 65],[29, 47],[28, 46]])

export const dark_accent_surface1 = n26
const n27 = t([[22, 64],[23, 46],[24, 63],[25, 63],[26, 65],[27, 66],[29, 65],[28, 47]])

export const dark_accent_surface2 = n27
const n28 = t([[22, 65],[23, 65],[24, 47],[25, 47],[26, 65],[27, 65],[29, 47],[28, 47]])

export const dark_accent_surface4 = n28