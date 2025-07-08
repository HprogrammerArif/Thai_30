// MessageModal.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Message from "./Message";

const MessageModal = ({ isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Chat box container - bottom right corner */}
          <div className="absolute bottom-4 right-4 w-full max-w-sm pointer-events-auto">
            <Transition.Child
              as={Fragment}
              enter="transform transition duration-300"
              enterFrom="translate-y-4 opacity-0 scale-95"
              enterTo="translate-y-0 opacity-100 scale-100"
              leave="transform transition duration-200"
              leaveFrom="translate-y-0 opacity-100 scale-100"
              leaveTo="translate-y-4 opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-300">
                <Message onClose={onClose} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MessageModal;
