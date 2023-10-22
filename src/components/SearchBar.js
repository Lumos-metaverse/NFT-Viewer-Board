import React, { useState } from 'react';

function SearchBar() {
  const [account, setAccount] = useState("");
  const [nfts, setNfts] = useState(null);
  const [protocol, setProtocol] = useState("ethereum"); // Default to Ethereum
  console.log(nfts);
  
  const accountChangeHandler = (e) => {
    e.preventDefault();
    setAccount(e.target.value);
  }
  
   const fetchNFTHandler = async (e) => {
    e.preventDefault();
    // Add functionality to fetch NFTs using the account and protocol
    if(account.length === 42) {
      try {
          const response = await fetch(`https://ubiquity.api.blockdaemon.com/nft/v1/${protocol}/mainnet/assets?wallet_address=${account}`, {
          headers: {
              Authorization: `Bearer ${process.env.REACT_APP_UBIQUITY_KEY}`
          }
          });
  
          const data = await response.json();
          setNfts(data);

      } catch (error) {
          console.log(error);
      }
    } else{
      alert("Invalid Ethereum Address");
    }

  }

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  return (
    <div>
    <div className="search-container">
      <input 
        type="text" 
        value={account} 
        onChange={accountChangeHandler} 
        placeholder="Fetch NFTs by Address"
      />
      <button onClick={fetchNFTHandler}>Fetch NFT</button>
    </div>
    <div className='container'>
      <div className='row'>
          { nfts !== null && nfts.data.length > 0 && nfts.data.map((nft) => {
            let imgUrl;
            if(isImage(nft.image_url)){
                imgUrl = nft.image_url;
            } else {
                imgUrl = `${nft.image_url}.png`;
            }

            return (
              <div className='col-md-4' key={nft.id}>
                <div className='card'>
                {nft.image_url === "" ? <img src="/images/noimage2.webp" className="card-img-top" alt="Not Found" /> : <img className="card-img-top" src={`https://ubiquity.api.blockdaemon.com/nft/v1/ethereum/mainnet/media/${imgUrl}?apiKey=${process.env.REACT_APP_UBIQUITY_KEY}`} alt="NFT Item" />}
                <div className='card-body'>
                  <h4>{nft.name}</h4>
                  <p>ID: {nft.token_id}</p>
                </div>
                </div>
              </div>
            )
        })}
      </div>
    </div>
</div>
  );
}

export default SearchBar;
