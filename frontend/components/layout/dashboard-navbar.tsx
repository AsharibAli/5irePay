import { useState, useEffect } from "react";
import RPC from "../../utils/ethersRPC";
import { Web3Auth } from "@web3auth/web3auth";
import Link from "next/link";
import { getWeb3Auth } from "components/Helper";

import {
  Navbar as MTNavbar,
  MobileNav,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

interface NavbarProps {
  container?: string;
  className?: string;
  shadow?: boolean;
  sidenavMenu?: any;
  mobileNavClassName?: string;
  [key: string]: any;
}

export default function Navbar({
  container,
  className,
  shadow,
  sidenavMenu,
  mobileNavClassName = "text-[#1A237E]",
  ...rest
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const navbarItemClasses =
    "flex items-center px-1 py-2 font-normal transition-all duration-250 text-size-sm text-current font-light lg:px-2 cursor-pointer";
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  async function setUp() {
    const _web3auth = await getWeb3Auth();
    setWeb3auth(_web3auth);
  }

  useEffect(() => {
    setUp();
  }, [web3auth]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 && setOpen(false);
    });
  }, []);

  const menuOpenIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const menuCloseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const navbarMenu = (
    <ul
      className={`${
        open ? "mt-4" : ""
      } mb-0 flex list-none flex-col gap-2 pl-0 text-inherit transition-all lg:ml-auto lg:flex-row lg:gap-4`}
    >
      <Tooltip
        content="Log in to your account"
        placement="bottom"
        offset={-2.5}
      >
        <Link href="/">
          <a
            className="fa fa-sign-out mr-2 py-3 text-base opacity-70"
            onClick={async () => {
              try {
                await web3auth.logout();
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Sign Out
          </a>
        </Link>
      </Tooltip>
    </ul>
  );

  return (
    <div
      className={`absolute z-[999] flex w-full max-w-screen-2xl flex-wrap items-center lg:fixed ${container}`}
    >
      <MTNavbar
        {...rest}
        className={`py-2 pl-6 pr-5 lg:py-2 ${
          shadow ? "shadow-2xl shadow-blue-gray-500/10" : ""
        }`}
        shadow={shadow}
      >
        <div
          className={`flex w-full items-center !justify-between text-[#1A237E] ${className}`}
        >
          <Link href="/">
            <a className="py-2.375 text-size-sm mr-4 whitespace-nowrap font-bold text-inherit lg:ml-0">
              5irePay
            </a>
          </Link>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </IconButton>
          <div className="lg:base-auto hidden flex-grow basis-full items-center overflow-hidden lg:flex lg-max:max-h-0">
            {navbarMenu}
          </div>
        </div>

        <MobileNav open={open} className={mobileNavClassName}>
          {navbarMenu}
        </MobileNav>
        {sidenavMenu}
      </MTNavbar>
    </div>
  );
}
