"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, X, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cart from "./cart";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchBar from "./search";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "OUR CLIENTS", href: "/#our-clients"},
  { name: "ABOUT US", href: "/about-us" },
  { name: "PRODUCTS", href: "/products" },
  { name: "PRICELIST & BROCHURE", href: "/price-list" },
  { name: "CONTACT US", href: "/contact-us" },
];

export default function Nav3({ alwaysVisible = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const pathName = usePathname();
  const [path, setPath] = useState(pathName);

  useEffect(() => {
    setPath(pathName);
  }, [pathName]);

  useEffect(() => {
    if (!alwaysVisible) {
      const handleScroll = () => {
        setIsVisible(window.scrollY > window.innerHeight);
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [alwaysVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white fixed top-0 left-0 z-50 w-full shadow-md"
        >
          {/* HEADER */}
          <header className="border-b py-4 w-full">
            <div className="flex items-center justify-between px-4">
              {/* LEFT: Logos */}
              <div className="flex items-center flex-wrap">
                <Image
                  src="/sheth_logo.png"
                  alt="Sheth Trading Corporation Logo"
                  width={400}
                  height={60}
                  className="h-auto w-60"
                />
                <div className="flex items-center space-x-2 md:space-x-3 ml-2">
                  <Image
                    src="/msme_logo.png"
                    alt="Partner Logo 1"
                    width={50}
                    height={50}
                  />
                  <Image
                    src="/gem_logo.png"
                    alt="Partner Logo 2"
                    width={50}
                    height={50}
                  />
                  <Image
                    src="/ireps_logo.png"
                    alt="Partner Logo 3"
                    width={50}
                    height={50}
                  />
                </div>
              </div>

              {/* RIGHT: Mail + Call */}
              <div className="flex flex-col items-end gap-2 pr-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a
                    href="mailto:shethtrd@gmail.com"
                    className="text-sm hover:underline"
                  >
                    shethtrd@gmail.com
                  </a>
                </div>
                <a href="tel:+9103322379239">
                  <Button
                    variant="default"
                    className="bg-[#5C1E1E] hover:bg-[#4A1818]"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    <span>Call us</span>
                  </Button>
                </a>
              </div>
            </div>
          </header>

          {/* NAVIGATION */}
          <nav className="w-full text-black py-[0.25rem] md:py-[1rem]">
            <div className="container mx-auto px-4 max-w-[76rem]">
              {/* Mobile Header */}
              <div className="flex items-center justify-between py-4 lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {!isOpen ? (
                    <Menu className="h-6 w-6" />
                  ) : (
                    <X className="h-6 w-6" />
                  )}
                </Button>
              </div>

              {/* Menu Items */}
              <div
                className={`${
                  isOpen ? "block" : "hidden"
                } space-y-4 lg:block lg:space-y-0`}
              >
                <ul className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={`block py-2 text-sm font-semibold transition-colors hover:text-amber-600
                         ${
                           path === item.href ? "text-amber-500" : "text-black"
                         }`}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                    <li className="mr-auto lg:hidden">
                      <SearchBar />
                    </li>
                  </div>
                  {!alwaysVisible ? (
                    <li className="lg:ml-auto">
                      <Cart />
                    </li>
                  ) : (
                    <div className="hidden lg:flex items-center gap-2">
                      <SearchBar />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
