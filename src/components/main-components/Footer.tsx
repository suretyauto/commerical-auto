import { Link } from "@nextui-org/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
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
            <h2 className="mt-2 text-lg font-bold">ACME Corporation</h2>
            <p className="mt-2">Innovating for a better tomorrow</p>
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
            <p>123 Tech Lane</p>
            <p>Innovation City, IN 54321</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@acmecorp.com</p>
          </div>

          {/* TCPA Compliance */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">TCPA Compliance</h3>
            <p className="text-sm">
              By using this website, you agree to our TCPA consent. We or our
              partners may contact you via phone or SMS. To opt-out, reply STOP
              or contact us.
            </p>
            <Link
              href="#"
              className="inline-block mt-2 text-sm text-primary hover:underline"
            >
              View Full TCPA Policy
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 text-center border-t border-gray-200">
          <p>&copy; 2024 ACME Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
