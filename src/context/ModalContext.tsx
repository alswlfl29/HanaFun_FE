import { createContext, useState, ReactNode, useContext } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  modalMessage: string;
  modalTitle: string;
  onConfirm: () => void;
  openModal: (
    modalMessage: string,
    onConfirm: () => void,
    modalTitle?: string
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  modalMessage: '',
  modalTitle: '',
  onConfirm: () => {},
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const openModal = (
    modalMessage: string,
    onConfirm: () => void,
    modalTitle: string = ''
  ) => {
    setModalMessage(modalMessage);
    setModalTitle(modalTitle);
    setOnConfirm(() => onConfirm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalContextValue: ModalContextType = {
    isModalOpen,
    modalMessage,
    modalTitle,
    onConfirm,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
