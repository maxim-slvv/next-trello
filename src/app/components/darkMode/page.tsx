'use client';

import { NextPage } from 'next';
import './DarkMode.scss';

const DarkMode: NextPage = () => {
  const setDarkMode = () => {
    document.querySelector('body')?.setAttribute('data-theme', 'dark');
    localStorage.setItem('selectedTheme', 'dark');
  };
  const setLightMode = () => {
    document.querySelector('body')?.setAttribute('data-theme', 'light');
    localStorage.setItem('selectedTheme', 'light');
  };

  const selectedTheme = localStorage.getItem('selectedTheme');

  if (selectedTheme === 'dark') {
    setDarkMode();
  }

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.checked ? setDarkMode() : setLightMode();

  return (
    <div className="toggleWrapper">
      <input
        type="checkbox"
        className="dn"
        id="dn"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === 'dark'}
      />
      <label htmlFor="dn" className="toggle">
        <span className="toggle__handler">
          <span className="crater crater--1"></span>
          <span className="crater crater--2"></span>
          <span className="crater crater--3"></span>
        </span>
        <span className="star star--1"></span>
        <span className="star star--2"></span>
        <span className="star star--3"></span>
        <span className="star star--4"></span>
        <span className="star star--5"></span>
        <span className="star star--6"></span>
      </label>
    </div>
  );
};

export default DarkMode;
