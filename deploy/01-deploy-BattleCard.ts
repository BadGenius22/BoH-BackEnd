import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";
import verify from "../utils/verify";

const FUND_AMOUNT = "1000000000000000000000";

const deployBattleCard: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = 80001;
  const _metadataURI = "";

  let vrfCoordinatorV2Address: string | undefined,
    subscriptionId: string | undefined;

  // if (chainId == 31337) {
  //   // create VRFV2 Subscription
  //   const vrfCoordinatorV2Mock = await ethers.getContract(
  //     "VRFCoordinatorV2Mock.sol"
  //   );
  //   vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
  //   const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
  //   const transactionReceipt = await transactionResponse.wait();
  //   subscriptionId = transactionReceipt.events[0].args.subId;

  //   // Fund the subscription
  //   // Our mock makes it so we don't actually have to worry about sending fund
  //   await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT);
  // } else {
  //   vrfCoordinatorV2Address =
  //     networkConfig[network.config.chainId!]["vrfCoordinatorV2"];
  //   subscriptionId = networkConfig[network.config.chainId!]["subscriptionId"];
  // }
  vrfCoordinatorV2Address =
    networkConfig[network.config.chainId!]["vrfCoordinatorV2"];
  subscriptionId = networkConfig[network.config.chainId!]["subscriptionId"];
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log("----------------------------------------------------");
  const args: any[] = [
    vrfCoordinatorV2Address,
    _metadataURI,
    networkConfig[network.config.chainId!]["gasLane"],
    subscriptionId,
    networkConfig[network.config.chainId!]["maxGasLimit"],
    networkConfig[network.config.chainId!]["keepersUpdateInterval"],
  ];
  const BattleCard = await deploy("BattleCard", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  // Verify the deployment
  if (
    !developmentChains.includes(network.name) &&
    process.env.POLYGONSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(BattleCard.address, args);
  }
};
export default deployBattleCard;
deployBattleCard.tags = ["all", "BattleCard"];
