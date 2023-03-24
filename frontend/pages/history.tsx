import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { getProviders, getWeb3Auth } from "components/Helper";
import { SafeEventEmitterProvider } from "@web3auth/base";
import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";
import styles from "../styles/Home.module.css";
import RPC from "../utils/ethersRPC";


export default function History() {
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [balance, setBalance] = useState("0");
  const [user, setUser] = useState<any>();

  async function setUp() {
    const _provider = await getProviders();
    const _web3auth = await getWeb3Auth();
    const _balance = await getBalance();
    const _user = await getUserInfo();
    setWeb3auth(_web3auth);
    setProvider(_provider);
    setBalance(_balance);
    setUser(_user);
  }

  useEffect(() => {
    setUp();
  }, [web3auth, provider, user, balance]);

  const getUserInfo = async () => {
    try {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const user = await web3auth.getUserInfo();
      console.log(user);
      return user;
    } catch (e) {
      console.log(e);
      console.log("This error is coming from getUser Info");
    }
  };

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

  const sendTransaction = async (_to: string, _amount: string) => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const receipt = await rpc.sendTransaction(_to, _amount);
      console.log(receipt);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from sendTransaction");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-blueGray-600 relative md:ml-64">
        <Navbar />
        <div className={`${styles.backgroundParent}`}></div>
      </div>
    </>
  );
}
