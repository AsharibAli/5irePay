// page.tsx

import { useState, useEffect, FC } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  container?: string;
  className?: string;
  shadow?: boolean;
  sidenavMenu?: React.ReactNode;
  mobileNavClassName?: string;
};

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>5irePay</title>
      </Head>
      <Navbar shadow />
      <main className="relative">
        <Header />
        <div className="mx-6 -mt-20 rounded-xl bg-white shadow-lg md:mx-12 md:-mt-48">
          {/* Your sections go here */}
        </div>
      </main>
    </>
  );
};

const Header: FC = () => {
  return (
    <div className="h-screen min-h-screen bg-[url('/img/bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative z-50 h-fit py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="mt-48 w-full px-4 md:w-8/12 lg:mt-4 lg:w-5/12">
              <h1 className="gradient-text mb-2 text-5xl font-black tracking-normal text-white">
                5irePay - The PayPal for crypto
              </h1>

              <p className="mb-6 text-lg font-light text-[#1A237E] lg:pr-12">
                Send and receive payments internationally in seconds with your
                email address only.
              </p>
              <div className="flex flex-col-reverse gap-2 lg:flex-row">
                <Link href="/login">
                  <a>
                    <button className="h-full w-full rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 px-4 py-2 text-white">
                      Unleash the Creativity
                    </button>
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden w-full max-w-full px-4 pl-40 pt-24 md:w-7/12 md:pt-0 lg:block">
              <Image
                src="/img/connect1.svg"
                alt="components"
                width={500}
                height={500}
                quality={100}
                className="aspect-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar: FC<NavbarProps> = ({
  container,
  className,
  shadow,
  sidenavMenu,
  mobileNavClassName = "text-[#1A237E]",
  ...rest
}) => {
  const [open, setOpen] = useState(false);

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
      <li>
        <Link href="/login">
          <a>
            <button className="h-full w-full rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 px-4 py-2 text-white">
              Login
            </button>
          </a>
        </Link>
      </li>
    </ul>
  );

  return (
    <div
      className={`absolute left-2/4 z-[999] flex w-full max-w-screen-2xl -translate-x-2/4 flex-wrap items-center lg:fixed ${container}`}
    >
      <nav
        {...rest}
        className={`flex w-full items-center justify-between py-2 pl-6 pr-5 lg:py-2 ${
          shadow ? "shadow-2xl shadow-blue-gray-500/10" : ""
        }`}
      >
        <div
          className={`flex w-full items-center !justify-between text-[#1A237E] ${className}`}
        >
          <Link href="/">
            <a className="gradient-text mb-2 text-3xl font-black tracking-normal text-white">
              <span className="inline-flex items-center">
                5irePay
                <span role="img" aria-label="fire emoji">
                  🔥
                </span>
              </span>
            </a>
          </Link>
          <button
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </button>
          <div className="lg:base-auto hidden flex-grow basis-full items-center overflow-hidden lg:flex lg-max:max-h-0">
            {navbarMenu}
          </div>
        </div>

        {open && (
          <div className={`mt-4 mb-0 w-full ${mobileNavClassName}`}>
            {navbarMenu}
          </div>
        )}
        {sidenavMenu}
      </nav>
    </div>
  );
};

export default Home;
