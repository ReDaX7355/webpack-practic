import React, { FC, ReactNode } from 'react';

interface ModalProps {
  isActive: boolean;
  onClose: () => void;
  children: ReactNode;
  top?: string;
  left?: string;
}

const Modal: FC<ModalProps> = ({
  isActive,
  onClose,
  children,
  top = '10',
  left = '0',
}) => {
  const styles = `block absolute top-${top} left-[${left}px] min-w-[150px] bg-white shadow p-4 rounded z-20`;

  if (!isActive) return null;
  return (
    <div>
      <div className={isActive ? 'back-active' : ''} onClick={onClose}></div>
      <div className={styles}>{children}</div>
    </div>
  );
};

export default Modal;
