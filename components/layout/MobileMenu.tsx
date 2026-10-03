"use client";

import Link from "next/link";
import { XIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type MobileMenuProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pathname: string;
};

const NavLinks = [
  "Home",
  "World",
  "Politics",
  "Economy",
  "Technology",
  "Health",
  "Sports",
  "Video",
];

const getHref = (navItem: string) =>
  navItem === "Home" ? "/" : `/category/${navItem.toLowerCase()}`;

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

const MobileMenu = ({ open, setOpen, pathname }: MobileMenuProps) => {
  const isActive = (navItem: string) => {
    const path = getHref(navItem);

    if (navItem === "Home") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const closeMenu = () => setOpen(false);

  return (
    <div
      aria-hidden={!open}
      className={`
        fixed inset-0 z-60 flex flex-col bg-paper px-5
        transition-all duration-300 md:hidden
        ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-3 opacity-0"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line py-3.5">
        <Logo className="text-[24px]" />

        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="cursor-pointer p-2.5 text-ink transition-colors hover:text-accent"
        >
          <XIcon size={24} />
        </button>
      </div>

      {/* Navigation */}
      <ul className="flex-1 overflow-y-auto py-2">
        {NavLinks.map((navItem, idx) => (
          <li
            key={navItem}
            style={{
              transitionDelay: open ? `${60 + idx * 25}ms` : "0ms",
            }}
            className={`
              border-b border-line
              transition-all duration-300
              ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
            `}
          >
            <Link
              href={getHref(navItem)}
              onClick={closeMenu}
              className={`
                flex items-center justify-between
                py-4 font-newsReader text-[32px] font-medium
                uppercase tracking-[0.01em]
                transition-colors
                ${
                  isActive(navItem)
                    ? "text-accent"
                    : "text-ink hover:text-accent"
                }
              `}
            >
              <span>{navItem}</span>

              <span className="font-sans text-base text-muted">→</span>
            </Link>
          </li>
        ))}

        {/* Authentication */}
        <li className="pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.2em] text-muted">
            Authentication
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/sign-in"
              onClick={closeMenu}
              className="rounded-[3px] border border-ink/20 py-3.5 text-center text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              onClick={closeMenu}
              className="rounded-[3px] bg-accent py-3.5 text-center text-sm font-medium text-white transition-all hover:brightness-110"
            >
              Sign Up
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
