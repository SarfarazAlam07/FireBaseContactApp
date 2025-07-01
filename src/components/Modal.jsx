import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" absolute backdrop-blur top-0 h-screen w-screen place-items-center grid  z-40">
          <div className=" m-auto min-[200px] relative z-50 min-w-[80%] bg-white p-4 ">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="text-2xl cursor-pointer"/>

              
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  ,document.getElementById("modal-root"));
};

export default Modal;
