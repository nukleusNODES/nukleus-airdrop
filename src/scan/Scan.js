import React, { Component } from "react";
import FileSaver from "file-saver";

import getWeb3 from "./../utils/getWeb3";
import NukleusTestToken from "../../build/contracts/NukTestToken.json";
import Utils from "./utils";

class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      balances: {},
      message: ""
    };

    this.downloadCSV = this.downloadCSV.bind(this)
  }

  componentWillMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3,
          message: "Integrated Web3 found!"
        });
        this.instantiateScan();
      })
      .catch(() => {
        console.log("Error finding web3.");
        this.setState({
          message: "Integrated Web3 not found!"
        });
      });
  }

  downloadCSV() {
    const text = Utils.toCSV(this.state.balances)    
    var blob = new Blob([text], { type: "text/csv" });
    FileSaver.saveAs(blob, "token-balances.csv");
  }

  async instantiateScan() {
    const contract = require("truffle-contract");
    const token = contract(NukleusTestToken);
    token.setProvider(this.state.web3.currentProvider);
    
    this.setState({
        message: "Initiating ERC20 contract ABI!"
    });

    Utils.getWallets().default.forEach(async address => {
      this.state.web3.eth.getBalance(address, (err, balance) => {
        let obj = {
          eth: this.state.web3.fromWei(balance, "ether"),
          tokens: []
        };
        
        this.setState({
            message: "Looking for wallet "+ address +", ETH balance " + obj.eth
        });

        Utils.getTokens().default.forEach(async t => {
          
             
       

          const instance = token.at(t.address);
          const name = await instance.name.call();
          const decimals = await instance.decimals.call();

          const balance = await instance.balanceOf.call(address);
          const tkn = {
            token: name,
            balance: balance.toNumber() / Math.pow(10, parseInt(decimals, 10)),
            decimals: decimals
          };

          obj.tokens.push(tkn);

          const update_balance = this.state.balances;
          update_balance[address] = obj;

          this.setState({
            balances: update_balance
          });
          this.setState({
            message: "Looking for wallet "+ address +", "+ t.name +" balance "+ tkn.balance
        });
        });
      });
    });

    this.setState({
        message: "Scan finished."
    });
  }

  render() {
    return (
      <div>
        
        <br />
        <br />
        <h1>Count: {Object.keys(this.state.balances).length}</h1>
        <h4>{this.state.message}</h4>        
        <button onClick={this.downloadCSV}>Download CSV</button>
      </div>
    );
  }
}

export default Scan;
