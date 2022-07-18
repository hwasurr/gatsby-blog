/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './toggleButton.css';

export default function ToggleButton(): JSX.Element {
  // ******************************************************
  // theme
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>();

  // 최초 theme 설정
  React.useEffect(() => {
    const localThemeType = typeof window !== 'undefined' ? window.localStorage.getItem('themeType') : null;
    if (localThemeType) {
      document.body.className = localThemeType;
      setIsDarkTheme(localThemeType === 'dark');
    }
  }, [setIsDarkTheme]);

  // theme 토글 함수
  function handleThemeToggle(): void {
    const themeType = document.body.className;
    if (themeType === 'dark') {
      window.localStorage.setItem('themeType', '');
      document.body.className = '';
      setIsDarkTheme(false);
    } else {
      window.localStorage.setItem('themeType', 'dark');
      document.body.className = 'dark';
      setIsDarkTheme(true);
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', marginLeft: 8, marginBottom: 16
    }}
    >
      <input className="toggle" type="checkbox" id="switch" checked={isDarkTheme} onClick={handleThemeToggle} />
      <label className="togglelabel" htmlFor="switch" id="switch">ㅎㅇ</label>
    </div>
  );
}
