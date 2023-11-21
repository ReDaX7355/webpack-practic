import React from 'react';

const Modal = () => {
  return (
    <div className="block absolute top-8 left-3 w-[150px] bg-white shadow px-3 py-6 rounded z-20 select-none text-center">
      <div className="flex flex-col gap-3">
        <p className="hover:text-primary cursor-pointer">Профиль</p>
        <p className="hover:text-primary cursor-pointer">Выйти</p>
      </div>
    </div>
  );
};

export default Modal;
