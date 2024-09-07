import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";
import { ModeToggle } from "@/utils/mode-toggle";
import { Phone } from "lucide-react";

const Nav: React.FC = () => {
  return (
    <Navbar
      className="border-b bg-background/60 backdrop-blur-md border-divider"
      maxWidth="full"
    >
      {/* Left side - Mode Toggle */}
      <NavbarContent justify="start">
        <NavbarItem>
          <ModeToggle />
        </NavbarItem>
      </NavbarContent>

      {/* Center - Logo */}
      <NavbarContent justify="center">
        <NavbarBrand>
          <p className="text-sm font-bold sm:text-xl text-inherit">
            Surety Insurance
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Right side - Call Button */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="tel:+18045313796" className="flex items-center">
            <Button
              color="primary"
              variant="shadow"
              size="lg"
              startContent={<Phone className="w-3 h-3 sm:w-4 sm:h-4" />}
              className="px-2 py-1 text-xs font-semibold transition-transform hover:scale-105 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="hidden sm:inline">Call For Quote</span>
              <span className="sm:hidden">Call Quote</span>
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
