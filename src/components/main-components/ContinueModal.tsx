import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ContinuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  lastStep: string;
}

const ContinuationModal: React.FC<ContinuationModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="lg">
      <ModalContent>
        <ModalHeader className="text-2xl font-bold">
          Continue Your Quote
        </ModalHeader>
        <ModalBody>
          <p className="text-lg">
            You have a partially completed form. Would you like to continue or
            start over?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Start Over
          </Button>
          <Button color="primary" onPress={onContinue}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContinuationModal;
