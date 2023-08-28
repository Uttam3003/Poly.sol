const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const tokenAddress = "0xd0e04d20F188740dC4D7a9dBE45C3520B0606C17"; // Address of the NFT contract
const FxERC721RootTunnel = "0xF9bc4a80464E48369303196645e876c8C7D972de"; // Address of the FxERC721RootTunnel contract
const walletAddress = "0x0429EC2dd779E982ce28eE80786ceEb178A8a92E"; // Wallet address to deposit NFTs

async function main() {
  const contract = await hre.ethers.getContractFactory("MyNFT"); // Replace "MyNFT" with your actual NFT contract name
  const tokenContract = await hre.ethers.getContractAt(tokenContractJSON.abi, tokenAddress);
  const fxContract = await hre.ethers.getContractAt(fxRootContractABI, FxERC721RootTunnel);

  // Approve the FxERC721RootTunnel contract to spend the NFT
  const approveTx = await tokenContract.approve(FxERC721RootTunnel, 1);
  await approveTx.wait();
  console.log('Approval confirmed');

  const nftAddresses = [tokenAddress]; // Add more NFT contract addresses if needed
  const tokenIds = [1]; // Specify the token IDs you want to deposit

  async function depositNFTs(fxContract, nftAddresses, tokenIds, walletAddress) {
    for (let i = 0; i < nftAddresses.length; i++) {
      const nftAddress = nftAddresses[i];
      const tokenId = tokenIds[i];
      
      // Deposit the NFT into the Polygon network
      const depositTx = await fxContract.deposit(nftAddress, walletAddress, tokenId, "0x6556");
      await depositTx.wait();
    }
  }

  await depositNFTs(fxContract, nftAddresses, tokenIds, walletAddress);

  console.log("Tokens deposited");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
