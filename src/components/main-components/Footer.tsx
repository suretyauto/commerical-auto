import {
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <footer className="py-8 border-t border-gray-200 bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-start">
            <svg
              fill="none"
              height="36"
              viewBox="0 0 32 32"
              width="36"
              className="text-primary"
            >
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <h2 className="mt-2 text-lg font-bold">Surety Auto Group</h2>
            <p className="mt-2">Innovating for better insurance solutions</p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <FaFacebook className="text-2xl hover:text-blue-600" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <FaTwitter className="text-2xl hover:text-blue-400" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <FaInstagram className="text-2xl hover:text-pink-600" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-2xl hover:text-blue-700" />
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <p>123 Insurance Lane</p>
            <p>Surety City, SA 54321</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@suretyautogroup.com</p>
          </div>

          {/* TCPA Compliance */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">TCPA Compliance</h3>
            <p className="text-sm">
              By using this website, you agree to our TCPA consent. We or our
              partners may contact you via phone or SMS. To opt-out, reply STOP
              or contact us.
            </p>
            <Button
              onPress={onOpen}
              className="h-auto p-0 mt-2 text-sm font-normal bg-transparent text-primary hover:underline min-w-min"
            >
              View Full TCPA Policy
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 text-center border-t border-gray-200">
          <p>&copy; 2024 Surety Auto Group. All rights reserved.</p>
        </div>
      </div>

      {/* TCPA Policy Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        backdrop="blur"
        closeButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                TCPA Policy
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-foreground">
                  By interacting with Surety Auto Group, you are providing your
                  consent for Surety Auto Group to use automated technology,
                  including calls, texts, prerecorded messages and emails, to
                  contact you about insurance offers at the number and email you
                  provide, even if your number is on a corporate, state or
                  national do not call list. This consent is not required to
                  make a purchase or use our services.
                </p>
                <p className="mt-4 text-sm text-foreground">
                  Our{" "}
                  <a className="text-blue-600 hover:underline" href="#">
                    Terms & conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy policy
                  </a>{" "}
                  apply. Message and data rates may apply. You can text "STOP"
                  at any time to unsubscribe from our messages.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </footer>
  );
};

export default Footer;
