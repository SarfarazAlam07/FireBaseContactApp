import React, { useState } from 'react'

const useDisclouse = () => {
      const [isOpen, setisOpen] = useState(false);
      const onOpen = () => {
        setisOpen(true);
      };
    
      const onClose = () => {
        setisOpen(false);
      };
  return {isOpen,onClose,onOpen}
}

export default useDisclouse;