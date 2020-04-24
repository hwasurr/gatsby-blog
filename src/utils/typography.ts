import Typography from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
});

delete Wordpress2016.googleFonts;
const myFonts = [
  'Merriweather', 'Georgia', '-apple-system',
  'BlinkMacSystemFont', 'Helvetica Neue',
  'Apple SD Gothic Neo', 'Malgun Gothic',
  '맑은 고딕', '나눔고딕', 'Nanum Gothic',
  'Noto Sans KR', 'Noto Sans CJK KR',
  'arial', '돋움', 'Dotum',
  'Tahoma', 'Geneva', 'sans-serif'
];
const typography = new Typography({
  ...Wordpress2016,
  headerFontFamily: myFonts,
  bodyFontFamily: myFonts,
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
