const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const fs = require('fs');
const ABI = require(`../contracts/directory_contract_abi.json`);
const Comp_ABI = require(`../contracts/comptroller_contract_abi.json`);

const contractAddress = require("../contracts/contract-address.json");

const AlchemyWeb3URL = "https://eth-mainnet.alchemyapi.io/v2/wZR1WGOX1c4povP6Eu5jj4ifrD85loM1";

let web3;
let contract;

let comp_web3;
let comp_contract;

let row = [];
const getWeb3 = async () => {
    web3 = createAlchemyWeb3(AlchemyWeb3URL);
    contract = new web3.eth.Contract(
      ABI,
      contractAddress.Directory_Contract
    );
    const allPools = await contract.methods.getAllPools().call();
    
    for (var i=0; i<allPools.length ;i++)
    {
      comp_web3 = createAlchemyWeb3(AlchemyWeb3URL);
      comp_contract = new comp_web3.eth.Contract(
        Comp_ABI,
        allPools[i][2]
      );
      const allmarkets = await comp_contract.methods.getAllMarkets().call();
      const allborrowers = await comp_contract.methods.getAllBorrowers().call();
      // console.log("pool", allPools[i]);
      // console.log("allmarkets", allmarkets);
      // console.log("allborrowers", allborrowers);
      const data = {
        chain: 'eth',
        pool_name: allPools[i][0],
        pool_id: allPools[i][2],
        creator: allPools[i][1],
        market: allmarkets,
        borrow: allborrowers
      };
      row.push(data);
      console.log(data);
    }
    const jsonString = JSON.stringify(row);
    fs.appendFile('pool_list.json', jsonString, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
}

module.exports = {
    getWeb3
  };