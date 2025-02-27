import React, { ReactNode } from 'react';

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  id,
  title,
  children,
  isOpen,
  onClose,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open" id={id}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="py-4">{children}</div>
        {footer && <div className="modal-action">{footer}</div>}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default Modal;