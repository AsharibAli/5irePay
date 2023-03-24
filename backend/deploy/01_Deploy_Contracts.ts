import { DeployFunction } from "hardhat-deploy/types";
import { network } from "hardhat";
import { verify } from "../utils/verify";

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const developmentChains: string[] = ["hardhat", "localhost"];
    const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
    const chainId: number | undefined = network.config.chainId;
    if (!chainId) return;

    const waitConfirmations: number = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("-----------------------------------------------------------");
    log("deploying......");

    const firePay = await deploy("5irePay", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: waitConfirmations,
    });

    const usdc = await deploy("USDC", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: waitConfirmations,
    });

    if (!developmentChains.includes(network.name) && process.env.EXPLORER5IRE_API_KEY) {
        await verify(firePay.address, []);
    }
};

export default deployFunction;
deployFunction.tags = ["all", "main"];
