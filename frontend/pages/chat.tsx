import { Intercom, Window, Launcher } from "@relaycc/receiver";
import { Web3Auth } from "@web3auth/web3auth";
import { getProviders, getWeb3Auth } from "components/Helper";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";
import styles from "../styles/Home.module.css";
import RPC from "../utils/ethersRPC";

export default function Chat() {
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [balance, setBalance] = useState("0");
  const [user, setUser] = useState<any>();
  const [signer, setSigner] = useState<any>();

  async function setUp() {
    const _provider = await getProviders();
    const _web3auth = await getWeb3Auth();
    const _balance = await getBalance();
    const _user = await getUserInfo();
    setWeb3auth(_web3auth);
    setProvider(_provider);
    setBalance(_balance);
    setUser(_user);
    if (provider) {
      const ethersProvider = await new ethers.providers.Web3Provider(provider);
      const _signer = await ethersProvider.getSigner();
      setSigner(_signer);
    }
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
          <div className="App">
            <div className="App">
              <Launcher wallet={signer} />
              <Intercom>
                <Window />
              </Intercom>
            </div>
          </div>
          <div className="pt-96 font-semibold">
            Currently on Building Phase ----
          </div>
        </div>
      </div>
    </>
  );
}
