import { ethers, Contract } from "ethers";
import { useEffect, useState } from "react";
import RPC from "../frontend/utils/ethersRPC";
import { Web3Auth } from "@web3auth/web3auth";
import { getProviders, getWeb3Auth } from "../frontend/components/Helper";
import { SafeEventEmitterProvider } from "@web3auth/base";
import firePayAbi from "../frontend/constants/5irePay.json";
import contractAddresses from "../frontend/constants/networkMapping.json";

export function firepay(email, amount, tokenName) {
  const [provider, setProvider] =
    (useState < SafeEventEmitterProvider) | (null > null);
  const [web3auth, setWeb3auth] = (useState < Web3Auth) | (null > null);

  async function setUp() {
    const _provider = await getProviders();
    const _web3auth = await getWeb3Auth();
    setWeb3auth(_web3auth);
    setProvider(_provider);
  }

  useEffect(() => {
    setUp();
  }, [web3auth, provider]);

  async function sendPayment() {
    try {
      const ethersProvider = await new ethers.providers.Web3Provider(provider);

      const signer = await ethersProvider.getSigner();

      const contractAddress: string = await contractAddresses["997"][
        "5irePay"
      ][0];
      const contract: Contract = await new ethers.Contract(
        contractAddress,
        firePayAbi,
        signer
      );

      const emailHash = await ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(email)
      );

      const isEmailRegistered = await contract.isEmailRegistered(emailHash);

      if (isEmailRegistered) {
        const to = await contract.getAddress(emailHash);
        const token = await getTokenAddress(tokenName);
        await contract.tranferFrom(token, amount, to);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getTokenAddress = async (name) => {
    const token = await contractAddresses["997"][name][0];
    return token;
  };
}
