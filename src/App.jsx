import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/WavePortal'

export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x4F925EE4B889183273989C6e6B28a412A85CF32c";
  const contractABI = abi.abi;
  const checkIfWalletIsConnected = async () => {
    try{
      
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask");
        return;
      } else {
        console.log("We have the ethereum objectt", ethereum);
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else{
        console.log("No authorized account found");
      }
    } catch(error){}

  }

  const connectWallet = async () =>{
    try{
      const {ethereum} = window;
      if (!ethereum){
        alert("Get Metamask!");
        return;
      }
      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch(error){
      console.log(error);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Eth object doesn't exist");
      }
    } catch (error){
      console.log(error);
    }

  }
  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Xuan Mai and I am learning React and Solidity all at the same time! 
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        {
          !currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
            </button>
          )
        }
      </div>
    </div>
  );
}
