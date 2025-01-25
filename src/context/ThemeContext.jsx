import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { PropTypes } from 'prop-types';
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // set theme to localstorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
    children: PropTypes.object
}

export default ThemeProvider;