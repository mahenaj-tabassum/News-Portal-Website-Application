import Link from "next/link";

const NavLinks = [
  "Home",
  "World",
  "Politics",
  "Business",
  "Technology",
  "Science",
  "Culture",
  "Sports",
];

const getHref = (navItem: string) =>
  navItem === "Home" ? "/" : `/category/${navItem.toLowerCase()}`;

type NavbarProps = {
  pathname: string;
};

const Navbar = ({ pathname }: NavbarProps) => {
  const isActive = (navItem: string) => {
    const path = getHref(navItem);

    if (navItem === "Home") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav
      aria-label="Primary"
      className="relative hidden border-y border-line md:block"
    >
      <ul className="flex justify-center gap-9">
        {NavLinks.map((navItem) => {
          const active = isActive(navItem);

          return (
            <li key={navItem}>
              <Link
                href={getHref(navItem)}
                aria-current={active ? "page" : undefined}
                className={`relative block py-3.5 text-xs font-medium uppercase tracking-[.16em] transition-colors
                  after:absolute after:inset-x-0 after:-bottom-px after:h-px
                  after:origin-left after:bg-accent
                  after:transition-transform after:duration-300
                  ${
                    active
                      ? "text-accent after:scale-x-100"
                      : "text-ink after:scale-x-0 hover:text-accent hover:after:scale-x-100"
                  }
                `}
              >
                {navItem}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
