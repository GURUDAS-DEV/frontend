"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cart from "./cart";
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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [path, setPath] = useState(pathName);
  useEffect(() => {
    setPath(pathName);
    console.log(pathName);
  }, [pathName]);

  return (
    <nav
      className={`${
        isOpen ? "bg-white text-black" : "bg-black bg-opacity-30 text-white"
      }  absolute z-50 w-[100%]  py-[0.25rem] md:py-[1rem]`}
    >
      <div className="container mx-auto px-4 max-w-[76rem]">
        <div className="flex items-center justify-between py-4 lg:hidden">
          <span className="font-semibold">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen ? <Menu className="h-6 w-6" /> : <X size={18} />}
          </Button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } space-y-4 lg:block lg:space-y-0 `}
        >
          <ul className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`block py-2 text-sm font-semibold transition-colors hover:text-amber-500 
                      ${path === item.href ? "text-amber-500" : ""}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </div>

            <li className="flex flex-col md:flex-row gap-2 md:items-center lg:ml-auto">
              <SearchBar />
              <Cart />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
