export interface networkConfigItem {
  name?: string;
  subscriptionId?: string;
  gasLane?: string;
  maxGasLimit?: string;
  vrfCoordinatorV2?: string;
  keepersUpdateInterval?: string;
}

export interface networkConfigInfo {
  [key: number]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  31337: {
    name: "localhost",
    subscriptionId: "2455",
    gasLane:
      "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f", // 500 gwei
    maxGasLimit: "500000", // 500,000 gas
    keepersUpdateInterval: "30",
  },
  80001: {
    name: "mumbai",
    subscriptionId: "2455",
    gasLane:
      "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f", // 500 gwei
    maxGasLimit: "500000", // 500,000 gas
    vrfCoordinatorV2: "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
    keepersUpdateInterval: "30",
  },
  1: {
    name: "mainnet",
  },
};

export const developmentChains = ["hardhat", "localhost"];
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
