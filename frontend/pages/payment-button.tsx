import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { getProviders, getWeb3Auth } from "components/Helper";
import { SafeEventEmitterProvider } from "@web3auth/base";
import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";
import styles from "../styles/Home.module.css";
import Editor from "react-simple-code-editor";

// prism.js
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
require("prismjs/components/prism-jsx");

export default function PaymentBtn() {
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [code, setCode] = useState("");

  async function setUp() {
    const _provider = await getProviders();
    const _web3auth = await getWeb3Auth();
    setWeb3auth(_web3auth);
    setProvider(_provider);
  }

  useEffect(() => {
    setUp();
  }, [web3auth, provider]);

  const generateCode = async () => {
    try {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const user = await web3auth.getUserInfo();
      setIsDisabled(true);
      setCode(`
      import { firePay } from "5irepay";

      const email = "${user.email}";
      const tokenName = "USDC" // replace this with any token;
      const amount = "10"; // use your input

      <button
        className="mr-1 mb-1 w-full rounded bg-blue-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
        type="button"
        onClick={() => {
          firepay.sendPayment(email, amount, tokenName)
        }}
      >
      </button>`);
      setIsDisabled(false);
    } catch (e) {
      console.log(e);
      alert("Generating code failed, please try again :/");
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-blueGray-600 relative md:ml-64">
        <Navbar />
        <div className={`${styles.bgImg} container mx-auto h-full pr-12 pt-12`}>
          <div className="flex h-full content-center items-center justify-center">
            <div className="w-full px-4 lg:w-4/12">
              <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0">
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <button
                    className="mr-1 mb-1 w-full rounded bg-blue-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                    type="button"
                    onClick={generateCode}
                    disabled={isDisabled}
                  >
                    {isDisabled ? "Generating...." : "Generate code"}
                  </button>
                </div>
              </div>
              <div className="relative z-20 mb-5 w-full overflow-x-hidden overflow-y-scroll rounded-xl bg-[#1E293B] shadow-lg">
                <div className="sticky top-0 z-30 h-[25px] bg-[#1E293B]">
                  <div className="absolute top-2/3 left-2.5 -mt-1.5 h-2.5 w-2.5 rounded-full bg-[#dc143c] shadow-[15px_0_0_#ffa500,_30px_0_0_#32cd32]"></div>
                </div>
                <div className="pointer-events-none max-h-[400px] min-h-[220px] md:min-h-[250px] lg:min-h-[340px]">
                  <Editor
                    value={`${code}`}
                    onValueChange={() => null}
                    highlight={(newCode) => highlight(newCode, languages.jsx)}
                    padding={20}
                    className="code-editor h-max text-white outline-none focus:outline-none"
                    style={{
                      fontFamily: "Fira Code",
                      fontWeight: 500,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
