"use client";

import Link from "next/link";
import { XIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { signOut, useSession } from "@/lib/auth-client";

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

  const { data: session } = useSession();
  const user = session?.user;

  const firstName = user?.name?.split(" ")[0];
  const handleLogout = async () => {
    await signOut();
  };
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
        {NavLinks.map((navItem) => (
          <li
            key={navItem}
            style={{
              transitionDelay: open ? `${60 + NavLinks.length * 25}ms` : "0ms",
            }}
            className={`pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
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
            {user ? "Account" : "Authentication"}
          </p>

          <div>
            {user ? (
              <div className="flex justify-end">
                <div className="flex w-[40%] justify-center items-center gap-2 rounded-full border border-black/10 bg-white/70 py-1 pl-1 pr-1.5 shadow-sm backdrop-blur transition-shadow duration-200 hover:shadow-md">
                  {/* User Image */}
                  <div className="flex items-center gap-2.5">
                    <Link href={"/profile"}>
                      <div className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-accent to-[#5a82ff] text-sm font-semibold uppercase text-white ring-2 ring-white">
                        {firstName?.charAt(0).toUpperCase()}
                      </div>
                    </Link>

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
              </div>
            ) : (
              <div className="w-full flex gap-5">
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="rounded-[3px] flex-1 border border-ink/20 py-3.5 text-center text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Sign In
                  <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </Link>

                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className="rounded-[3px] flex-1 bg-accent py-3.5 text-center text-sm font-medium text-white transition-all hover:brightness-110"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
