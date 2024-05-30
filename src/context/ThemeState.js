import ThemeContext from "./ThemeContext";
import { useState } from "react";
const ThemeState = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ loginUser, signUp }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
