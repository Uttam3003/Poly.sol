require("dotenv").config(); // Load environment variables from .env file
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL); // Create a Web3 instance connected to Alchemy

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const contractAddress = "0x0429EC2dd779E982ce28eE80786ceEb178A8a92E";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// Function to mint an NFT
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); // Get latest nonce

  // Construct the transaction object
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      // Send the signed transaction
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

// Call the mintNFT function with the tokenURI
mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmQX2tK3AYNPyEiaFxf6fX97QmoTfXxsLhHmaKcqvAdUoq"
);
