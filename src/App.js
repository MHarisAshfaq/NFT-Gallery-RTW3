import { useState } from "react";
import NFTCard from "./components/nftCard";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNfts = async () => {
    let nfts;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    if (!collectionAddress.length) {
      const baseURL =
        "https://eth-mainnet.alchemyapi.io/v2/-EDYQExUBgWlRHZmtwLOngaVutsR9825/getNFTs/";
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddress=${collectionAddress}`;
      nfts = await fetch(fetchURL, requestOptions).then((response) =>
        response.json()
      );
    } else {
      const baseURL =
        "https://eth-mainnet.alchemyapi.io/v2/-EDYQExUBgWlRHZmtwLOngaVutsR9825/getNFTs/";
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      nfts = await fetch(fetchURL, requestOptions).then((response) =>
        response.json()
      );
    }
    if (nfts && nfts.ownedNfts) {
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collectionAddress.length) {
      var requestOptions = {
        method: "GET",
      };
      const baseURL =
        "https://eth-mainnet.alchemyapi.io/v2/-EDYQExUBgWlRHZmtwLOngaVutsR9825/getNFTsForCollection/";
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <h1 className="font-bold text-3xl m-5 italic text-slate-700">
        NFT Gallery
      </h1>
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          disabled={fetchForCollection}
          type="text"
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          placeholder="Add the Wallet Address"
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type="text"
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          placeholder="Add the Collection Address"
          onChange={(e) => setCollectionAddress(e.target.value)}
        />
        <label className="text-gray-600 ">
          <input
            type={"checkbox"}
            className="mr-2"
            placeholder={""}
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
          />
          Fetch for collection
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={() =>
            fetchForCollection ? fetchNFTsForCollection() : fetchNfts()
          }
        >
          Let's go!{" "}
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {NFTs.length
          ? NFTs.map((nft) => {
              return <NFTCard nft={nft}></NFTCard>;
            })
          : null}
      </div>
    </div>
  );
}

export default App;
