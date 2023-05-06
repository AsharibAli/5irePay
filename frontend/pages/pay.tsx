import { ethers, Contract } from "ethers";
import firePayAbi from "../constants/5irePay.json";
import contractAddresses from "../constants/networkMapping.json";
import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";
import styles from "../styles/Home.module.css";
import RPC from "../utils/ethersRPC";
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
  const [toEmail, setToEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [info, setInfo] = useState("");

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

  const handleSend = async () => {
    try {
      setIsDisabled(true);
      setInfo("");
      const ethersProvider = await new ethers.providers.Web3Provider(provider);
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      console.log("User address", address);

      const contractAddress: string = await contractAddresses["997"][
        "5irePay"
      ][0];
      const contract: Contract = await new ethers.Contract(
        contractAddress,
        firePayAbi,
        signer
      );

      const email = (await web3auth.getUserInfo())?.email;
      const emailHash = await ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(email)
      );

      const isEmailRegistered = await contract.isEmailRegistered(emailHash);

      const get = await contract.getAddress(emailHash);
      console.log("got this address", get);
      // console.log("contractAddress", contractAddress);
      // console.log("contract", contract);

      if (!isEmailRegistered) {
        console.log("Not registered, registering email....");
        await contract.register(emailHash);
      }

      const toEmailHash = await ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(toEmail)
      );

      const isToEmailRegistered = await contract.isEmailRegistered(toEmailHash);
      const toAddress = await contract.getAddress(toEmailHash);

      if (isToEmailRegistered) {
        console.log("Sending Tx......");
        if (!provider) {
          console.log("provider not initialized yet");
          return;
        }
        const rpc = await new RPC(provider);
        const receipt = await rpc.sendTransaction(toAddress, amount);
        console.log(receipt);
        alert("Tx sent successfully!");
        const fromAddress = await rpc.getAccounts();
        await makeInvoice(toAddress, fromAddress);
      } else {
        setInfo("No user found with this email address.");
      }

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
                      <label className="gradient-text text-1xl mb-2 font-black tracking-normal text-white">
                        Send To
                      </label>
                      <input
                        type="email"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Email"
                        onChange={(e) => {
                          setToEmail(e.target.value);
                        }}
                      />
                    </div>

                    <div className="relative mb-3 w-full">
                      <label className="gradient-text text-1xl mb-2 font-black tracking-normal text-white">
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
                    <div>{info}</div>
                    <button
                      className="h-full w-full rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 px-4 py-2 text-white"
                      type="button"
                      onClick={handleSend}
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
