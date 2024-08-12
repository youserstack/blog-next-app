import { createContext, useState, ReactNode } from "react";

interface ModalContextType {
  modal: string;
  openModal: (type: string) => void;
  closeModal: () => void;
}

const defaultModalContext: ModalContextType = {
  modal: "",
  openModal: () => {},
  closeModal: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultModalContext);
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState("");

  const openModal = (type: string) => setModal(type);
  const closeModal = () => setModal("");

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
