import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./ethersRPC";

export default function Testing() {
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
          clientId: CLIENT_ID!, // get it from Web3Auth Dashboard
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x3E5", // hex of 997, 5ire testnet
            rpcTarget: TESTNET_RPC_URL!,
            displayName: "5ireChain",
            blockExplorer: "https://explorer.5ire.network",
            ticker: "5IRE",
            tickerName: "5ire",
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          console.log("provider", web3auth.provider);
          setProvider(web3auth.provider);
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
      } catch (error) {
        setAuthError(error.toString());
        console.error(error);
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

  const logout = async () => {
    try {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      await web3auth.logout();
      setProvider(null);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from logout");
    }
  };

  const getChainId = async () => {
    try {
    } catch (e) {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const chainId = await rpc.getChainId();
      console.log(chainId);
      console.log(e);
      console.log("This error is coming from chainID");
    }
  };
  const getAccounts = async () => {
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

  const signMessage = async (message: string) => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const signedMessage = await rpc.signMessage(message);
      console.log(signedMessage);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from signMessage");
    }
  };

  const getPrivateKey = async () => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const privateKey = await rpc.getPrivateKey();
      console.log(privateKey);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from getPrivateKey");
    }
  };

  return (
    <>
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={getChainId} className="card">
        Get Chain ID
      </button>
      <button onClick={getAccounts} className="card">
        Get Accounts
      </button>
      <button onClick={getBalance} className="card">
        Get Balance
      </button>
      <button
        onClick={() => {
          sendTransaction("address", "amount");
        }}
        className="card"
      >
        Send Transaction
      </button>
      <button onClick={() => signMessage("message")} className="card">
        Sign Message
      </button>
      <button onClick={getPrivateKey} className="card">
        Get Private Key
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );
}
