import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network } from "hardhat";
import * as fs from "fs";

const deployFunction: DeployFunction = async () => {
    await updateAbi();
    await updateAddresses();
};

const abiPath = "../frontend/constants/";
const mappingPath = "../frontend/constants/networkMapping.json";
const helperPath = "../frontend/constants/helper.json";

const updateAbi = async () => {
    const firePay = await ethers.getContract("5irePay");
    const token = await ethers.getContract("USDC");
    const strings = ["5irePay.json", "Token.json"];
    const contracts = [firePay, token];

    for (let i = 0; i < strings.length; i++) {
        let _interface: string | NodeJS.ArrayBufferView = contracts[i].interface.format(
            ethers.utils.FormatTypes.json
        ) as string | NodeJS.ArrayBufferView;

        fs.writeFileSync(abiPath + strings[i], _interface);
    }
};

const updateAddresses = async () => {
    const firePay = await ethers.getContract("5irePay");
    const usdc = await ethers.getContract("USDC");
    const contractAddresses = await JSON.parse(fs.readFileSync(mappingPath, "utf8"));
    const chainId = await network.config.chainId?.toString();

    const strings = ["5irePay", "USDC"];
    const addresses = [firePay.address, usdc.address];

    for (let i = 0; i < strings.length; i++) {
        if (chainId! in contractAddresses) {
            if (!contractAddresses[chainId!][strings[i]]) {
                contractAddresses[chainId!][strings[i]] = [addresses[i]];
            } else {
                contractAddresses[chainId!][strings[i]].pop();
                contractAddresses[chainId!][strings[i]].push(addresses[i]);
            }
        } else {
            contractAddresses[chainId!] = { [strings[i]]: [addresses[i]] };
        }
    }

    fs.writeFileSync(mappingPath, JSON.stringify(contractAddresses));
};

export default deployFunction;
deployFunction.tags = ["all", "frontend"];
