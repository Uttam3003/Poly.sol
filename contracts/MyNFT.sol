// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// Import OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Define the contract
contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter; // Import Counters library to manage token IDs

    Counters.Counter private _tokenIds; // Counter to keep track of token IDs

    // Constructor to initialize the ERC721 token
    constructor() ERC721("Code Eater", "CER") {}

    // Function to mint a new NFT
    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner // Only the owner can mint NFTs
        returns (uint256)
    {
        _tokenIds.increment(); // Increment the token ID counter

        uint256 newItemId = _tokenIds.current(); // Get the current token ID
        _mint(recipient, newItemId); // Mint the NFT to the recipient's address
        _setTokenURI(newItemId, tokenURI); // Set the token URI for metadata
        return newItemId; // Return the new NFT's ID
    }
}
