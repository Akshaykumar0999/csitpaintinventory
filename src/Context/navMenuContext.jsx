import React, { useState } from "react";
export const NavMenuContext = React.createContext();
export const NavMenuContextProvider = ({children}) => {
    const [openNav, setOpenNav] = useState(false);
    const [theme, setTheme] = useState(false);
    return (
      <NavMenuContext.Provider
        value={{ openNav, setOpenNav, theme, setTheme }}
      >
        {children}
      </NavMenuContext.Provider>
    );
};

