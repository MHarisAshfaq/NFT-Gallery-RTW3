import { useState } from "react";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);

  const fetchNfts = async () => {
    let nfts;
    if (!collectionAddress) {
      nfts = await fetch(
        `https://polygon-mumbai.g.alchemy.com/v2/-EDYQExUBgWlRHZmtwLOngaVutsR9825/getNFTs?owner=${walletAddress}`
      );
    } else {
      nfts = await fetch(
        `https://polygon-mumbai.g.alchemy.com/v2/-EDYQExUBgWlRHZmtwLOngaVutsR9825/getNFTs?owner=${walletAddress}&contractAddress=${collectionAddress}`
      );
    }
    if (nfts && nfts.length) {
      setNFTs(nfts);
    }
    console.log(nfts);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          type="text"
          placeholder="Add the Wallet Address"
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add the Collection Address"
          onChange={(e) => setCollectionAddress(e.target.value)}
        />
        <label className="text-gray-600 ">
          <input type={"checkbox"} className="mr-2"></input>Fetch for collection
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={fetchNfts}
        >
          Let's go!{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
