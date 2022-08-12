import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";

import { Link } from "react-router-dom";

 
const Navbar = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // TODO 4.a - Create onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          My Simple tezFunds
        </a>
        <div className="links">
        <div><Link to="/">Home</Link>   </div>
        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
         }}>New Profile</Link>
      </div>
        <div className="d-flex">
          {/* TODO 4.b - Call connectWallet function onClick  */}
          <button onClick={onConnectWallet} className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            {account ? account : "Connect Wallet"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
