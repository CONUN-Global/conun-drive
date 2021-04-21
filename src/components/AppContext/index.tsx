import React, { createContext, ReactNode, useContext, useMemo } from "react";

import useCurrentUser from "../../hooks/useCurrentUser";

type State = {
  currentUser: any;
};
type AppProviderProps = { children: ReactNode };

const AppContext = createContext<State | undefined>(undefined);

function AppProvider({ children }: AppProviderProps) {
  const { currentUser } = useCurrentUser();

  const value = useMemo(
    () => ({
      currentUser,
    }),
    [currentUser]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
}

export { AppProvider, useAppContext };
