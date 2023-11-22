'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function PopupsController({showModal, closeModal, bodyContent, headerContent}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal show={showModal} size={'7xl'} onClose={closeModal}>
        <Modal.Header>{headerContent}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
          { bodyContent }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}