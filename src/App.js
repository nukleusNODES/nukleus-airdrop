import React, { Component } from "react";
import Scan from "./scan/Scan";
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class App extends Component {  

  render() {    
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">
            Nukleus Airdrop Scanner
          </a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <Scan />              
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
