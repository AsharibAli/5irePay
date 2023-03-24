import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/* Toggler */}
          <button
            className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/dashboard">
            <a
              href="#pablo"
              className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
            >
              5irePay
            </a>
          </Link>
          {/* User */}
          <ul className="flex list-none flex-wrap items-center md:hidden">
            <li className="relative inline-block"></li>
            <li className="relative inline-block"></li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/dashboard">
                    <a
                      href="#pablo"
                      className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                    >
                      5irePay
                    </a>
                  </Link>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 h-12 w-full rounded  border-0 border border-solid bg-white px-3 py-2 text-base font-normal leading-snug shadow-none outline-none focus:outline-none"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}

            {/* Navigation */}

            <ul className="flex list-none flex-col md:min-w-full md:flex-col">
              <li className="items-center">
                <Link href="/dashboard">
                  <a
                    href="#pablo"
                    className={
                      "block py-3 text-xs font-bold uppercase " +
                      (router.pathname.indexOf("/dashboard") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i className="fas fa-tv text-blueGray-300 mr-2 text-sm"></i>{" "}
                    Dashboard
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/pay">
                  <a
                    href="#pablo"
                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                  >
                    <i className="fa fa-paper-plane text-blueGray-300 mr-2 text-sm"></i>{" "}
                    Pay
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/chat">
                  <a
                    href="#pablo"
                    className="uppercasetext-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold"
                  >
                    <i className="fa fa-envelope text-blueGray-300 mr-2 text-sm"></i>{" "}
                    Chat
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/withdraw">
                  <a
                    href="#pablo"
                    className="uppercasetext-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold"
                  >
                    <i className="fa fa-money text-blueGray-300 mr-2 text-sm"></i>{" "}
                    Withdraw
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/history">
                  <a
                    href="#pablo"
                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                  >
                    <i className="fas fa-table text-blueGray-300 mr-2 text-sm"></i>{" "}
                    History
                  </a>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
              Business
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
              <li className="items-center">
                <Link href="/payment-button">
                  <a
                    href="#pablo"
                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                  >
                    <i className="fas fa-user text-blueGray-400 mr-2 text-sm"></i>{" "}
                    Payment Button
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
