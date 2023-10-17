'use client';
import { NextPage } from 'next';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useOpen } from '@/app/store/useOpen';

const Modal: NextPage = () => {
  const { isOpen, setIsOpen } = useOpen((state) => ({
    isOpen: state.isOpenModal,
    setIsOpen: state.setIsOpenModal,
  }));

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 999 }}
        as="form"
        className="MODAL_WINDOW"
        onClose={() => {
          setIsOpen(false), console.log(isOpen);
        }}>
        <div
          className="fixed inset-0 bg-black/30"
          aria-hidden="true"
          style={{ position: 'fixed', top: 0, right: 0, zIndex: 999 }}
        />
        sssssssssssssss
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
        <div style={{ zIndex: 999 }}>
          <div>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                {/* <div style={{ background: 'red', width: 500, height: 500 }}>sssss</div> */}
                {/* ... */}
              </Dialog.Panel>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
