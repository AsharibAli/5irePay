import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      return error;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      // Get user's balance in ether
      const balance = ethers.utils.formatEther(
        await ethersProvider.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(_to: string, _amount: string): Promise<any> {
    try {
      console.log("sengint tx....");
      const ethersProvider = await new ethers.providers.Web3Provider(
        this.provider
      );
      const signer = await ethersProvider.getSigner();

      const amount = ethers.utils.parseEther(_amount);

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: _to,
        value: amount,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("Tx Sent!");
      console.log(receipt);

      return receipt;
    } catch (error) {
      alert("Sending tx failed!");
      console.log(error);
      return error as string;
    }
  }

  async signMessage(message: string) {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const originalMessage = message;

      // Sign the message
      const signedMessage = await signer.signMessage(originalMessage);

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }
}
