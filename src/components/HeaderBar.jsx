import React from "react";

import "./HeaderBar.scss";

const HeaderBar = () => {
  let storedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }

  const themeHandler = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  };

  return (
    <header className="header">
      <h1 className="header__title">Where In The World?</h1>
      <button className="header__theme" onClick={themeHandler}>
        <div className="header__moon"></div>
        <p className="header__text">Dark Mode</p>
      </button>
    </header>
  );
};

export default HeaderBar;
