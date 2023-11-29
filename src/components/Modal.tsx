import React, { FC, ReactNode, useEffect, useState } from 'react';

interface ModalProps {
  isActive?: boolean;
  onClose: () => void;
  children: ReactNode;
  top?: number;
  left?: number;
}

const Modal: FC<ModalProps> = ({ onClose, children, top = 8, left = 8 }) => {
  const styles = ` block absolute top-${top} left-${left} min-w-[150px] bg-white shadow p-4 rounded z-20`;
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    window.addEventListener('click', () => {
      let modalHeader = document.querySelector('.modal-header');

      if (modalHeader?.closest('.modal-header')) {
      }
    });
  }, []);

  if (!isActive) return null;
  return (
    <div className="modal">
      <div onClick={onClose}></div>
      <div className={styles}>{children}</div>
    </div>
  );
};

export default Modal;
