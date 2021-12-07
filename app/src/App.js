import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'juansevillano';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;



const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkWalletConnection = async () => {

    try {

      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found')


          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(`Connected with public key ${response.publicKey.toString()}`);
          setWalletAddress(response.publicKey.toString());

        } else {
          console.log('solana object not found get a phantom wallet 👻');
        }
      }

    } catch (error) {
      console.log(error);
    }

  }


  const goGithubHandler = () => {
    window.open('https://github.com/JuanSevillano')
  }


  const connectWallet = async () => {

    const { solana } = window;

    if (solana) {

      const response = await solana.connect();
      const pbkey = response.publicKey.toString();
      console.log(`Connected with PBK: ${pbkey}`);

      setWalletAddress(pbkey);
    }

  }


  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {

    const onLoad = async () => await checkWalletConnection();

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <span className="header">

            <h1 onClick={goGithubHandler} className='brand'>Sev <span>i</span></h1>
            <p
              onClick={() => {
                window.open('https://twitter.com/_buildspace');
                // Thanks to _builspace for this and its awsome community 
              }}
              style={{ pointer: 'pointer' }}
              className="sub-text">🍭 FIRST DROP #BUILDSPACE</p>
          </span>
          {!walletAddress && renderNotConnectedContainer()}
        </div>

        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            style={{ color: 'black ', margin: '20px' }}
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by  @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
