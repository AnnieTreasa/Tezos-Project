import Navbar from "./components/Navbar";
//import Home from './components/Home';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Create from './components/create';
import BlogDetails from './components/details';
import NotFound from './components/NotFound';
import { useState } from "react";
import { giveFundOperation } from "./utils/operation";

const App = () => {
  const [loading, setLoading] = useState(false);

  // TODO 7.a - Create ongiveFund
  const ongiveFund = async () => {
    try {
      setLoading(true);
      await giveFundOperation();
      alert("Transaction succesful!");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };


  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
            {/* Action Buttons */}
            <button onClick={ongiveFund} className="btn btn-primary btn-lg">
              {/* TODO 7.b - Call onBuyTicket on click */}
              {/* TODO 7.c - Show "loading..." when buying operation is pending */}
              {loading ? "Loading..." : "Give fund"}
            </button>
            </div >
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    
    
  );
}

export default App;