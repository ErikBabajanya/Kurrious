"use client";
import { createContext, useContext } from "react";
import navigateTo from "../utils/navigation";

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const navigate = (path) => navigateTo(path);

  return (
    <NavigationContext.Provider value={{ navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

export { NavigationProvider, useNavigation };
