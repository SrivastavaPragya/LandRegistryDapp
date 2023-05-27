import abi from "./contract/LandRegistry.json"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
 import Buy from "./components/Buy";
import Memos from "./components/Memos";
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x3E1bBA4BDb167f41a0CA5A2AEb6e0C26862A5E3E";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
   console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      {/* <img src={chai} className="img-fluid" alt=".." width="100%" /> */}
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
       <Buy state={state} /> 
       <Memos state={state} /> 
      </div>
    </div>
  );
}

export default App;
