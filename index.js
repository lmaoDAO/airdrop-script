const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const erc721 = require("./abi/erc721abi.json");
const erc20 = require("./abi/erc20abi.json");
const fs = require("fs");
const bbb = require("./configs/bbb.json");
const bgt = require("./configs/bgt.json");

const config = process.env.CONFIG === "bbb" ? bbb : bgt;
const abi = process.env.CONFIG === "bbb" ? erc721 : erc20;

const run = async () => {
  Contract.setProvider(process.env.PROVIDER_URL);

  const contract = new Contract(abi, config.erc20Address);

  events = await contract.getPastEvents("Transfer", {
    fromBlock: config.fromBlock,
    toBlock: config.toBlock,
  });

  let addresses = [];

  events.forEach((e) => {
    addresses.push(e.returnValues.to);
  });

  const addressSet = new Set(addresses);
  console.log(addressSet.size);

  addresses = [...addressSet];
  let i, j;
  const chunk = 500;
  for (i = 0, j = addresses.length; i < j; i += chunk) {
    const partition = addresses.slice(i, i + chunk);
    let partitionStr = "[";
    partition.forEach((address) => {
      partitionStr += `"${address}"` + ",";
    });
    partitionStr += "]";
    fs.writeFileSync(
      `${process.env.BASE_DIR}/${config.outputFolder}/${
        (config.startingIx || 0) + i
      }.txt`,
      partitionStr
    );
  }
  console.log(`Done - ${i} partitions`);
  console.log(`First address: ${addresses[0]}`);
  console.log(`Last address: ${addresses[addresses.length - 1]}`);
};

run();
