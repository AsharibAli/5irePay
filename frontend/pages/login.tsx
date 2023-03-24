import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { Helper } from "../components/Helper";
import { ethers, Contract } from "ethers";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import firePayAbi from "../constants/5irePay.json";
import contractAddresses from "../constants/networkMapping.json";
import RPC from "../utils/ethersRPC";

function Login() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
        const TESTNET_RPC_URL = process.env.NEXT_PUBLIC_TESTNET_RPC_URL!;
        const web3auth = new Web3Auth({
          clientId: CLIENT_ID!,
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x3E5", // hex of 997, 5ire testnet
            rpcTarget: TESTNET_RPC_URL!,
            displayName: "5ireChain",
            blockExplorer: "https://explorer.5ire.network/",
            ticker: "5IRE",
            tickerName: "5ire",
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
      } catch (error) {
        console.error(error);
        setAuthError(error.toString());
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      setIsAuthenticating(true);
      console.log("logging in");
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setIsAuthenticated(true);
    } catch (e) {
      setAuthError(e.toString());
      console.log(e);
    }
    setIsAuthenticating(false);
  };

  const unloggedInView = (
    <div className={`shadow-2xl ${styles.card}`}>
      <div>Login to 5irePay</div>
      {isAuthenticating && <p className={styles.green}>Authenticating</p>}
      {authError && <p className={styles.error}>{JSON.stringify(authError)}</p>}
      <div className={styles.buttonCard}>
        <button
          className={styles.loginButton}
          onClick={login}
          disabled={isAuthenticating}
        >
          Login
        </button>
      </div>
    </div>
  );

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

  const getAddress = async () => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const address = await rpc.getAccounts();
      console.log(address);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from getAccounts");
    }
  };
  const redirect = async () => {
    Router.push("/dashboard");
  };

  useEffect(() => {
    if (isAuthenticated === true) redirect();
  }, [isAuthenticated]);

  return (
    <div className="container">
      <div className="grid">
        {provider ? (
          <Helper _provider={provider} _web3auth={web3auth} />
        ) : (
          <div className={styles.backgroundParent}>{unloggedInView}</div>
        )}
      </div>
    </div>
  );
}

export default Login;
