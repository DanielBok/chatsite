"use client";

import React, { createContext, useContext, useState } from "react";

type ModalContextProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  setIsOpen: () => {
  },
});

export const useModalContext = () => useContext(ModalContext);

export function ModalContextProvider({children}: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{isOpen, setIsOpen}}>
      {children}
    </ModalContext.Provider>
  );
}
