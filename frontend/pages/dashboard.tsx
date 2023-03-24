import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { getProviders, getWeb3Auth } from "components/Helper";
import { SafeEventEmitterProvider } from "@web3auth/base";
import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";
import styles from "../styles/Home.module.css";
import RPC from "../utils/ethersRPC";

export default function Dashboard() {
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

  return (
    <>
      <Sidebar />
      <div className="bg-blueGray-600 relative md:ml-64">
        <Navbar />
        <div className={`${styles.backgroundParent}`}>
          <div className={`shadow-2xl ${styles.bigCard}`}>
            {" "}
            Hey, {user?.name}
            <p className="py-2">
              You are logged in with {user?.email}. You can use it for sending
              and receiving payments.
            </p>
          </div>

          <div className={`shadow-2xl ${styles.card}`}>
            <div className={styles.buttonCard}>
              Balances:
              <p className="py-2">
                Your Balance: {(+balance)?.toFixed(2)} 5IRE
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
