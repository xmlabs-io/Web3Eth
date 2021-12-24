import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  const [currentAccount, setCurrentAccount] = useState("");

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
