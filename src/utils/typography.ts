import Typography from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
});

delete Wordpress2016.googleFonts;
const myFonts = [
  'arial', 'Merriweather', 'Georgia', '-apple-system',
  'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'BlinkMacSystemFont', 'Helvetica Neue', 'AppleSDGothicNeoR', 'Malgun Gothic', 'Nanum Gothic',
  'Noto Sans KR', 'Noto Sans CJK KR',
  '돋움', 'Dotum',
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
