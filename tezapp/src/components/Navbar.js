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
    <nav className="navbar navbar-dark bg-dark">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          My Simple TezFunds
        </a>

        <div className="links">
          <div>
            <Link to="/create">Invest</Link>
          </div>

          <div>
            <Link to="/create">Add your Project</Link>
          </div>
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
