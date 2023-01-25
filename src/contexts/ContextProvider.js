import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

// const initialState = {
//   chat: false,
//   userProfile: false,
//   notification: false,
// };

export const ContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [screenSize, setScreenSize] = useState(undefined);

  return (
    <StateContext.Provider
      value={{
        isOpen,
        setIsOpen,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
