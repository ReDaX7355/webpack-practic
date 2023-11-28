import React, { FC, ReactNode } from 'react';

interface ModalProps {
  isActive: boolean;
  onClose: () => void;
  children: ReactNode;
  top?: number;
  left?: number;
}

const Modal: FC<ModalProps> = ({
  isActive,
  onClose,
  children,
  top = 8,
  left = 8,
}) => {
  const styles = `block absolute top-${top} left-${left} min-w-[150px] bg-white shadow p-4 rounded z-20`;

  if (!isActive) return null;
  return (
    <div>
      <div className={isActive ? 'back-active' : ''} onClick={onClose}></div>
      <div className={styles}>{children}</div>
    </div>
  );
};

export default Modal;
