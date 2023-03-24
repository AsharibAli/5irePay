import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";
import styles from "../styles/Home.module.css";
import RPC from "../utils/ethersRPC";
import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { getProviders, getWeb3Auth } from "components/Helper";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Storage } from "web3.storage";

export default function Pay() {
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function setUp() {
    const _provider = await getProviders();
    const _web3auth = await getWeb3Auth();
    setWeb3auth(_web3auth);
    setProvider(_provider);
  }

  async function updateUI() {
    const _balance = await getBalance();
    setBalance(_balance);
  }

  useEffect(() => {
    updateUI();
  }, [web3auth, provider, balance]);

  useEffect(() => {
    setUp();
  }, [web3auth, provider]);

  const getBalance = async () => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const balance = await rpc.getBalance();
      console.log(balance);
      return balance;
    } catch (e) {
      console.log(e);
      console.log("This error is coming from getBalance");
    }
  };

  const makeInvoice = async (_to: string, _from: string) => {
    try {
      console.log("making invoices...");
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      // console.log("api token", token);
      const client = new Web3Storage({ token });

      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const user = await web3auth.getUserInfo();
      console.log(user);

      const currency = "MATIC";

      const object = {
        to: _to,
        senderName: user.name,
        senderEmail: user.email,
        from: _from,
        amount: `${amount} ${currency}`,
      };

      const blob = new Blob([JSON.stringify(object)], {
        type: "application/json",
      });
      const files = [new File([blob], `${user?.email}Invoice.json`)];
      const cid = await client.put(files);
      console.log("cid", cid);
      console.log("invoices stored on web3storage");
    } catch (e) {
      console.log(e);
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsDisabled(true);
      if (!provider) {
        alert("Provider not intilized");
        return;
      }
      const rpc = await new RPC(provider);
      const receipt = await rpc.sendTransaction(toAddress, amount);
      console.log(receipt);
      alert("Tx withdrawn successfully!");
      const fromAddress = await rpc.getAccounts();
      await makeInvoice(toAddress, fromAddress);
      setIsDisabled(false);
    } catch (e) {
      console.log(e);
      alert("Tx failed for some reasone. Pleas try agains :/");
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
                  <form>
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-blue-600">
                        Withdraw Crypto To
                      </label>
                      <input
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Enter your exchange/metamask address"
                        onChange={(e) => {
                          setToAddress(e.target.value);
                        }}
                      />
                    </div>

                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-blue-600">
                        Amount
                      </label>
                      <input
                        type="Amount"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Amount"
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="mr-1 mb-1 w-full rounded bg-blue-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                      type="button"
                      onClick={handleWithdraw}
                      disabled={isDisabled}
                    >
                      {isDisabled ? "Sending...." : "Send"}
                    </button>
                  </form>
                </div>
              </div>
              <div className="relative mt-6 flex flex-wrap">
                <div className="w-1/2">
                  Your Balance: {(+balance).toFixed(2)} 5IRE
                </div>
                {/* <div className="w-1/2 text-right">Balance</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
