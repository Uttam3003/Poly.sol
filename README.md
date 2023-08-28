# MyNFT Smart Contract

The MyNFT smart contract is designed to create and manage Non-Fungible Tokens (NFTs) using the ERC721 standard. This contract allows the owner to mint unique NFTs, each representing a distinct digital asset, such as artwork or collectibles.

# Features

1. Minting NFTs: The owner of the contract can mint new NFTs. Each NFT has a unique token ID and associated metadata.

2. Token ID Management: The contract uses the Counters library to manage token IDs. Each new NFT is assigned a unique and incrementing token ID.

3. Ownership Control: Only the owner of the contract can mint new NFTs, ensuring that the creation of NFTs is restricted to authorized parties.

4. Metadata Storage: The contract inherits from the ERC721URIStorage contract, allowing each NFT to have associated metadata stored as a URI. This metadata can include information about the asset, such as its name, description, and image URL.

# Usage

## Contract Deployment

Deploy the MyNFT smart contract to the Ethereum blockchain. The contract will be assigned the name "Code Eater" with the symbol "CER."

## Minting NFTs

1.The contract owner can call the mintNFT function to mint a new NFT for a recipient.

2.Provide the recipient's Ethereum address and the URI of the NFT's metadata as function parameters.

3.The function will increment the token ID counter, mint the NFT to the recipient's address, and set the token URI for metadata storage.

# Author

UTTAM KUMAR

# LICENCE

This project is under MIT licence.




