"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link
      href="/"
      aria-label="The Daily Brief - home"
      className={`flex items-stretch gap-3 ${className}`}
    >
      <span className="w-0.75 self-stretch rounded-full bg-accent" />
      <span className="font-newsReader font-semibold leading-none tracking-[0.015em]">
        THE DAILY BRIEF
      </span>
    </Link>
  );
};

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  useEffect(() => {
    const f = () =>
      setScrolled((prev) => (prev ? window.scrollY > 8 : window.scrollY > 48));
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`
            ${scrolled ? "bg-paper/80 backdrop-blur-md" : "bg-paper"} 
            sticky top-0 z-50 border-b border-line transition-[background-color,backdrop-filter] duration-300 md:border-b-0
        `}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {/* Utility Bar */}
          <div
            className={`hidden grid-cols-3 items-center overflow-hidden border-b text-muted transition-all duration-300 md:grid 
            ${scrolled ? "h-0 border-transparent opacity-0" : "h-9 border-line opacity-100"}
            `}
          >
            <span className="font-noto-bengali">{date}</span>
            <span className="text-center italic">
              The stories worth knowing
            </span>
            <span className="flex justify-end gap-2">
              <Link className="transition-colors hover:text-ink" href="/about">
                About
              </Link>
              .
              <Link
                className="transition-colors hover:text-ink"
                href="/contact"
              >
                Contact
              </Link>
            </span>
          </div>

          {/* Brand Bar */}
          <div
            className={`
                ${scrolled ? "py-3 md:py-4" : "py-3.5 md:py-8"}
                flex items-center justify-between transition-[padding] duration-300`}
          >
            <div>
              <Logo
                className={` 
                    ${scrolled ? "text-[24px] md:text-[32px]" : "text-[24px] md:text-[54px]"}
                    transition-all duration-300
                `}
              />
              <p
                className={`hidden overflow-hidden pl-3.75 text-[10px] font-medium uppercase tracking-[.32em] text-muted transition-all duration-300 md:block ${scrolled ? "mt-0 max-h-0 opacity-0" : "mt-2.5 max-h-4 opacity-100"}`}
              >
                News · Ideas · Perspectives
              </p>
            </div>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-[3px] bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px hover:brightness-110"
              >
                Sign Up
              </Link>
            </div>

            <div className="-mr-2 flex items-center  md:hidden">
              <button
                aria-label="Search stories"
                className="p-2.5 cursor-pointer"
              >
                <Search />
              </button>
              <button
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="p-2.5 cursor-pointer"
              >
                <Menu />
              </button>
            </div>
          </div>
          {/* Primary Navigation */}
          <Navbar pathname={pathname} />
        </div>
      </header>
      {/* Mobile Menu (outside <header> so backdrop-filter doesn't trap fixed positioning)*/}
      <MobileMenu open={open} setOpen={setOpen} pathname={pathname} />
    </>
  );
};

export default Header;
