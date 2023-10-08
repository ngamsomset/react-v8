import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  //create a Ref
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elRef.current);
    //clean up, we want remove the element the dom if it's no longer use.
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  //create portal will create a div with children at the target.
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
