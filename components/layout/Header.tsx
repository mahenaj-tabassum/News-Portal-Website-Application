"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

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

  const { data: session, refetch } = useSession();
  const user = session?.user;

  const firstName = user?.name?.split(" ")[0];
  const handleLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    const f = () =>
      setScrolled((prev) => (prev ? window.scrollY > 8 : window.scrollY > 48));
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    setOpen(false);
    refetch();
  }, [pathname]);
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
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 py-1 pl-1 pr-1.5 shadow-sm backdrop-blur transition-shadow duration-200 hover:shadow-md">
                  {/* User Image */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#5a82ff] text-sm font-semibold uppercase text-white ring-2 ring-white">
                      {firstName?.charAt(0)}
                    </div>

                    {/* First Name */}
                    <span className="hidden text-sm font-medium text-ink sm:inline">
                      Hi! {firstName}
                    </span>
                  </div>

                  {/* Divider */}
                  <span
                    className="mx-1 h-5 w-px bg-black/10"
                    aria-hidden="true"
                  />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="group flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-all duration-200 hover:bg-black/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    Logout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-3 md:flex">
                  <Link
                    href="/sign-in"
                    className="group relative px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                  >
                    Sign In
                    <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>

                  <Link
                    href="/sign-up"
                    className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(36,87,255,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(36,87,255,0.6)] hover:brightness-110 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <div className="-mr-2 md:hidden">
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
