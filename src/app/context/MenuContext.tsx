"use client";
import React, { createContext, FC, ReactNode, useCallback } from "react";

interface MenuContextProps {
  Jenny: () => void;
  Messages: () => void;
  Records: () => void;
  Customers: () => void;
  Locations: () => void;
  Maintenance: () => void;
  Dashboards: () => void;
}

interface MenuContextProviderProps {
  children: ReactNode;
}

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined
);

export const MenuContextProvider: FC<MenuContextProviderProps> = ({
  children,
}) => {
  const Jenny = useCallback(() => {
    window.location.href = "/pages/dashboard/jenny";
  }, []);
  const Messages = useCallback(() => {
    window.location.href = "/Messages";
  }, []);
  const Records = useCallback(() => {
    window.location.href = "/Records";
  }, []);
  const Customers = useCallback(() => {
    window.location.href = "/Customers";
  }, []);
  const Locations = useCallback(() => {
    window.location.href = "/Locations";
  }, []);
  const Maintenance = useCallback(() => {
    window.location.href = "/Maintenance";
  }, []);
  const Dashboards = useCallback(() => {
    window.location.href = "/Dashboards";
  }, []);

  return (
    <MenuContext.Provider
      value={{
        Jenny,
        Messages,
        Records,
        Customers,
        Locations,
        Maintenance,
        Dashboards,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
