import { createContext, useState, ReactNode, useContext } from 'react';

interface IProps {
  isModalOpen: boolean;
  modalMessage: string;
  modalTitle: string;
  onConfirm: () => void;
  openModal: (
    modalMessage: string,
    modalTitle?: string,
    onConfirm?: () => void
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IProps>({
  isModalOpen: false,
  modalMessage: '',
  modalTitle: '',
  onConfirm: () => {},
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const openModal = (
    modalMessage: string,
    modalTitle: string = '',
    onConfirm: () => void = () => {}
  ) => {
    setModalMessage(modalMessage);
    setModalTitle(modalTitle);
    setOnConfirm(() => onConfirm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalMessage,
        modalTitle,
        onConfirm,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
